import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

@Injectable() 
export class  AxiosAdapter implements HttpAdapter{
    private axios: AxiosInstance = axios;
    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.message);
            }
            throw new Error("No se pudo conectar a la API");
        }
    }
    // post<T>(url: string, data: any): Promise<T> {
    //     throw new Error("Method not implemented.");
    // }
    // put<T>(url: string, data: any): Promise<T> {
    //     throw new Error("Method not implemented.");
    // }
    // delete<T>(url: string): Promise<T> {
    //     throw new Error("Method not implemented.");
    // }
    // patch<T>(url: string, data: any): Promise<T> {
    //     throw new Error("Method not implemented.");
    // }
    
}