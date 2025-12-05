export interface Property {
    _id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    type: 'sale' | 'rent';
    images: string[];
    ownerId: string;
    createdAt: string;
}

export interface RealEstateState {
    properties: Property[];
    loading: boolean;
    error: string | null;
    selectedProperty: Property | null;
}