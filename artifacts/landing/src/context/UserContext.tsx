import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type UserStatus = "visitor" | "pending" | "free" | "paid";

export type UserProfile = {
  status: UserStatus;
  name: string;
  email: string;
  phone: string;
  country: string;
  location: string;
  accessType: "free" | "paid" | "";
  motivation: string[];
  wantCall: boolean;
  eventPreference: string;
  whatsappConsent: boolean;
};

const DEFAULT_PROFILE: UserProfile = {
  status: "visitor",
  name: "",
  email: "",
  phone: "",
  country: "",
  location: "",
  accessType: "",
  motivation: [],
  wantCall: false,
  eventPreference: "",
  whatsappConsent: false,
};

const STORAGE_KEY = "nordicasia_user";

function loadFromStorage(): UserProfile {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch { /* ignore */ }
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
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const signOut = useCallback(() => {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setUserState(DEFAULT_PROFILE);
  }, []);

  useEffect(() => {
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
  paid: "Paid member",
};

export const STATUS_COLORS: Record<UserStatus, string> = {
  visitor: "bg-muted text-muted-foreground",
  pending: "bg-amber-100 text-amber-700",
  free: "bg-sky-100 text-sky-700",
  paid: "bg-primary/10 text-primary",
};
