import axios from 'axios';

const API_URL = import.meta.env.DARNA_API;

const getProperties = async () => {
    const response = await axios.get(`${API_URL}/real-estate`);
    return response.data;
};

const getPropertyById = async (id: string) => {
    const response = await axios.get(`${API_URL}/real-estate/${id}`);
    return response.data;
};

const realEstateService = {
    getProperties,
    getPropertyById,
};

export default realEstateService;