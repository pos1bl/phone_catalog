import { Product } from './Product';

export type UniversalProduct = Omit<Product, 'id' | 'phoneId' | 'year'>;

export interface Cart {
  id: number,
  quantity: number;
  product: UniversalProduct;
}
