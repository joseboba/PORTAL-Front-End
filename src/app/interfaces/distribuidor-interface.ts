export interface DistribuidorResponse {
    ok:             boolean;
    distribuidores: Distribuidor[];
}

export interface Distribuidor {
    codigo:             number;
    nombre:             string;
    correoNotificacion: string;
    correoAlertas:      string;
}
