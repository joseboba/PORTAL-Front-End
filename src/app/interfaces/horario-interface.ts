export interface HorarioResponse {
    ok:      boolean;
    horario: Horario[];
}

export interface Horario {
    codigo?:             number;
    start:              string;
    end:                string;
    distribuidorCodigo: number;
}
