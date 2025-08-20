export default interface ContactRequest {
    id?: string;
    name: string;
    email: string;
    message: string;
    createdAt?: string;
}