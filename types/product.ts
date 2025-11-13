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

export interface IOrder {
    buyer_name: string;
    buyer_email: string;
    seller_email: string;
    total_quantity: number;
    items: {
        product_id: string;
        product_title: string;
        product_category: string;
        price: number;
        quantity: number;
    }[];
    total_price: number;
    payment_method: string;
    payment_status: string;
    status: string;
    address: string;
    phone: string;
}
