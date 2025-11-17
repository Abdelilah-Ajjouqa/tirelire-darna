import { Request, Response } from "express";
import { PriceEstimationService } from "../services/priceEstimationService";
import { RealEstateInput } from "../models/real-estate";

export class PriceEstimationController {
  private service: PriceEstimationService;

  constructor() {
    this.service = new PriceEstimationService();
  }

  async estimate(req: Request, res: Response): Promise<void> {
    try {
  const propertyData: RealEstateInput = req.body;
  const result = await this.service.estimatePrice(propertyData);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
