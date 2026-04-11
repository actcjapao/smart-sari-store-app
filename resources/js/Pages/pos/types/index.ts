import { Product } from "@/Pages/products/types";

export default interface CartItem {
   product: Product;
   quantity: number;
}
