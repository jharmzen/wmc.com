import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { login as apiLogin, autoLogin } from '../services/api';
import type { MemberData } from '../types';

// Define DashboardData based on MemberData fields
interface DashboardData {
  totalCommission: string;
  clubUnits: string;
  ClubUnitGrowth: string;
  membershipStatus: string;
  currency: string;
  exchangeRate: number;
  fullName: string;
  phoneNumber: string;
}

// Define GlobalState
interface GlobalState {
  memberData: MemberData | null;
  dashboard: DashboardData | null;
  events: Array<{
    SeminarName: string;
    EventDate: string;
    StartTime: string;
    Venue: string;
    EventImage: string;
    SocialImage: string;
  }> | null;
}

// Define AuthContextType
interface AuthContextType {
  state: GlobalState;
  isAuthenticated: boolean;
  user: MemberData | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  setMemberData: (data: MemberData) => void;
  logout: () => void;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storedState = localStorage.getItem('appState');
  let initialState: GlobalState;
  try {
    initialState = storedState ? JSON.parse(storedState) : {
      memberData: null,
      dashboard: null,
      events: null,
    };
  } catch (error) {
    console.error('Error parsing stored auth state:', error);
    // Clear corrupted data
    localStorage.removeItem('appState');
    initialState = {
      memberData: null,
      dashboard: null,
      events: null,
    };
  }

  const [state, setState] = useState<GlobalState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('session_member_token');
      if (token) {
        try {
          const response = await autoLogin(token);
          if (response.Success && response.Msg && !Array.isArray(response.Msg) && response.Msg.MemberData) {
            setMemberData(response.Msg.MemberData);
          } else {
            localStorage.removeItem('session_member_token');
          }
        } catch {
          localStorage.removeItem('session_member_token');
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  // Update dashboard when memberData is set
  useEffect(() => {
    if (state.memberData) {
      // Format currency values
      const formattedCommission = formatCurrency(
        state.memberData.ClubUnitAmount,
        state.memberData.CurrencyCode
      );
      
      setState((prev) => ({
        ...prev,
        dashboard: {
          totalCommission: formattedCommission,
          clubUnits: state.memberData?.ClubUnits || 'N/A',
          ClubUnitGrowth: String(state.memberData?.ClubUnitGrowth || 'N/A'),
          membershipStatus: state.memberData?.MemberStatusDescription || 'N/A',
          currency: state.memberData?.CurrencyCode || 'ZAR',
          exchangeRate: state.memberData?.ExchangeRate || 1,
          fullName: `${state.memberData?.FirstNames} ${state.memberData?.Surname}`.trim(),
          phoneNumber: state.memberData?.Phone || 'N/A',
        },
        events: state.memberData?.Events || null
      }));
    }
  }, [state.memberData]);
  
  // Helper function to format currency values
  const formatCurrency = (value: string, currencyCode: string): string => {
    // Remove commas and convert to number
    const numericValue = parseFloat(value.replace(/,/g, ''));
    
    if (isNaN(numericValue)) return value;
    
    return numericValue.toLocaleString('en-ZA', {
      style: 'currency',
      currency: currencyCode || 'ZAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Function to update MemberData
  const setMemberData = (data: MemberData) => {
    updateState({ memberData: data });
  };

  // Login function
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiLogin(username, password);
      if (response.Success && response.Msg && !Array.isArray(response.Msg) && response.Msg.MemberData) {
        setMemberData(response.Msg.MemberData);
      } else {
        throw new Error(Array.isArray(response.Msg) ? response.Msg[0] : 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update and persist state
  const updateState = (newData: Partial<GlobalState>) => {
    const updatedState = { ...state, ...newData };
    try {
      localStorage.setItem('appState', JSON.stringify(updatedState));
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
    setState(updatedState);
  };

  // Logout function
  const logout = () => {
    try {
      localStorage.removeItem('appState');
    } catch (error) {
      console.error('Error clearing auth state:', error);
    }
    setState({ memberData: null, dashboard: null, events: null });
  };

  return (
    <AuthContext.Provider value={{ state, isAuthenticated: !!state.memberData, user: state.memberData, isLoading, login, setMemberData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};