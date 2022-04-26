export interface DiseasesResponse {
  result:      any[];
  statusCode:  number;
  returnValue: null;
  message:     string;
}

export interface Diseases {
  codigo:      string;
  nombre:      string;
  descripcion: string;
  nivel:       number;
  estado:      number;
  usuarioCre:  string;
  usuarioMod:  null;
  fechaCre:    Date;
  fechaMod:    null;
}

