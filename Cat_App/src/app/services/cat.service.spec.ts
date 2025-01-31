import { TestBed } from '@angular/core/testing';

import { environment } from '../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.get(`${environment.catApiUrl}/breeds/${breedId}`, { headers: this.headers });
  }

  getBreedDetailImage(breedImgId: string) {
    return this.http.get(`${environment.catApiUrl}/images/${breedImgId}`, {headers: this.headers });
  }

  getFavorites(){
    return this.http.get(`${environment.catApiUrl}/favourites`, {headers: this.headers})
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${environment.catApiUrl}/favourites`, {"image_id" : data}, {headers: this.headers});
  }

}
