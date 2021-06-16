import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  //La conexión al backend
  private API_SERVER = "http://localhost:8080/personas/";

  constructor(
    //El cliente http de angular para realizar la petición al backend
    private httpClient: HttpClient
  ) { }

  //Método encargado de retornar todas las personas de la aplicación
  //Para gestionar la asincronia y actualización constante se usa un observable
  public getAllPersonas(): Observable<any> {
    return this.httpClient.get(this.API_SERVER);
  }

  //Método encargado de guardar una persona que llega por parametro
  public savePersona(persona: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER, persona);
  }

  //Método encargado de eliminar una persona que llega por parametro
  public deletePersona(id: any): Observable<any> {
    return this.httpClient.delete(this.API_SERVER + "delete/" + id);
  }

}
