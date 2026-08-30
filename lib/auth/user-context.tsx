'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '../supabase/client';
import { UserRole } from '../security/permissions';
import { markUserRegistered } from '../supabase/demo-store';

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
  const [currentRole, setCurrentRole] = useState<UserRole>('OWNER');
  const [userBusinesses, setUserBusinesses] = useState<BusinessEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const supabase = createClient();
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setCurrentUser(session.user);
            
            const userMeta = session.user.user_metadata || {};
            const profile: UserProfile = {
              id: session.user.id,
              email: session.user.email || '',
              full_name: userMeta.full_name || session.user.email?.split('@')[0] || 'User',
              phone: userMeta.phone,
            };
            setCurrentProfile(profile);

            // Fetch business memberships from Supabase
            const { data: memberRecords } = await supabase
              .from('business_members')
              .select('business_id, role, businesses(*)')
              .eq('user_id', session.user.id);

            if (memberRecords && memberRecords.length > 0) {
              const businesses = memberRecords
                .map((m: any) => m.businesses)
                .filter(Boolean);
              setUserBusinesses(businesses);

              if (businesses.length > 0) {
                setCurrentBusiness(businesses[0]);
                setCurrentRole((memberRecords[0].role as UserRole) || 'OWNER');
              }
            }
          }
        }
      } catch (err) {
        console.warn('Auth initialization fallback:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
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
    markUserRegistered(false);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
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
      currentRole: 'OWNER',
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
