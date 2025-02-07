import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CatService } from '../../services/cat.service';
import { BreedsComponent } from './breeds.component';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


describe('BreedsComponent', () => {
  let component: BreedsComponent;
  let fixture: ComponentFixture<BreedsComponent>
  let catService: CatService;


  beforeEach(async () => {
    // Configure the testing module for BreedsComponent
    await TestBed.configureTestingModule({
      imports: [BreedsComponent], // Import the component
      providers: [
        CatService,  // Provide the CatService dependency
        provideHttpClient(), // Provide HTTP client for making API requests
        provideHttpClientTesting(), // Enable HTTP testing utilities
        {
          provide: ActivatedRoute, // Mock the ActivatedRoute to provide route parameters
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'test-id', // Mock a route parameter with a test ID
              },
            },
          },
        },
      ]
    }).compileComponents(); // Compile the test components


    // Create component instance and inject dependencies
    fixture = TestBed.createComponent(BreedsComponent);
    component = fixture.componentInstance;
    catService = TestBed.inject(CatService); // Inject the CatService
    fixture.detectChanges(); // Trigger Angular's change detection
  });


  // Test case: Component should be created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Test case: Component should fetch and store cat breeds from the service
  it('should fetch and store cat breeds', () => {
    // Mock cat breed data
    const mockBreeds: any[] = [
      { id: '1', name: 'Persian', description: 'Fluffy cat', image: { url: 'image1.jpg' } },
      { id: '2', name: 'Siamese', description: 'Elegant cat', image: { url: 'image2.jpg' } },
    ];


    // Spy on the getBreeds method and return mock data
    spyOn(catService, 'getBreeds').and.returnValue(of(mockBreeds));


    // Trigger component initialization
    component.ngOnInit();
    fixture.detectChanges();


    // Verify that the breeds array is populated correctly
    expect(component.breeds.length).toBe(2);
    expect(component.breeds[0].name).toBe('Persian');
    expect(component.breeds[1].image).toBe('image2.jpg');
  });


  // Test case: Component should use fallback image if breed image is missing
  it('should use fallback image when breed image is missing', () => {
    // Mock breed data with a missing image
    const mockBreeds: any[] = [
      { id: '1', name: 'NoImageCat', description: 'No image available', image: null }
    ];


    // Spy on the getBreeds method and return mock data
    spyOn(catService, 'getBreeds').and.returnValue(of(mockBreeds));


    // Trigger component initialization
    component.ngOnInit();
    fixture.detectChanges();


    // Verify that the missing image is replaced with the fallback image
    expect(component.breeds[0].image).toBe(component.catFallBackImg);
  });


  // Test case: Component should handle image load errors and set a fallback image
  it('should handle image error and set fallback image', () => {
    // Create a mock image element
    const imgElement = document.createElement('img');
    const event = new Event('error');
    Object.defineProperty(event, 'target', { value: imgElement });


    // Simulate an image load error
    component.onImageError(event);
   
    // Verify that the fallback image is set
    expect(imgElement.src).toBe(component.catFallBackImg);
  });


  // Test case: addToFav should call postData method from CatService
  it('should call catService.postData when addToFav is called', () => {
    // Spy on postData method and mock response
    spyOn(catService, 'postData').and.returnValue(of({ success: true }));
    spyOn(window, 'alert'); // Spy on the alert function


    // Call addToFav method with a mock ID
    component.addToFav('123');


    // Verify that postData was called with the correct ID
    expect(catService.postData).toHaveBeenCalledWith('123');
   
    // Verify that an alert was displayed with a success message
    expect(window.alert).toHaveBeenCalledWith('Data sent successfully!');
  });
});
