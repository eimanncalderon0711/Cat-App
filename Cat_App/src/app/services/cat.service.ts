import { environment } from '../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root' // THIS MAKES THE SERVICE AVAILABLE THROUGHOUT THE APPLICATION
})
export class CatService {
  // DEFINE HTTP HEADERS WITH AN API KEY FOR AUTHENTICATION
  private headers = new HttpHeaders({
    'x-api-key': environment.catApiKey // RETRIEVE THE API KEY FROM THE ENVIRONMENT FILE
  });


  // INJECT HTTPCLIENT TO PERFORM HTTP REQUESTS
  constructor(private http: HttpClient) {}


  // FUNCTION TO GET A RANDOM CAT IMAGE
  getRandomCat() {
    return this.http.get(`${environment.catApiUrl}/images/search`, { headers: this.headers });
  }


  // FUNCTION TO GET A LIST OF CAT BREEDS
  getBreeds() {
    return this.http.get(`${environment.catApiUrl}/breeds`, { headers: this.headers });
  }


  // FUNCTION TO GET DETAILS OF A SINGLE CAT BREED BY ITS ID
  getBreedDetails(breedId: string) {
    return this.http.get(`${environment.catApiUrl}/breeds/${breedId}`, { headers: this.headers });
  }


  // FUNCTION TO GET THE IMAGE DETAILS OF A SPECIFIC CAT BREED
  getBreedDetailImage(breedImgId: string) {
    return this.http.get(`${environment.catApiUrl}/images/${breedImgId}`, { headers: this.headers });
  }


  // FUNCTION TO FETCH FAVORITE CATS (LIKED BY THE USER)
  getFavorites(){
    return this.http.get(`${environment.catApiUrl}/favourites`, { headers: this.headers });
  }


  // FUNCTION TO ADD A CAT IMAGE TO FAVORITES
  postData(data: any): Observable<any> {
    return this.http.post(`${environment.catApiUrl}/favourites`, { "image_id": data }, { headers: this.headers });
  }
}

