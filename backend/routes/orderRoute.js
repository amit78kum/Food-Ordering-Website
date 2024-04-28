import express from "express";
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeorder, userOrders, verifyOrder } from "../controllers/orderController.js";


const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeorder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get('/list',listOrders)


export default orderRouter;