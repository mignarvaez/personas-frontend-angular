import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  //La conexión al backend
  private API_SERVER = "http://localhost:8080/estados/";

  constructor(
    //El cliente http de angular para realizar la petición al backend
    private httpClient: HttpClient
  ) { }

  //Metodo que obtiene los estados según la id del pais dada por parámetro
  //Para gestionar la asincronia y actualización constante se usa un observable
  public getAllEstadosByPais(idPais: string): Observable<any>{
    return this.httpClient.get(this.API_SERVER+idPais);
  }
}
