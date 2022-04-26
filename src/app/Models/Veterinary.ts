export interface VeterinaryResponse {
  statusCode:  number;
  returnValue: string;
  message:     string;
  result:      Veterinary;
}

export interface Veterinary {
  id:             number;
  nombre:         string;
  direccion:      string;
  telefono:       string;
  horario:        string;
  urlMaps:        string;
  urlInstagram:   string;
  urlFacebook:    string;
  idPageFacebook: string;
  fechaMod:       string;
}
