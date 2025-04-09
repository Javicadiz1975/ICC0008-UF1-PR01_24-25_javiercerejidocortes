import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'https://api.balldontlie.io/v1/players';
  private headers = new HttpHeaders({
    Authorization: 'fe46fc70-5205-4f74-a14f-494547d301c2'
  });

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl, { headers: this.headers }).pipe(
      map(response => response.data) // devolvemos solo el array de jugadores
    );
  }

  getPlayerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers }).pipe(
      map(response => response.data) // Extrae solo el objeto `data`
    );
  }
}
