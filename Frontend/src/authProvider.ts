const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

export const authProvider = {
    login: async ({ email, password }: { email: string; password: string }) => {
        try {
            const res = await fetch(`${BACKEND_URI}/api/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                return {
                    success: false,
                    error: {
                        message: data.message || "Login failed",
                        name: "LoginError",
                    },
                };
            }

            return { success: true, redirectTo: "/dashboard" };
        } catch (e) {
            return {
                success: false,
                error: {
                    message: "Network error during login",
                    name: "LoginError",
                },
            };
        }
    },

    check: async () => {
        try {
            const res = await fetch(`${BACKEND_URI}/api/me`, {
                method: "GET",
                credentials: "include",
            });

            if (res.ok) {
                return { authenticated: true };
            }

            return { authenticated: false, redirectTo: "/signup" };
        } catch (e) {
            return { authenticated: false, redirectTo: "/signup" };
        }
    },

    logout: async () => {
        try {
            await fetch(`${BACKEND_URI}/api/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (e) {
            console.error("error in logging out ", e);

        }
        return { success: true, redirectTo: "/signup" };
    },

    onError: async (error: any) => {
        if (error?.statusCode === 401 || error?.statusCode === 403) {
            return { logout: true, redirectTo: "/signup" };
        }
        return { error };
    },

    getIdentity: async () => {
        try {
            const response = await fetch(`${BACKEND_URI}/api/me`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    location: data.user.location,
                    role: data.user.role,
                };
            }
            return null;
        } catch (e) {
            console.error("error in fetching ", e);
            return null;
        }
    },
};