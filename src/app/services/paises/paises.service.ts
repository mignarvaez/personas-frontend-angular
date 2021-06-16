//Clase que se encarga de conectarse al backend para traer la información de los paises
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  //La conexión al backend
  private API_SERVER = "http://localhost:8080/paises/";

  constructor(
    //El cliente http de angular para realizar la petición al backend
    private httpClient: HttpClient
  ) { }
  
  //Método que retorna los paises de la aplicación
  //Para gestionar la asincronia y actualización constante se usa un observable
  public getAllPaises(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }
}
