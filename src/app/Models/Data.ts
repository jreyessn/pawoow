export interface DataResponse {
  result:      any[];
  statusCode:  number;
  returnValue: null;
  message:     string;
}

export interface Data {
  sintomas:     number;
  enfermedades: number;
  preguntas:    number;
}

export interface CreatedBy {
  usuarioCre:  string;
  usuarioMod:  null;
  fechaCre:    Date;
  fechaMod:    null;
}