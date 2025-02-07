## Setup
1. Clone the repository.
2. Run `npm install`.
3. Add your Cat API key to `environment.ts`.
4. Run `ng serve` to start the application.

## Features
- Home Page: Displays a random cat image.
- Breeds List: Lists all cat breeds.
- Breed Details: Shows details and images of a specific breed.
- Favorites: Allows users to mark favorites


# Cat App

This is a simple Angular application that provides a collection of cat-related features such as displaying random cat images, listing cat breeds, viewing breed details, and managing favorites.

## Table of Contents
- [Overview](#overview)
- [App Structure](#app-structure)
- [Components](#components)
  - [AppComponent](#app-component)
  - [HomeComponent](#home-component)
  - [FavoritesComponent](#favorites-component)
  - [BreedsComponent](#breeds-component)
  - [BreedDetailsComponent](#breed-details-component)
- [Services](#services)
- [Setup](#setup)
- [Setup API environment](#setup-api-environment)

## Overview

The Cat App allows users to explore different cat breeds, see random cat images, add favorite cats, and view detailed information about specific breeds. This app leverages Angular's modular components and service architecture to ensure a clean, maintainable structure.

## App Structure

The app contains the following core components:

- `AppComponent` - The root component that serves as the main entry point for the application.
- `HomeComponent` - Displays a random cat image on the home page.
- `FavoritesComponent` - Displays the user's list of favorite cats.
- `BreedsComponent` - Lists various cat breeds and allows users to add breeds to their favorites.
- `BreedDetailsComponent` - Displays detailed information about a specific cat breed, such as temperament, life span, and other characteristics.

## Components

### App Component

- **Location**: `app.component.ts`
- **Description**: This is the main component of the application. It provides the root structure for the Angular app. The title is set to 'Cat App', and the component includes routing functionality.
  
  ```typescript
  export class AppComponent {
    title = 'Cat App';  
  }


### Home Component

- **Location**: `home.component.ts`
- **Description**: Displays a random cat image from the API when the component initializes and has function to click to get random cat image.
- **Key Variables**:
  - **catImageUrl** : Stores the URL of the randomly fetched cat image.
  - **catImgSizeWidth and catImgSizeHeight** :  Define the fixed sizes of the image.

  ```typescript
  export class HomeComponent {
  catImageUrl: string = '';
  catImgSizeWidth: number = 500;
  catImgSizeHeight: number = 400;

  constructor(private catService: CatService) {}

  ngOnInit() {
    this.fetchRandomCat();
  }

  fetchRandomCat() {
    this.catService.getRandomCat().subscribe((data: any) => {
      this.catImageUrl = data[0].url;
    });
  }
}


### Favorites Component

- **Location**: `favorites.component.ts`
- **Description**: Allows users to add and view their favorite cats. It fetches favorite cats and displays them with fallback images if needed.

- **Key Variables**:
  - **favorites** : Holds the list of favorite cats.
  - **catFallBackImg**: Fallback image URL in case an image doesn't load.

  ```typescript
  export class FavoritesComponent {
    favorites: Favorites[] = [];
    catFallBackImg: string = 'https://static.vecteezy.com/system/resources/previews/025/245/245/original/cat-clipart-icon-flat-design-on-transparent-background-animal-isolated-clipping-path-element-png.png';
  
    constructor(private catService: CatService) {}
  
    ngOnInit() {
      this.catService.getFavorites().subscribe((data: any) => {
        data.forEach((favorite: any) => {
          const {image_id} = favorite;
          this.catService.getBreedDetails(image_id).subscribe((favDetails: any) => {
            const {id, name, reference_image_id} = favDetails;
            if (!reference_image_id) {
              this.favorites.push({id, name, reference_image_id: null, image_url: null});
            } else {
              this.catService.getBreedDetailImage(reference_image_id).subscribe((image: any) => {
                this.favorites.push({id, name, reference_image_id, image_url: image.url});
              });
            }
          });
        });
      });
    }
  
    onImageError(event: Event): void {
      const imgElement = event.target as HTMLImageElement;
      imgElement.src = this.catFallBackImg;
    }
  }



### Breeds Component

- **Location**: `breeds.component.ts`
- **Description**: Displays a list of cat breeds with their descriptions and images. Users can add breeds to their favorites.
  
- **Key Variables**:
  - **favorites** : Holds the list of all available cat breeds.
  - **catFallBackImg**: Fallback image for when the breed image fails to load.


  ```typescript
  export class FavoritesComponent {
  favorites: Favorites[] = [];
  catFallBackImg: string = 'https://static.vecteezy.com/system/resources/previews/025/245/245/original/cat-clipart-icon-flat-design-on-transparent-background-animal-isolated-clipping-path-element-png.png';

  constructor(private catService: CatService) {}

  ngOnInit() {
    this.catService.getFavorites().subscribe((data: any) => {
      data.forEach((favorite: any) => {
        const {image_id} = favorite;
        this.catService.getBreedDetails(image_id).subscribe((favDetails: any) => {
          const {id, name, reference_image_id} = favDetails;
          if (!reference_image_id) {
            this.favorites.push({id, name, reference_image_id: null, image_url: null});
          } else {
            this.catService.getBreedDetailImage(reference_image_id).subscribe((image: any) => {
              this.favorites.push({id, name, reference_image_id, image_url: image.url});
            });
          }
        });
      });
    });
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.catFallBackImg;
  }
  }



### Breed Details Component

- **Location**: `breed-details.component.ts`
- **Description**: Displays detailed information about a specific cat breed. The component uses route parameters to fetch and display breed details.
  
- **Key Variables**:
  - **breedDetails** : Stores the details of the selected breed.

  ```typescript
  export class BreedDetailsComponent {
  breedDetails: CatDetails = {
    name: '',
    description: '',
    affection_level: 0,
    life_span: 0,
    origin: '',
    temperament: '',
    adaptability: 0,
    image: '',
  };

  constructor(private catService: CatService, private route: ActivatedRoute) {}

  ngOnInit() {
    const breedId = this.route.snapshot.paramMap.get('id')!;
    const catFallBackImg = 'https://static.vecteezy.com/system/resources/previews/025/245/245/original/cat-clipart-icon-flat-design-on-transparent-background-animal-isolated-clipping-path-element-png.png';

    this.catService.getBreedDetails(breedId).subscribe((data: any) => {
      const { reference_image_id } = data;
      if (!reference_image_id) {
        this.breedDetails = { ...data, image: catFallBackImg };
        return;
      }

      this.catService.getBreedDetailImage(reference_image_id).subscribe((data: any) => {
        const { url } = data;
        this.breedDetails = { ...data.breeds[0], image: url };
      });
    });
  }
  }


## Setup API environment

Follow this link treate __(https://www.google.com)__ for your own cat api key

### Create environment file to store you api keys
  - **enviroment.ts**: Create environment.ts file for your app

    ```typescript
    export const environment = {
    //API KEYS AND URL
    catApiKey: '<API-KEY-HERE>',
    catApiUrl: '<API-URL-HERE>'
    };



## Services
Create a folder for services where you can store your logic for API 
 - ***cat.service.ts*** : Responsible for interacting with the external API to fetch cat-related data. It is a service in Angular that provides various methods to retrieve random cat images, breed information, and manage favorite cats.

### Methods:

- **`getRandomCat()`**  
  Fetches a random cat image from the API.
  - **Returns**: An `Observable` containing the cat image data.

- **`getBreeds()`**  
  Retrieves a list of all available cat breeds from the API.
  - **Returns**: An `Observable` containing a list of cat breeds with their details.

- **`getBreedDetails(breedId: string)`**  
  Fetches the details of a specific cat breed by its unique breed ID.
  - **Parameters**: 
    - `breedId`: The ID of the breed to fetch details for.
  - **Returns**: An `Observable` containing breed details such as description, origin, and other attributes.

- **`getBreedDetailImage(breedImgId: string)`**  
  Fetches the image details for a specific cat breed using its image ID.
  - **Parameters**: 
    - `breedImgId`: The image ID associated with the cat breed.
  - **Returns**: An `Observable` containing the image URL.

- **`getFavorites()`**  
  Fetches the list of favorite cats that have been liked by the user.
  - **Returns**: An `Observable` containing a list of the user's favorite cat images.

- **`postData(data: any)`**  
  Adds a cat image to the list of favorites by sending the image ID to the API.
  - **Parameters**: 
    - `data`: The image ID of the cat to be added to favorites.
  - **Returns**: An `Observable` that can be used to check the result of the API request.
 
    
 

  ```typescript
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
        
          getRandomCat() {
            return this.http.get(`${environment.catApiUrl}/images/search`, { headers: this.headers });
          }
        
          getBreeds() {
            return this.http.get(`${environment.catApiUrl}/breeds`, { headers: this.headers });
          }
        
          getBreedDetails(breedId: string) {
            return this.http.get(`${environment.catApiUrl}/breeds/${breedId}`, { headers: this.headers });
          }
        
          getBreedDetailImage(breedImgId: string) {
            return this.http.get(`${environment.catApiUrl}/images/${breedImgId}`, { headers: this.headers });
          }
        
          getFavorites(){
            return this.http.get(`${environment.catApiUrl}/favourites`, { headers: this.headers });
          }
        
          postData(data: any): Observable<any> {
            return this.http.post(`${environment.catApiUrl}/favourites`, { "image_id": data }, { headers: this.headers });
          }
        }

