import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedDetailsComponent } from './breed-details.component';
import { CatService } from '../../services/cat.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';


describe('BreedDetailsComponent', () => {
  let component: BreedDetailsComponent;
  let fixture: ComponentFixture<BreedDetailsComponent>;
  let catService: jasmine.SpyObj<CatService>;
  let activatedRoute: ActivatedRoute;


  beforeEach(async () => {
    // Create a spy object for CatService to mock its methods
    const catServiceSpy = jasmine.createSpyObj('CatService', ['getBreedDetails', 'getBreedDetailImage']);


    // Configure the testing module
    await TestBed.configureTestingModule({
      imports: [BreedDetailsComponent],
      providers: [
        provideHttpClient(), // Provide the HTTP client service
        provideHttpClientTesting(), // Provide HTTP testing utilities
        { provide: CatService, useValue: catServiceSpy }, // Use the mock CatService
        {
          provide: ActivatedRoute, // Mock route parameters
          useValue: { snapshot: { paramMap: { get: () => 'beng' } } }, // Set 'beng' as the breed ID
        },
      ],
    }).compileComponents();


    // Inject services
    catService = TestBed.inject(CatService) as jasmine.SpyObj<CatService>;
    activatedRoute = TestBed.inject(ActivatedRoute);


    // Create the component instance
    fixture = TestBed.createComponent(BreedDetailsComponent);
    component = fixture.componentInstance;
  });


  // Test case to check if the component is created successfully
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  // Test case to check if breed details are fetched and updated correctly
  it('should fetch breed details and update breedDetails correctly', () => {
    // Mock data for breed details
    const breedMockData = {
      name: 'Bengal',
      description: 'Active and playful',
      affection_level: 5,
      life_span: '12-15',
      origin: 'USA',
      temperament: 'Energetic, Intelligent',
      adaptability: 4,
      reference_image_id: 'some-img-id',
    };


    // Mock data for breed image
    const imageMockData = { url: 'https://example.com/cat.jpg', breeds: [breedMockData] };


    // Mock the API responses using spies
    catService.getBreedDetails.and.returnValue(of(breedMockData));
    catService.getBreedDetailImage.and.returnValue(of(imageMockData));


    // Call ngOnInit to trigger data fetching
    component.ngOnInit();
    fixture.detectChanges();


    // Verify that the API methods were called with correct parameters
    expect(catService.getBreedDetails).toHaveBeenCalledWith('beng');
    expect(catService.getBreedDetailImage).toHaveBeenCalledWith('some-img-id');


    // Check if the breed details and image are correctly assigned
    expect(component.breedDetails.name).toBe('Bengal');
    expect(component.breedDetails.image).toBe('https://example.com/cat.jpg');
  });


  // Test case to check if fallback image is used when no reference_image_id is provided
  it('should use fallback image when no reference_image_id is provided', () => {
    // Mock breed details without reference_image_id
    const breedMockData = {
      name: 'Bengal',
      description: 'Active and playful',
      affection_level: 5,
      life_span: '12-15',
      origin: 'USA',
      temperament: 'Energetic, Intelligent',
      adaptability: 4,
      reference_image_id: null, // No image ID provided
    };


    // Mock API response with no image ID
    catService.getBreedDetails.and.returnValue(of(breedMockData));


    // Call ngOnInit to trigger data fetching
    component.ngOnInit();
    fixture.detectChanges();


    // Verify that the fallback image is used when no image ID is available
    expect(component.breedDetails.image).toBe(
      'https://static.vecteezy.com/system/resources/previews/025/245/245/original/cat-clipart-icon-flat-design-on-transparent-background-animal-isolated-clipping-path-element-png.png'
    );
  });
});
