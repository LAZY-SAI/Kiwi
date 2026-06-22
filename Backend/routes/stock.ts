import {Router} from 'express'
import {poolBrand} from "../database/database";
import {tokenAuthentication} from "../middleware/TokenAuthentication";
import getStock from "../controllers/stock.controller";

const BrandsDetails = Router()
//inventory details

BrandsDetails.get("/api/inventory",tokenAuthentication ,getStock)


export default BrandsDetails