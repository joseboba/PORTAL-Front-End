export interface ProductoResponse {
    ok:        boolean;
    productos: Producto[];
}


export interface Producto{
    codigo?: number;
    descripcion:string;
    monto: string;
    distribuidorCodigo: number;
}