import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { SymptomsResponse } from '../Models/Symptoms';
import { AddSymptomsComponent } from '../usser/add-symptoms/add-symptoms.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorPopupComponent } from '../usser/error-popup/error-popup.component';
import { AddQuestionComponent } from '../usser/add-question/add-question.component';
import { AddDiseasesComponent } from '../usser/add-diseases/add-diseases.component';
import { AddRulesComponent } from '../usser/add-rules/add-rules.component';

@Injectable({
  providedIn: 'root'
})
export class PawwowService {

  private baseUrl = "http://pawwow-002-site1.ctempurl.com"

  constructor(private httpClient: HttpClient,
              private dialog: MatDialog,) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });


    // k1k3 : Obtiene los sintomas
    public getDataDashboard(): Observable<any> {
      var index = index;
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
      console.log(reqHeader);
      return this.httpClient
        .get<any>(`${this.baseUrl}/restapi/api/Dashboard`, {
          headers: reqHeader,
          //.set('pageNumber', pageNumber.toString())
        })
        .pipe(map((data) => data));
    }


    // k1k3 : Autentica al usuario - Iniciar Sesion
    public userAutentication(email, password) {
      var apiName = `/restapi/api/Usuario/${email}/${password}`;
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json"
      });
      return this.httpClient.post<any>(this.baseUrl+apiName, {
        headers: reqHeader,
      }).pipe(map((data) => data));
    }

    public setNameInInLocalStorage(name: any, apellido: any){
      localStorage.setItem("user_name", name);
      localStorage.setItem("user_apellido", apellido);
    }

    public getNameInInLocalStorage(): string {
      var name = localStorage.getItem("user_name") ?? "";
      var apellido = localStorage.getItem("user_apellido");
      return name;
    }

    // k1k3 : Setea el token en el localStorage
    public setTokenInLocalStorage(token: any){
      localStorage.setItem("user_token", token);
    }

    // k1k3 : Borra el token en el localStorage
    public deleteTokenInLocalStorage(){
      localStorage.clear();
    }

    // k1k3 : Obtiene los sintomas
    public getSymptoms(): Observable<any> {
      var index = index;
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
      console.log(reqHeader);
      return this.httpClient
        .get<any>(`${this.baseUrl}/restapi/api/Sintoma`, {
          headers: reqHeader,
          //.set('pageNumber', pageNumber.toString())
        })
        .pipe(map((data) => {
          data.result = data.result.map(item => {
            item.createdBy = this.mapCreatedBy(item)
            return item
          })

          return data
        }))
    }

    // k1k3 : Obtiene las enfermedades
    public getRecomendation(): Observable<any> {
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
      console.log(reqHeader);
      return this.httpClient
        .get<any>(`${this.baseUrl}/restapi/api/Recomendacion`, {
          headers: reqHeader,
        })
        .pipe(map((data) => data));
    }


    // k1k3 : Obtiene las enfermedades
    public getDiseases(): Observable<any> {
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
      console.log(reqHeader);
      return this.httpClient
        .get<any>(`${this.baseUrl}/restapi/api/Enfermedad`, {
          headers: reqHeader,
        })
        .pipe(map((data) => {
          data.result = data.result.map(item => {
            item.createdBy = this.mapCreatedBy(item)
            return item
          })

          return data
        }))
    }

    // k1k3 : Crea una Regla
    public createRule(codeSymptom, codeQuestion, codeQuestionYes, codeQuestionNot, codeDiaseaseYes, codeDiaseaseNot, isMain) {
      var apiName = `${this.baseUrl}/restapi/api/Regla`;
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });
      return this.httpClient
      .post<any>(
        apiName,
        { codigo: null, codSintoma : codeSymptom, codDiagnostico: codeQuestion, codDiagSi: codeQuestionYes, codDiagNo: codeQuestionNot, codEnfeSi: codeDiaseaseYes, codEnfeNo: codeDiaseaseNot, inicio: isMain, estado: 1 },
        {headers: reqHeader})
      .pipe(map((data) => data));
    }

    // k1k3 : Crea un Sintoma
    public createSymptom(symptom, description) {
      var apiName = `${this.baseUrl}/restapi/api/Sintoma`;
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });
      return this.httpClient
      .post<any>(
        apiName,
        { codigo: null, nombre : symptom, descripcion: description, estado: 1 },
        {headers: reqHeader})
      .pipe(map((data) => data));
    }

    // k1k3 : Edita un Sintoma
    public editSymptom(code, symptom, description) {
      var apiName = `${this.baseUrl}/restapi/api/Sintoma`;
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });
      return this.httpClient
      .put<any>(
        apiName,
        { codigo: code, nombre : symptom, descripcion: description, estado: 1 },
        {headers: reqHeader})
      .pipe(map((data) => data));
    }

    // k1k3 : Elimina un Sintoma
    public deleteSymptom(code) {
      var apiName = `${this.baseUrl}/restapi/api/Sintoma/${code}`;
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });
      return this.httpClient
      .delete<any>(
        apiName,
        {headers: reqHeader})
      .pipe(map((data) => data));
    }



    // k1k3 : Crea una Enfermedad
    public createDisease(name, description, level, r_title, r_description ) {
      console.log(name, description, level, r_title, r_description)
      var apiName = `${this.baseUrl}/restapi/api/Enfermedad`;
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });
      return this.httpClient
      .post<any>(
        apiName,
        { codigo: "", nombre : name, descripcion: description, nivel: 2, estado: 1,
          recomendaciones : [
            {
              codigo: 0,
              titulo: r_title,
              descripcion: r_description,
              codEnfermedad: null,
              estado: 1
            }
          ]
        },
        {headers: reqHeader})
      .pipe(map((data) => data));
    }


    // k1k3 : Edita una Enfermedad
    public editDisease(code, symptom, description) {
      var apiName = `${this.baseUrl}/restapi/api/Enfermedad`;
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });
      return this.httpClient
      .put<any>(
        apiName,
        { codigo: code, nombre : symptom, descripcion: description, estado: 1 },
        {headers: reqHeader})
      .pipe(map((data) => data));
    }

    // k1k3 : Edita una Enfermedad
    public editQuestion(code, desc) {
      var apiName = `${this.baseUrl}/restapi/api/Diagnostico`;
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });
      return this.httpClient
      .put<any>(
        apiName,
        { codigo: code, descripcion : desc, estado: 1 },
        {headers: reqHeader})
      .pipe(map((data) => data));
    }

    // k1k3 : Elimina un Enfermedad
    public deleteDisease(code) {
      var apiName = `${this.baseUrl}/restapi/api/Enfermedad/${code}`;
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });
      return this.httpClient
      .delete<any>(
        apiName,
        {headers: reqHeader})
      .pipe(map((data) => data));
    }

      // k1k3 : Elimina una pregunta
      public deleteQuestion(code) {
        var apiName = `${this.baseUrl}/restapi/api/Diagnostico/${code}`;
        var token = localStorage.getItem("user_token");
        var reqHeader = new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        });
        return this.httpClient
        .delete<any>(
          apiName,
          {headers: reqHeader})
        .pipe(map((data) => data));
      }

    // k1k3 : Obtiene las Preguntas - CAMBIAR!
    public getQuestions(): Observable<any> {
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
      console.log(reqHeader);
      return this.httpClient
        .get<any>(`${this.baseUrl}/restapi/api/Diagnostico/%20`, {
          headers: reqHeader,
        })
        .pipe(map((data) => {
          data.result = data.result.map(item => {
            item.createdBy = this.mapCreatedBy(item)
            return item
          })

          return data
        }))
    }

    // k1k3 : Crea una pregunta
      public createQuestion(description, codesSymptoms) {
        console.log(description);
        console.log(codesSymptoms);
        var apiName = `${this.baseUrl}/restapi/api/Diagnostico`;
        var token = localStorage.getItem("user_token");
        var reqHeader = new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        });
        return this.httpClient
        .post<any>(
          apiName,
          { codigo: null, descripcion: description, estado: 1,
            sintomas: codesSymptoms},
          {headers: reqHeader})
        .pipe(map((data) => data));
      }


    // k1k3 : Obtiene los datos de la veterinaria
    public getVeterinaryData(): Observable<any> {
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
      console.log(reqHeader);
      return this.httpClient
        .get<any>(`${this.baseUrl}/restapi/api/Veterinaria`, {
          headers: reqHeader,
        })
        .pipe(map((data) => {
          data.result = data.result.map(item => {
            item.createdBy = this.mapCreatedBy(item)
            return item
          })

          return data
        }))
    }

    //k1k3 : Actualiza los datos de la veterinaria
    public putVeterinaryData(name, address, schedule, urlmap, urlinstagram, urlfacebook, idfacebook): Observable<any> {
      var apiName = `${this.baseUrl}/restapi/api/Veterinaria`;
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });
      return this.httpClient
      .put<any>(
        apiName,
        { id: 1,
          nombre: name,
          direccion: address,
          telefono: '979281484',
          urlMaps: urlmap,
          horario: schedule,
          urlInstagram: urlinstagram,
          urlFacebook: urlfacebook,
          idPageFacebook: idfacebook },
        {headers: reqHeader})
      .pipe(map((data) => data));
    }

    // k1k3 : Obtiene las sugerencias
    public getSuggestions(): Observable<any> {
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
      console.log(reqHeader);
      return this.httpClient
        .get<any>(`${this.baseUrl}/restapi/api/Sugerencia/0`, {
          headers: reqHeader,
        })
        .pipe(map((data) => data));
    }

    // k1k3 : Obtiene los comentarios
    public getComments(): Observable<any> {
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
      console.log(reqHeader);
      return this.httpClient
        .get<any>(`${this.baseUrl}/restapi/api/Sugerencia/1`, {
          headers: reqHeader,
        })
        .pipe(map((data) => data));
    }


    // k1k3 : Obtiene las reglas segun sintoma
    public getRules(cod: any): Observable<any> {
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
      console.log(reqHeader);
      return this.httpClient
        .get<any>(`${this.baseUrl}/restapi/api/Regla/${cod}`, {
          headers: reqHeader,
        })
        .pipe(map((data) => {
          data.result = data.result.map(item => {
            item.createdBy = this.mapCreatedBy(item)
            return item
          })

          return data
        }))
    }

    //k1k3 : Popup para agregar sintomas
    public addRulesPopup(message: string) {
      let rulesPopup: MatDialogRef<AddRulesComponent>;
      rulesPopup = this.dialog.open(AddRulesComponent);
      rulesPopup.componentInstance.message = message;
      //this.dialogRef.close()
      return rulesPopup.afterClosed();
    }


    // k1k3 : Elimina un Sintoma
    public deleteRule(codeSymp: any,codeDiag: any) {
      var apiName = `${this.baseUrl}/restapi/api/Regla/${codeSymp}/${codeDiag}`;
      var token = localStorage.getItem("user_token");
      var reqHeader = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });
      return this.httpClient
      .delete<any>(
        apiName,
        {headers: reqHeader})
      .pipe(map((data) => data));
    }


    //k1k3 : Popup para agregar sintomas
    public addSymptomsPopup(message: string) {
    let symptomPopup: MatDialogRef<AddSymptomsComponent>;
    symptomPopup = this.dialog.open(AddSymptomsComponent);
    symptomPopup.componentInstance.message = message;
    //this.dialogRef.close()
    return symptomPopup.afterClosed();
  }

  //k1k3 : Popup para agregar sintomas
  public addDiseasesPopup(message: string) {
    let diseasePopup: MatDialogRef<AddDiseasesComponent>;
    diseasePopup = this.dialog.open(AddDiseasesComponent);
    diseasePopup.componentInstance.message = message;
    //this.dialogRef.close()
    return diseasePopup.afterClosed();
  }

  //k1k3 : Popup para agregar sintomas
  public addQuestionPopup(message: string) {
    let questionPopup: MatDialogRef<AddQuestionComponent>;
    questionPopup = this.dialog.open(AddQuestionComponent);
    questionPopup.componentInstance.message = message;
    //this.dialogRef.close()
    return questionPopup.afterClosed();
  }

  //k1k3 : Popup para agregar sintomas
  public addQuestionsPopup(message: string) {
    let symptomPopup: MatDialogRef<AddQuestionComponent>;
    symptomPopup = this.dialog.open(AddQuestionComponent);
    symptomPopup.componentInstance.message = message;
    //this.dialogRef.close()
    return symptomPopup.afterClosed();
  }

  //k1k3 : Popup para agregar sintomas
  public errorPopup(message: string) {
    let erroPopup: MatDialogRef<ErrorPopupComponent>;
    erroPopup = this.dialog.open(ErrorPopupComponent);
    erroPopup.componentInstance.message = message;
    //this.dialogRef.close()
    return erroPopup.afterClosed();
  }

  public LogOut(){
    this.deleteTokenInLocalStorage();
  }

  // Helpers

  /**
   * Mapea los datos de auditoria del registro
   * 
   * @param element Item
   */
   public mapCreatedBy(element){
    return {
      fechaCre:   element.fechaCre || '',
      usuarioMod: element.usuarioMod || '',
      usuarioCre: element.usuarioCre || ''
    }
  }


}
