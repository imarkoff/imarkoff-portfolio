import UserRole from "@/lib/models/types/UserRole";

export default interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    lastLoginAt: string;
}