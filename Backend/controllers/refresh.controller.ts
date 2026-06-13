import { generateRefreshToken, generateToken, verifyRefreshToken } from "../utils/auth";
import { UserPool } from "../database/database";

export const refreshToken = async (req: any, res: any) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    // Verify the refresh token (signed with JWT_REFRESH secret)
    const { payload, error } = verifyRefreshToken(incomingRefreshToken);

    if (error || !payload) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }

    try {
        // Fetch fresh user data (role might have changed since refresh token was issued)
        const result = await UserPool.query(
            "SELECT user_id, role FROM users WHERE user_id = $1",
            // @ts-ignore
            [payload.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result.rows[0];

        // Issue a new access token
        const newAccessToken = generateToken(user.user_id, user.role);

        res.cookie('token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000
        });

        // rotate the refresh token
        const newRefreshToken = generateRefreshToken(user.user_id, user.role);
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ message: "Token refreshed" });

    } catch (e: any) {
        console.error("Error during refresh:", e);
        return res.status(500).json({ message: "Refresh failed", error: e.message });
    }
};