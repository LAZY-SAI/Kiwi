import { Router } from "express";
import {refreshToken} from "../controllers/refresh.controller";
//import {tokenAuthentication} from "../middleware/TokenAuthentication";

const RefreshToken = Router();

RefreshToken.post('/refresh',refreshToken)

export default RefreshToken