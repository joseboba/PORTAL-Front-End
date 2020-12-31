export class Canal{

    codigo?: number;
    nombre: string;
    distribuidorCodigo: number;

    constructor(nombre: string, distribuidorId: number, codigo?: number){
        this.codigo = codigo;
        this.nombre = nombre;
        this.distribuidorCodigo = distribuidorId;
    }

}