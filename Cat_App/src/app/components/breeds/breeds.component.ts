import { Component } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { RouterLink, RouterOutlet } from '@angular/router';

//CREATE INTERFACE TO PROVIDE TYPES TO BREEDS ATTRIBUTES
export interface Breed{
  id: string;
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-breeds',
  imports: [RouterLink],
  templateUrl: './breeds.component.html',
  styleUrl: './breeds.component.scss'
})


export class BreedsComponent {

  catImg: string = '2';
  //FALLBACK IMAGE URL TO DISPLAY IMAGE IF THE IMAGE IS NOT RENDERING OR ERROR
  catFallBackImg: string = 'https://static.vecteezy.com/system/resources/previews/025/245/245/original/cat-clipart-icon-flat-design-on-transparent-background-animal-isolated-clipping-path-element-png.png'

  //VARIABLE TO STORE THE LIST OF BREED OF CATS
  breeds: Breed[] = [];

  constructor(private catService: CatService) {}
  

  ngOnInit() {
    //ON INITIALIZATION TO RENDER LIST OF DATA
    this.catService.getBreeds().subscribe((data: any) => {
      // this.breeds = data;
      data.forEach((cat: any) => {
        const {id, name, description, image} = cat;
        
        //IF IMAGE IS FOUND THEN GET THE URL AND PUSH IT TO BREEDS ARRAY OR ELSE SET THE IMAGE WITH FALLBACK IMAGE AS TEMPORARY IMAGE IF NOT EXIST
        if(image){
          const {url} = image;
          this.breeds.push({id, name, description, image:url})
        }else{
          this.breeds.push({id, name, description, image: this.catFallBackImg})
        }
      })
    });
  }

  //FALLBACK IMAGE IF THERE IS ERROR IN RENDERING IMAGES
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.catFallBackImg;
  }


  //FUNCTION TO ADD IN FAVORITES PAGE
  addToFav(catId: string): void {
    this.catService.postData(catId).subscribe({
      next: (res) => {
        //TEMPORARY ALERT THE USER IF THE DATA IS SUCCESSFULY ADDED TO THE FAVORITES
        alert('Data sent successfully!');
      },
      error: (err) => console.log(err),
    })
  }
}
