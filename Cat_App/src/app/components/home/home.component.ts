import { Component } from '@angular/core';
import { CatService } from '../../services/cat.service.spec';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //VARIABLE TO STORE THE IMAGE URL
  catImageUrl: string = '';
  //VARIABLE TO STORE THE FIXED SIZES OF THE IMAGE TO ENSURE EQUAL SIZES OF PICTURES
  catImgSizeWidth: number = 500;
  catImgSizeHeight: number = 400;

  constructor(private catService: CatService) {}

  //ON INITIALIZATION FETCH OF RANDOM DATA AND RENDER THE IMAGE
  ngOnInit() {
    this.fetchRandomCat();
  }
  //FUNCTION TO FETCH A RANDOM CAT
  fetchRandomCat() {
    this.catService.getRandomCat().subscribe((data: any) => {
      this.catImageUrl = data[0].url;
    });
  }

}
