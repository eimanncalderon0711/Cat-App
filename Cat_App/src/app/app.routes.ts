import {Routes} from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { BreedsComponent } from './components/breeds/breeds.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { BreedDetailsComponent } from './components/breed-details/breed-details.component';


export const routes = [
    //HOME PAGE THE INITIAL ROUTE
    { path: '', component: HomeComponent },
    //BREED PAGE
    { path: 'breeds', component: BreedsComponent },
    //FAVORITES PAGE
    { path: 'favorites', component: FavoritesComponent },
    //CAT DETAILS PAGE
    { path: 'breeds/:id', component: BreedDetailsComponent },
    //REDIRECT TO INITAL PAGE IF THE PAGE NOT EXISTS
    { path: '**', redirectTo: '' }
  ];
