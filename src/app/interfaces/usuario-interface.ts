export interface UsuarioReponse {
    ok:        boolean;
    usuarios: Usuario[];
}

export interface Usuario{
    codigo?: number;
    nombre: string;
    correo: string;
    telefono: string;
    distribuidorCodigo: number;
}