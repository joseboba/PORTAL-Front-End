export class Producto{

    codigo?: number;
    descripcion:string;
    monto: string;
    distribuidorCodigo: number;

    constructor( descripcion:string, monto: string, distribuidorId: number, codigo?: number ){
        this.codigo =  codigo
        this.descripcion = descripcion
        this.monto =  monto
        this.distribuidorCodigo =  distribuidorId
    }


}