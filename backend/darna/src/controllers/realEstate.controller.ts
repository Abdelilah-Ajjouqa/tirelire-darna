import { Request, Response } from "express";
import RealEstateServices from "../services/realEstate.service";

class RealEstateControllers {
    static async getAllRealEstates(req: Request, res: Response): Promise<void> {
        try {
            const page: number = parseInt(req.query.page as string) || 1;
            const limit: number = parseInt(req.query.limit as string) || 10;

            const result: object | null = await RealEstateServices.getAllRealEstates(page, limit);

            res.status(200).json({
                success: true,
                message: "Real estates retrieved successfully",
                ...result
            });

        } catch (error: any) {
            res.status(404).json({
                success: false,
                error: error.message
            });
        }
    }

    static async showRealEstate(req: Request, res: Response): Promise<any> {
        try {
            const id: string = req.params.realEstateId;
            const result: object | null = await RealEstateServices.showRealEstate(id)

            res.status(200).json({
                success: true,
                message: "Real estate retrieved successfully",
                result
            })
        } catch (error: any) {
            res.status(404).json({
                success: false,
                error: error.message
            });
        }
    }

    static async createRealEstate(req: Request, res: Response): Promise<any> {
        try {
            const data: any = req.body;
            const newRealEstate: object = await RealEstateServices.createRealEstate(data)

            res.status(201).json({
                success: true,
                message: "real estate created successfully",
                newRealEstate
            })
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }

    static async updateRealEstate(req: Request, res: Response): Promise<any> {
        try {
            const realEstateId: string = req.params.realEstateId
            const updatedData: any = req.body;
            const updatedRealEstate: object = await RealEstateServices.updateRealEstate(realEstateId, updatedData);

            res.status(200).json({
                success: true,
                message: "the reals estate updated successfully",
                updatedRealEstate
            })
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }

    static async deleteRealEstate(req: Request, res: Response): Promise<any> {
        try {
            const realEstateId: string = req.params.realEstateId;
            await RealEstateServices.deleteRealEstate(realEstateId);
            res.status(200).json({
                success: true,
                message: "the real-estate remove successfully"
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }

    static async searchRealEstate(req: Request, res: Response): Promise<any> {
        try {
            const filters = req.query;
            const search = await RealEstateServices.searchRealEstate(filters)

            res.status(200).json({
                success: true,
                message: "Search completed successfully",
                data: search,
                count: search.length
            })
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

export default RealEstateControllers;