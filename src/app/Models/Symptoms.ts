export interface SymptomsResponse {
  result:      any[];
  statusCode:  number;
  returnValue: null;
  message:     string;
}

export interface Symptoms {
  codigo:      string;
  nombre:      string;
  descripcion: string;
  estado:      number;
  usuarioCre:  string;
  usuarioMod:  null;
  fechaCre:    Date;
  fechaMod:    null;
}

