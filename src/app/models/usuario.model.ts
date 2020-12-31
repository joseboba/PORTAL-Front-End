export class Usuario{

    codigo?: number;
    nombre: string;
    correo: string;
    telefono: string;
    distribuidorCodigo: number;

    constructor( nombre: string, correo: string, telefono: string, distribuidorCodigo: number, codigo?: number){
        this.codigo = codigo;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.distribuidorCodigo = distribuidorCodigo;
    }

}