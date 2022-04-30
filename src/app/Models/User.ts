import { CreatedBy } from "./Data";
import { Rol } from "./Rol";

export interface User {
    idUsuario: number;
    usuario:   string;
    clave:     null;
    nombre:    string;
    apellido:  string;
    estado:    boolean;
    idRol:     number;
    fechaCre:  Date;
    fechaMod:  null;
    createdBy?: CreatedBy;
    rol?:       Rol;
}

export interface UserResponse {
    result:      User[];
    statusCode:  number;
    returnValue: null;
    message:     string;
  }