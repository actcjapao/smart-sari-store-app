import { Paginator } from "@/types/Paginator.type";

export type Sale = {
   uuid: string;
   created_at: string;
   payment_method: string;
   total_amount: number;
   payment_amount: number;
   change_amount: number;
};

export type Summary = {
   total_sales: number;
   total_cost: number;
   total_profit: number;
};

export type PaginatedSale = {
   sales: Paginator<Sale>;
};

export type SaleItem = {
   brand: string;
   name: string;
   quantity: number;
   selling_price: number;
   unit_price: number;
   total_price: number;
};
