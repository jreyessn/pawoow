export interface Rol {
    idRol:    number;
    nombre:   string;
    estado:   boolean;
    fechaCre: Date;
    fechaMod: null;
}

export interface RolResponse {
    result:      Rol[];
    statusCode:  number;
    returnValue: null;
    message:     string;
  }