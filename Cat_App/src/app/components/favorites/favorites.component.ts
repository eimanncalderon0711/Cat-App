import { Component } from '@angular/core';
import { CatService } from '../../services/cat.service.spec';

//CREATE FAVORITES INTERFACE TO ADD TYPES OF ATTRIBUTES
export interface Favorites{
  id: string;
  name: string;
  reference_image_id: string | null;
  image_url: string | null;
}

@Component({
  selector: 'app-favorites',
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

  //DECLARATION OF FAVORITES VARIABLE FOR STORING FAVORITE DATA
  favorites: Favorites[] = [];

  //FALLBACK IMAGE URL TO DISPLAY IMAGE IF THE IMAGE IS NOT RENDERING OR ERROR
  catFallBackImg: string = 'https://static.vecteezy.com/system/resources/previews/025/245/245/original/cat-clipart-icon-flat-design-on-transparent-background-animal-isolated-clipping-path-element-png.png'


  constructor(private catService: CatService) {}

  //ON INITIALIZATION
  ngOnInit() {

    //CALL GET FAVORITES FUNCTION TO GET LIST OF IMAGE
    this.catService.getFavorites().subscribe((data: any) =>{
      
      data.forEach((favorite:any) => {

        //DESTRUCTURE METHOD TO GET THE IMAGE ID IN FAVORITE
        const {image_id} = favorite;

        //PASS THE IMAGE ID AS PARAMETER OR ARGUMENT TO GET BREED DETAILS
        this.catService.getBreedDetails(image_id).subscribe((favDetails: any) => {

          //DESTRUCTURE METHOD TO GET THE ID, NAME, REFERENCE_IMAGE_ID
          const {id, name, reference_image_id} = favDetails;
          
          //IF NO REFERENCE_IMAGE_ID RETURN AND PUSH THE ID, NAME AND SET NULL THE REFERENCE_IMAGE_ID AND IMAGE_URL IN FAVORITES
          if(!reference_image_id){
            return this.favorites.push({id, name, reference_image_id: null, image_url: null})
          }

          //ELSE PUSH THE ID, NAME, REFERENCE_IMAGE_ID AND IMAGE_URL
          return this.catService.getBreedDetailImage(reference_image_id).subscribe((image: any) => {
           
            this.favorites.push({id, name, reference_image_id, image_url: image.url});
         
          });
        })
      });
    })
  }


  //IF THERE ARE ERROR IN RENDERING IMAGE IT WILL TRIGGER THIS FUNCTION TO DISPLAY A TEMPORARY IMAGE
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.catFallBackImg;
  }


}
