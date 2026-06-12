import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

const API_URI = import.meta.env.VITE_BACKEND_URI;

interface UserData {
    id: string;
    name: string;
    email: string;
    location: string;
    bio: string;
    role: "admin" | "customer";
}

interface AuthContextType {
    user: UserData | null;
    loading: boolean;
    login: (userData: UserData) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${API_URI}/api/me`, {
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (userData: UserData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await fetch(`${API_URI}/api/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (err) {
            // even if the request fails, clear local state
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};