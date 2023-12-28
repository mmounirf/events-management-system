import { supabase } from "@/lib/supabase";
import { showError } from "@/utils/errorNotification";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthContext = {
    user?: User | null,
    setUser: (user?: User | null) => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | undefined | null>();

    useEffect(() => {
        supabase.auth.getSession().then(({ error, data }) => {

            if (error !== null) {
                setUser(null);
                showError({ title: error.name, message: error.message })
            }

            if (data.session !== null) {
                setUser(data.session.user)
            }
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session ? session.user : null)

        })

        return () => subscription.unsubscribe()
    }, [])

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}