export interface IProduct {
    _id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string[];
    seller_email: string;
    createdAt?: string;
    updatedAt?: string;
}