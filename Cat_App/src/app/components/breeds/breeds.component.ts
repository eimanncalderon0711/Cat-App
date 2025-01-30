import { Component } from '@angular/core';
import { CatService } from '../../services/cat.service.spec';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-breeds',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './breeds.component.html',
  styleUrl: './breeds.component.scss'
})
export class BreedsComponent {

  //VARIABLE TO STORE THE LIST OF BREED OF CATS
  breeds: any[] = [];

  constructor(private catService: CatService) {}

  ngOnInit() {
    //ON INITIALIZATION TO RENDER LIST OF DATA
    this.catService.getBreeds().subscribe((data: any) => {
      this.breeds = data;
    });
  }
}
