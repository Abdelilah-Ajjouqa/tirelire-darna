import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { logout } from '../store/slices/authSlice';
import { fetchProperties } from '../store/slices/realEstateSlice';

const Dashboard = () => {
    const { user } = useAppSelector((state) => state.auth);
    const { properties, loading, error } = useAppSelector((state) => state.realEstate);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Fetch data when dashboard mounts
        dispatch(fetchProperties());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Darna Listings</h1>
                    <p className="text-gray-500">Welcome, {user?.firstName}</p>
                </div>
                <button
                    onClick={() => dispatch(logout())}
                    className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50"
                >
                    Logout
                </button>
            </div>

            {/* Content */}
            {loading ? (
                <p>Loading properties...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <div key={property._id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                            <div className="h-48 bg-gray-200 rounded-t-lg">
                                {/* Image Placeholder */}
                                {property.images?.[0] ? (
                                    <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover rounded-t-lg" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-xl mb-1">{property.title}</h3>
                                <p className="text-green-600 font-bold text-lg">${property.price.toLocaleString()}</p>
                                <p className="text-gray-500 text-sm mb-4">{property.location}</p>
                                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;