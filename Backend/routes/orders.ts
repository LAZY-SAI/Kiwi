import { Router } from 'express';
import { tokenAuthentication } from "../middleware/TokenAuthentication";
import { getOrders } from "../controllers/orders.controller"; // Import the controller
import {adminAuth} from '../middleware/adminAuth'
const Orders = Router();


Orders.get('/api/orders', tokenAuthentication, adminAuth,getOrders);

export default Orders;