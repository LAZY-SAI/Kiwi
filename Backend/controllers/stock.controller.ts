import {Request, Response} from 'express';
import {poolBrand} from '../database/database'

export const getStock = async (req:Request, res:Response)=>{
    try{
        const queryText = `
        SELECT 
    s.product_id,
    b.name AS brand_name,
    s.product_name,
    s.stock_level,
    s.status AS stock_status
FROM stocks s
JOIN brands b ON s.brand_id = b.brand_id;`

        // const queryText2 = `
        //     SELECT COUNT (*) AS total_out_of_stock FROM stocks WHERE status = 'Out of Stock'`
        // const
        const response = await poolBrand.query(queryText)


        if(response.rows.length === 0){

            return res.status(200).json({message:"brand not found"})
        }
        res.json(response.rows)
        console.log(response.rows)
    }
    catch (e) {
        console.error("error:",e)
        res.status(500).json({message:"internal server error"})
    }
}

export default getStock;