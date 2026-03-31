import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type UserStatus = "visitor" | "pending" | "free" | "paid" | "company";

export type UserProfile = {
  status: UserStatus;
  name: string;
  email: string;
  phone: string;
  joinType: "personal" | "company" | "";
  companyName: string;
  accessType: "free" | "paid" | "";
  whatsappConsent: boolean;
  authMethod: "magic" | "password" | "";
};

const DEFAULT_PROFILE: UserProfile = {
  status: "visitor",
  name: "",
  email: "",
  phone: "",
  joinType: "",
  companyName: "",
  accessType: "",
  whatsappConsent: false,
  authMethod: "",
};

const STORAGE_KEY = "nordicasia_user";

function loadFromStorage(): UserProfile {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULT_PROFILE;
}

type UserContextType = {
  user: UserProfile;
  setUser: (profile: Partial<UserProfile>) => void;
  signOut: () => void;
  isAuthenticated: boolean;
};

const UserContext = createContext<UserContextType>({
  user: DEFAULT_PROFILE,
  setUser: () => {},
  signOut: () => {},
  isAuthenticated: false,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserProfile>(loadFromStorage);

  const setUser = useCallback((patch: Partial<UserProfile>) => {
    setUserState((prev) => {
      const next = { ...prev, ...patch };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const signOut = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setUserState(DEFAULT_PROFILE);
  }, []);

  useEffect(() => {
    // Sync storage in case another tab changes it
    const handler = () => setUserState(loadFromStorage());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const isAuthenticated = user.status !== "visitor";

  return (
    <UserContext.Provider value={{ user, setUser, signOut, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export const STATUS_LABELS: Record<UserStatus, string> = {
  visitor: "Visitor",
  pending: "Pending approval",
  free: "Free member",
  paid: "Member",
  company: "Company member",
};

export const STATUS_COLORS: Record<UserStatus, string> = {
  visitor: "bg-muted text-muted-foreground",
  pending: "bg-amber-100 text-amber-700",
  free: "bg-sky-100 text-sky-700",
  paid: "bg-primary/10 text-primary",
  company: "bg-violet-100 text-violet-700",
};
