import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CharactersInterface} from "../interfaces/CharactersInterface";
import {StarshipsInterface} from "../interfaces/StarshipsInterface";

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  constructor(private http: HttpClient) {}

  getCharacters(): Observable<CharactersInterface> {
    return this.http.get<CharactersInterface>('https://swapi.dev/api/people');
  }

  getStarships(): Observable<StarshipsInterface> {
    return this.http.get<StarshipsInterface>('https://swapi.dev/api/starships');
  }
}
