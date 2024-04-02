import { AxiosRequestConfig } from "axios";
import AxiosService from "./axios.service";
import {
  CreateProductParams,
  GetProductParams,
  UpdateProductParams,
  ProductsResponse,
  CreateProductResponse,
} from "@interfaces/products.interfaces";

export const ProductService = {
  async getProducts(
    params?: Partial<GetProductParams>
  ): Promise<ProductsResponse> {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/products",
      params,
    };
    return await AxiosService.http(config);
  },

  async addProduct(
    params: Partial<CreateProductParams>
  ): Promise<CreateProductResponse> {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/products/add",
      params,
    };
    return await AxiosService.http(config);
  },

  async editProduct(
    params: Partial<UpdateProductParams>
  ): Promise<{ status: string }> {
    const { id, ...p } = params;
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/products/edit/${id}`,
      params: p,
    };
    return await AxiosService.http(config);
  },

  async removeProduct(id: string): Promise<{ status: string }> {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/products/remove/${id}`,
    };
    return await AxiosService.http(config);
  },
};
