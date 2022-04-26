//Falta el modelo PREGUNTAS

export interface QuestionsResponse {
  result:      any[];
  statusCode:  number;
  returnValue: null;
  message:     string;
}

export interface Questions {
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
