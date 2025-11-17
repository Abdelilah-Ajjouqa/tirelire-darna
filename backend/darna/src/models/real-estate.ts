import mongoose, { Document } from "mongoose";

// TypeScript interfaces that describe the data shape
export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Location {
    address: string;
    coordinates: Coordinates;
}

export interface RoomDimension {
    roomName: string;
    length: number;
    width: number;
    surface: number;
}

export interface Equipment {
    wifi?: boolean;
    airConditioning?: boolean;
    parking?: boolean;
    heating?: boolean;
    balcony?: boolean;
    garden?: boolean;
    pool?: boolean;
    elevator?: boolean;
}

export interface InternalRules {
    animalsAllowed?: boolean;
    smokingAllowed?: boolean;
    partiesAllowed?: boolean;
}

export interface Characteristics {
    totalSurface: number;
    roomDimensions: RoomDimension[];
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    equipment: Equipment;
    internalRules: InternalRules;
    energyDiagnostics?: string;
}

export type TransactionType = 'sale' | 'daily rental' | 'monthly' | 'seasonal';


export interface IRealEstate {
    title: string;
    description: string;
    transactionType: TransactionType;
    price: number;
    availability: boolean;
    location: Location;
    characteristics: Characteristics;
    createdAt?: Date;
    updatedAt?: Date;
}

export type RealEstateInput = Omit<IRealEstate, 'createdAt' | 'updatedAt'>;

const realEstateSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        transactionType: { type: String, required: true, enum: ['sale', 'daily rental', 'monthly', 'seasonal'] },
        price: { type: Number, required: true, min: 0 },
        availability: { type: Boolean, default: true },

        location: {
            address: { type: String, required: true },
            coordinates: {
                latitude: {
                    type: Number,
                    required: true,
                    min: -90,
                    max: 90,
                },
                longitude: {
                    type: Number,
                    required: true,
                    min: -180,
                    max: 180,
                },
            },
        },

        characteristics: {
            totalSurface: { type: Number, required: true, min: 0 },
            roomDimensions: [{ roomName: String, length: Number, width: Number, surface: Number }],
            // renamed to numberOfBedrooms to match TypeScript interface
            numberOfBedrooms: { type: Number, required: true, min: 0 },
            numberOfBathrooms: { type: Number, required: true, min: 0 },
            equipment: {
                wifi: { type: Boolean, default: false },
                airConditioning: { type: Boolean, default: false },
                parking: { type: Boolean, default: false },
                heating: { type: Boolean, default: false },
                balcony: { type: Boolean, default: false },
                garden: { type: Boolean, default: false },
                pool: { type: Boolean, default: false },
                elevator: { type: Boolean, default: false },
            },
            internalRules: {
                animalsAllowed: { type: Boolean, default: false },
                smokingAllowed: { type: Boolean, default: false },
                partiesAllowed: { type: Boolean, default: false },
            },
            energyDiagnostics: { type: String },
        },
    },
    { timestamps: true }
);

realEstateSchema.index({ 'location.coordinates.latitude': 1, 'location.coordinates.longitude': 1 });
realEstateSchema.index({ transactionType: 1, price: 1 });
realEstateSchema.index({ availability: 1 });

export type RealEstateDocument = Document & IRealEstate;

const RealEstate = mongoose.model<RealEstateDocument>('RealEstate', realEstateSchema);

export default RealEstate;