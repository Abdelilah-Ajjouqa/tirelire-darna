import { Router } from "express";
import { PriceEstimationController } from "../controllers/PriceEstimationController";

const router = Router();
const controller = new PriceEstimationController();

router.post("/price-estimation", (req, res) => controller.estimate(req, res));

export default router;
