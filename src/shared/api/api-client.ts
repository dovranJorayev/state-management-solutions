import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export const apiClient = new QueryClient();
