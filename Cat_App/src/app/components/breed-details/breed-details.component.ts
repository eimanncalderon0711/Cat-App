import { Component } from '@angular/core';
import { CatService } from '../../services/cat.service.spec';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breed-details',
  imports: [],
  templateUrl: './breed-details.component.html',
  styleUrl: './breed-details.component.scss'
})
export class BreedDetailsComponent {

  //BREED VARIABLE TO STORE THE DETAILS OF THE CAT
  breed: any = {};

  constructor(private catService: CatService, private route: ActivatedRoute) {}

  //INITIALIZE DATA TO GET THE DETAILS OF THE CAT
  ngOnInit() {
    const breedId = this.route.snapshot.paramMap.get('id')!;
    
    //FUNCTION TO GET THE DETAILS OF THE CAT
    this.catService.getBreedDetails(breedId).subscribe((data: any) => {
      this.breed = data[0];
    });
  }

}
