export type Product = {
   id: number;
   uuid: string;
   store_id: number;
   name: string;
   brand: string | null;
   description: string | null;
   stock_quantity: number;
   price: number;
   tags: string[];
   is_active: boolean;
};
