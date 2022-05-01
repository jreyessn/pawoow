export interface Permiso {
    idRol:     number;
    codModulo: string;
    listar:    boolean;
    insertar:  boolean;
    modificar: boolean;
    eliminar:  boolean;
    fechaCre:  string;
    fechaMod:  string;
}


export interface PermisoResponse {
    result:      Permiso[];
    statusCode:  number;
    returnValue: null;
    message:     string;
}