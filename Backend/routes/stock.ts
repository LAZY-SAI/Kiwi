import {Router} from 'express'
import {poolBrand} from "../database/database";
import {tokenAuthentication} from "../middleware/TokenAuthentication";

const BrandsDetails = Router()

const query = "SELECT "
BrandsDetails.get("/api/inventory",tokenAuthentication ,async(req,res) =>
{
    try{
        const response = await poolBrand.query("SELECT * FROM brands",
           //@ts-ignore
            [req.brandId])

        if(response.rows.length === 0){
            return res.status(200).json({message:"brand not found"})
        }
        res.json(response.rows[0])
        console.log(response.rows[0])
    }
    catch (e) {
        console.error("error:",e)
        res.status(500).json({message:"internal server error"})
    }
})
export default BrandsDetails