export interface GetProductParams {
  filterName: string;
  orderby: string;
  order: "asc" | "desc";
  limit: number;
  page: number;
}
export interface CreateProductParams {
  name: string;
  price: number;
}
export interface UpdateProductParams extends CreateProductParams {
  id: string;
}

export interface ProductsResponse {
  status: string;
  result: Product;
}

export interface Product {
  pages: number;
  total: number;
  limit: number;
  payload: ProductItem[];
}

export interface ProductItem {
  _id: string;
  name: string;
  price: number;
  creationDate: string;
}

export interface CreateProductResponse {
  status: string;
  newProduct: NewProduct;
}

export interface NewProduct {
  _id: string;
  price: number;
  name: string;
  creationDate: string;
}
