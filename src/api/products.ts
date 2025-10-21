import axios, { AxiosError } from "axios";
import type {  Product } from "../shared/lib";


const API_BASE_URL = 'https://fakestoreapi.com';

export const API = {

  getProductsList: (): Promise<Product[]> =>
    axios.get(`${API_BASE_URL}/products`)
  .then(response => response.data)
  .catch((error) => {
    throw new AxiosError(error)
  })
};