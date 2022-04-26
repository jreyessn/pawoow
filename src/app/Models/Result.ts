export interface Results {
  result:      Result;
  statusCode:  number;
  returnValue: null;
  message:     string;
}

export interface Result {
  nombre:   string;
  apellido: string;
  token:    string;
}
