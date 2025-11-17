import RealEstate from "../models/real-estate";

class RealEstateServices {

    private static async checkRealEstateExists(id: string): Promise<any> {
        const realEstate: object | null = await RealEstate.findById(id);
        if (!realEstate) {
            throw new Error("Cannot find the real-estate");
        }
        return realEstate;
    }

    static async getAllRealEstates(page: number = 1, limit: number = 10): Promise<any> {
        const offset: number = (page - 1) * limit;
        const totalCount: number = await RealEstate.countDocuments();

        const allRealEstates: object = await RealEstate.find()
            .skip(offset)
            .limit(limit)
            .sort({ createdAt: -1 });

        // Calculate pagination metadata
        const totalPages: number = Math.ceil(totalCount / limit);
        const hasNextPage: boolean = page < totalPages;
        const hasPrevPage: boolean = page > 1;

        return {
            data: allRealEstates,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalCount: totalCount,
                limit: limit,
                hasNextPage: hasNextPage,
                hasPrevPage: hasPrevPage
            }
        };
    }

    static async showRealEstate(id: string): Promise<any> {
        const realEstate: object | null = await this.checkRealEstateExists(id);
        return realEstate;
    }

    static async createRealEstate(data: any): Promise<any> {
        const duplicate: object | null = await RealEstate.exists({
            'location.address': data.location?.address,
            'location.coordinates.latitude': data.location?.coordinates?.latitude,
            'location.coordinates.longitude': data.location?.coordinates?.longitude,
        });
        if (duplicate) {
            throw new Error('A real-estate with the same address / coordinates already exists');
        }

        const newRealEstate: object = await RealEstate.create(data);
        return newRealEstate;
    }

    static async updateRealEstate(id: string, data: any): Promise<any> {
        await this.checkRealEstateExists(id);
        const updatedRealEstate: object | null = await RealEstate.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
        return updatedRealEstate;
    }

    static async deleteRealEstate(id: string): Promise<any> {
        await this.checkRealEstateExists(id);
        const realEstate: object | null = await RealEstate.findByIdAndDelete(id);
        return { message: "Real-estate deleted successfully", deletedRealEstate: realEstate };
    }

    static async searchRealEstate(filters: any): Promise<any> {
        const query: any = {};

        // Price range filter
        if (filters.minPrice || filters.maxPrice) {
            query.price = {};
            if (filters.minPrice) query.price.$gte = parseFloat(filters.minPrice);
            if (filters.maxPrice) query.price.$lte = parseFloat(filters.maxPrice);
        }

        // Property type filter
        if (filters.type) {
            query.type = filters.type;
        }

        // Location filter (city, address, etc.)
        if (filters.location) {
            query['location.address'] = { $regex: filters.location, $options: 'i' };
        }

        // Bedrooms filter
        if (filters.bedrooms) {
            query.bedrooms = { $gte: parseInt(filters.bedrooms) };
        }

        // Bathrooms filter
        if (filters.bathrooms) {
            query.bathrooms = { $gte: parseInt(filters.bathrooms) };
        }

        // Area/Size filter
        if (filters.minArea || filters.maxArea) {
            query.area = {};
            if (filters.minArea) query.area.$gte = parseFloat(filters.minArea);
            if (filters.maxArea) query.area.$lte = parseFloat(filters.maxArea);
        }

        // Availability filter
        if (filters.isAvailable !== undefined) {
            query.isAvailable = filters.isAvailable === 'true';
        }

        // Status filter (for sale, for rent, etc.)
        if (filters.status) {
            query.status = filters.status;
        }

        const limit = filters.limit ? parseInt(filters.limit) : 50;
        const page = filters.page ? parseInt(filters.page) : 1;
        const skip = (page - 1) * limit;

        const results = await RealEstate.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalCount = await RealEstate.countDocuments(query);

        return {
            data: results,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalCount,
                limit,
                hasNextPage: page < Math.ceil(totalCount / limit),
                hasPrevPage: page > 1
            }
        };
    }

    static async updateAvailability(id: string, availability: boolean): Promise<any> {
        await this.checkRealEstateExists(id);
        const updatedRealEstate: object | null = await RealEstate.findByIdAndUpdate(
            id,
            { availability: availability },
            { new: true }
        );
        return updatedRealEstate;
    }

}

export default RealEstateServices;