'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "../supabase/client";
import { UserRole } from "../security/permissions";
import { markUserRegistered, getInitialAppState, saveAppState } from "../supabase/demo-store";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
}

export interface BusinessEntity {
  id: string;
  name: string;
  legal_name?: string;
  gstin?: string;
  pan?: string;
  currency: string;
  industry?: string;
  business_size?: string;
  fiscal_year_start: number;
  address?: Record<string, any>;
}

export interface AuthContextType {
  currentUser: any | null;
  currentProfile: UserProfile | null;
  currentBusiness: BusinessEntity | null;
  currentRole: UserRole;
  userBusinesses: BusinessEntity[];
  isLoading: boolean;
  switchBusiness: (businessId: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateBusiness: (business: Partial<BusinessEntity>) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [currentBusiness, setCurrentBusiness] = useState<BusinessEntity | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>("OWNER");
  const [userBusinesses, setUserBusinesses] = useState<BusinessEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async (supabase: any, user: any) => {
    try {
      setCurrentUser(user);
      const userMeta = user.user_metadata || {};
      const profile: UserProfile = {
        id: user.id,
        email: user.email || "",
        full_name: userMeta.full_name || user.email?.split("@")[0] || "Founder",
        phone: userMeta.phone,
      };
      setCurrentProfile(profile);

      // Fetch business memberships
      const { data: memberRecords, error } = await supabase
        .from("business_members")
        .select("business_id, role, businesses(*)")
        .eq("user_id", user.id);

      if (memberRecords && memberRecords.length > 0) {
        const businesses: BusinessEntity[] = memberRecords
          .map((m: any) => m.businesses)
          .filter(Boolean);

        setUserBusinesses(businesses);

        if (businesses.length > 0) {
          setCurrentBusiness(businesses[0]);
          setCurrentRole((memberRecords[0].role as UserRole) || "OWNER");

          // Sync with local state store
          const currentStore = getInitialAppState();
          currentStore.business.id = businesses[0].id;
          currentStore.business.name = businesses[0].name;
          currentStore.business.legalName = businesses[0].legal_name || businesses[0].name;
          currentStore.business.gstin = businesses[0].gstin;
          currentStore.members = [
            {
              id: user.id,
              businessId: businesses[0].id,
              name: profile.full_name,
              email: profile.email,
              role: (memberRecords[0].role as UserRole) || "OWNER",
            },
          ];
          saveAppState(currentStore);
        }
      }
      markUserRegistered(true);
    } catch (err) {
      console.warn("fetchUserData error:", err);
    }
  };

  useEffect(() => {
    let authListener: any = null;

    const initAuth = async () => {
      try {
        const supabase = createClient();
        if (supabase) {
          // 1. Initial Session Check
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            await fetchUserData(supabase, session.user);
          } else {
            // Check fallback state
            const local = getInitialAppState();
            if (local?.business?.name) {
              setCurrentBusiness(local.business as any);
            }
          }

          // 2. Real-time Auth State Change Listener
          const { data: sub } = supabase.auth.onAuthStateChange(async (event: string, session: any) => {
            if (event === "SIGNED_IN" && session?.user) {
              await fetchUserData(supabase, session.user);
            } else if (event === "SIGNED_OUT") {
              setCurrentUser(null);
              setCurrentProfile(null);
              setCurrentBusiness(null);
              setUserBusinesses([]);
              markUserRegistered(false);
            } else if (event === "USER_UPDATED" && session?.user) {
              await fetchUserData(supabase, session.user);
            }
          });
          authListener = sub?.subscription;
        }
      } catch (err) {
        console.warn("Auth initialization fallback:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      if (authListener?.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  const switchBusiness = (businessId: string) => {
    const biz = userBusinesses.find((b) => b.id === businessId);
    if (biz) {
      setCurrentBusiness(biz);
    }
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (currentProfile) {
      setCurrentProfile({ ...currentProfile, ...updated });
    }
  };

  const updateBusiness = (updated: Partial<BusinessEntity>) => {
    if (currentBusiness) {
      setCurrentBusiness({ ...currentBusiness, ...updated });
    }
  };

  const logout = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setCurrentUser(null);
    setCurrentProfile(null);
    setCurrentBusiness(null);
    setUserBusinesses([]);
    markUserRegistered(false);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentProfile,
        currentBusiness,
        currentRole,
        userBusinesses,
        isLoading,
        switchBusiness,
        updateProfile,
        updateBusiness,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      currentUser: null,
      currentProfile: null,
      currentBusiness: null,
      currentRole: "OWNER",
      userBusinesses: [],
      isLoading: false,
      switchBusiness: () => {},
      updateProfile: () => {},
      updateBusiness: () => {},
      logout: async () => {},
    };
  }
  return context;
}