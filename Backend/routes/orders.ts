import { Router } from 'express';
import { tokenAuthentication } from "../middleware/TokenAuthentication";
import { getOrders } from "../controllers/orders.controller"; // Import the controller

const Orders = Router();


Orders.get('/api/orders', tokenAuthentication, getOrders);

export default Orders;