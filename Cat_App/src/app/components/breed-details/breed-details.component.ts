import { Component } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { ActivatedRoute } from '@angular/router';


//INTERFACE TO PROVIDE TYPES FOR CLASS
interface CatDetails{
  name: string;
  description: string;
  affection_level: number;
  life_span: number;
  origin: string;
  temperament: string;
  adaptability: number;
  image: string;
}


@Component({
  selector: 'app-breed-details',
  imports: [],
  templateUrl: './breed-details.component.html',
  styleUrl: './breed-details.component.scss'
})
export class BreedDetailsComponent {


  //BREED VARIABLE TO STORE THE DETAILS OF THE CAT
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
  
  
  //INITIALIZE DATA TO GET THE DETAILS OF THE CAT
  ngOnInit() {
    const breedId = this.route.snapshot.paramMap.get('id')!;
    const catFallBackImg: string = 'https://static.vecteezy.com/system/resources/previews/025/245/245/original/cat-clipart-icon-flat-design-on-transparent-background-animal-isolated-clipping-path-element-png.png'


    //FUNCTION TO GET THE DETAILS OF THE CAT
    this.catService.getBreedDetails(breedId).subscribe((data: any) => {
      //GET THE REFERENCE IMAGE URL
      const {reference_image_id} = data;

      if(!reference_image_id) {
        const {adaptability, affection_level, description, life_span, name, origin, temperament } = data;
        return this.breedDetails = {
          adaptability, 
          affection_level, 
          description, 
          life_span, 
          name, 
          origin, 
          temperament,
          image: catFallBackImg
        }
        
      }
      
      //PASS THE REFERENCE IMAGE ID AS PARAMETER TO GET THE URL IMAGE OF CAT
      return this.catService.getBreedDetailImage(reference_image_id).subscribe((data: any) => {
        //DESTRUCTURING TO GET THE URL IMAGE OF THE CAT
        const {url} = data;

        //DESTRUCTURING TO GET THE DETAILS OF THE CAT
        const {adaptability, affection_level, description, life_span, name, origin, temperament} = data.breeds[0]

        //SET THE BREED DETAILS VALUE
        this.breedDetails = {
          name,
          description,
          affection_level,
          life_span,
          origin,
          temperament,
          adaptability,
          image: url
        };
      })
    });
  }

}
