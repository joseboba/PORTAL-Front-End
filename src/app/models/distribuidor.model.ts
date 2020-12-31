export class Distribuidor{

    codigo?: number;
    nombre: string;
    correoNotificacion: string;
    correoAlertas: string;

    constructor( nombre: string, correoNotificacion: string, correoAlertas: string, codigo?: number ){
    
        this.codigo = codigo;
        this.nombre = nombre;
        this.correoNotificacion = correoNotificacion;
        this.correoAlertas = correoAlertas;

    }

}