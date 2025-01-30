import { TestBed } from '@angular/core/testing';

import { environment } from '../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CatService {
  private headers = new HttpHeaders({
    'x-api-key': environment.catApiKey
  });

  constructor(private http: HttpClient) {}
  //FUNCTION TO GET RANDOM CAT
  getRandomCat() {
    return this.http.get(`${environment.catApiUrl}/images/search`, { headers: this.headers }); 
  }
  //FUNCTION TO GET LIST OF BREED OF CATS
  getBreeds() {
    return this.http.get(`${environment.catApiUrl}/breeds`, { headers: this.headers });
  }

  //FUNCTION TO GET THE DETAILS OF A SINGLE CAT
  getBreedDetails(breedId: string) {
    return this.http.get(`${environment.catApiUrl}/breeds/search?q=${breedId}`, { headers: this.headers });
  }


}
