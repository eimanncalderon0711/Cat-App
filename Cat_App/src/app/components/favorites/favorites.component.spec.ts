import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { CatService } from '../../services/cat.service';
import { of } from 'rxjs'; // Import 'of' to create observable test values
import { By } from '@angular/platform-browser'; // Used for querying DOM elements in tests
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('FavoritesComponent', () => {
  let component: FavoritesComponent; // Component instance
  let fixture: ComponentFixture<FavoritesComponent>; // Test fixture
  let catServiceSpy: jasmine.SpyObj<CatService>; // Spy object for mocking CatService


  beforeEach(async () => {
    // Create a spy object for CatService with specific methods
    const spy = jasmine.createSpyObj('CatService', [
      'getFavorites',
      'getBreedDetails',
      'getBreedDetailImage',
    ]);


    await TestBed.configureTestingModule({
      imports: [FavoritesComponent], // Import the component being tested
      providers: [
        provideHttpClient(), // Provide HttpClient for API calls
        provideHttpClientTesting(), // Provide HttpClientTestingModule for mock API calls
        { provide: CatService, useValue: spy }, // Use the spy instead of the actual service
      ],
    }).compileComponents(); // Compile the components


    fixture = TestBed.createComponent(FavoritesComponent); // Create component fixture
    component = fixture.componentInstance; // Assign the component instance
    catServiceSpy = TestBed.inject(CatService) as jasmine.SpyObj<CatService>; // Inject the spy service
  });


  it('should create the component', () => {
    // Test if the component initializes correctly
    expect(component).toBeTruthy();
  });


  it('should fetch favorite cats and update favorites list', () => {
    // Mock data for testing the favorites list
    const mockFavorites = [{ image_id: 'img1' }, { image_id: 'img2' }];
    const mockBreedDetails = [
      { id: '1', name: 'Cat 1', reference_image_id: 'ref1' },
      { id: '2', name: 'Cat 2', reference_image_id: 'ref2' },
    ];
    const mockImages = [{ url: 'image1.jpg' }, { url: 'image2.jpg' }];


    // Set up the spy to return mock values
    catServiceSpy.getFavorites.and.returnValue(of(mockFavorites));
    catServiceSpy.getBreedDetails.and.returnValues(of(mockBreedDetails[0]), of(mockBreedDetails[1]));
    catServiceSpy.getBreedDetailImage.and.returnValues(of(mockImages[0]), of(mockImages[1]));


    fixture.detectChanges(); // Trigger ngOnInit and data binding


    // Assertions to verify that the service calls were made correctly
    expect(catServiceSpy.getFavorites.calls.count()).toBe(1); // Check getFavorites was called once
    expect(catServiceSpy.getBreedDetails.calls.count()).toBe(2); // Check getBreedDetails was called twice
    expect(catServiceSpy.getBreedDetailImage.calls.count()).toBe(2); // Check getBreedDetailImage was called twice


    // Verify component data updates
    expect(component.favorites.length).toBe(2); // Check the favorites list has 2 items
    expect(component.favorites[0].image_url).toBe('image1.jpg'); // Check the first cat image URL
  });


  it('should use fallback image when reference_image_id is missing', () => {
    // Mock data where breed details lack reference_image_id
    const mockFavorites = [{ image_id: 'img1' }];
    const mockBreedDetails = [{ id: '1', name: 'Cat 1', reference_image_id: null }];


    // Set up the spy to return mock values
    catServiceSpy.getFavorites.and.returnValue(of(mockFavorites));
    catServiceSpy.getBreedDetails.and.returnValue(of(mockBreedDetails[0]));


    fixture.detectChanges(); // Trigger ngOnInit


    // Verify that one favorite cat is loaded
    expect(component.favorites.length).toBe(1);
    expect(component.favorites[0].image_url).toBeNull(); // Image URL should be null since reference_image_id is missing


    // Simulate image load error to test fallback behavior
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    imgElement.dispatchEvent(new Event('error')); // Trigger an image load error event


    // Check if the image src is replaced with the fallback image
    expect(imgElement.src).toContain(component.catFallBackImg);
  });
});
