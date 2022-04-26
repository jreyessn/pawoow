export interface RulesResponse {
  result:      any[];
  statusCode:  number;
  returnValue: null;
  message:     string;
}

export interface Rule {
  codSintoma:     any;
  codDiagnostico: string;
  descripcion:    string;
  codDiagSi:      null | string;
  codDiagNo:      null | string;
  codEnfeSi:      null | string;
  codEnfeNo:      null | string;
  inicio:         boolean;
  estado:         number;
  usuarioCre:     any;
  usuarioMod:     null;
  fechaCre:       Date;
  fechaMod:       null;
}
