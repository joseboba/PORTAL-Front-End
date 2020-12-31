export class Horario{

    codigo?: number;
    start: string;
    end: string;
    distribuidorCodigo: number;


    constructor(start: string, end: string, distribuidorId: number, codigo?: number){
        this.codigo = codigo;
        this.start = start;
        this.end = end;
        this.distribuidorCodigo = distribuidorId;
    }

}