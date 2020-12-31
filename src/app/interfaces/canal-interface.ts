export interface Canal {
    codigo:             number;
    nombre:             string;
    distribuidorCodigo: number;
}

export interface CanalResponse {
    ok:    boolean;
    canal: Canal[];
}

export interface CanalSave {
    ok:    boolean;
    canal: Canal;
}