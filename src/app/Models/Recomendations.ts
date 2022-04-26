export interface RecomendationsResponse {
  result:      any[];
  statusCode:  number;
  returnValue: null;
  message:     string;
}

export interface Recomendations {
  codigo:        number;
  titulo:        string;
  descripcion:   string;
  estado:        number;
  codEnfermedad: string;
  usuarioCre:    string;
  usuarioMod:    null;
  fechaCre:      Date;
  fechaMod:      null;
}
