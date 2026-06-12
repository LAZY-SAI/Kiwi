import { Request, Response } from 'express';
import { UserPool } from "../database/database";

export const getOrders = async (req: Request, res: Response) => {
    try {
        const queryText = `
            SELECT u.user_id,
            u.name,
            o.order_id,
            o.order_description,
            o.total_amount,
            o.status,
            o.created_at 
            FROM users u 
            RIGHT JOIN orders o ON u.user_id = o.user_id`;

        const response = await UserPool.query(queryText);

        if (response.rows.length === 0) {
            return res.status(200).json({ message: "no data found" });
        }

        return res.status(200).json({
            message: "data fetched",
            data: response.rows,
            total: response.rows.length
        });

    } catch (e) {
        console.error("error:", e);
        return res.status(500).json({ message: "internal server error" });
    }
};