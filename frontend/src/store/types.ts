export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'Particulier' | 'Admin';
    isKYCVerified: boolean;
    facialVerificationStatus: 'pending' | 'verified' | 'failed';
}

export interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}