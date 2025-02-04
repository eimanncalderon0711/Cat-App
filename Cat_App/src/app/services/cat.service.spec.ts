import { TestBed } from '@angular/core/testing';
import { CatService } from './cat.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environment';
import { provideHttpClient } from '@angular/common/http';


describe('CatService', () => {
  let service: CatService;
  let httpMock: HttpTestingController;


  //SETUP TEST ENVIRONMENT
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],  // NO NEED TO IMPORT HTTP CLIENT TESTINGMODULE SINCE WE'RE USING PROVIDEHTTPCLIENTTESTING()
      providers: [
        CatService,             // PROVIDE THE SERVICE BEING TESTED
        provideHttpClient(),    // PROVIDE HTTPCLIENT FOR DEPENDENCY INJECTION
        provideHttpClientTesting() // PROVIDE HTTPTESTINGCONTROLLER FOR MOCKING HTTP REQUESTS
      ],
    });


    // INJECT THE SERVICE AND MOCK HTTP CONTROLLER
    service = TestBed.inject(CatService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  // ENSURE THAT NO PENDING HTTP REQUESTS ARE LEFT AFTER EACH TEST
  afterEach(() => {
    httpMock.verify();
  });


  // TEST IF THE SERVICE IS SUCCESSFULLY CREATED
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // TEST GET REQUEST FOR FETCHING A RANDOM CAT IMAGE
  it('should fetch a random cat', () => {
    const mockCatData = [{ id: 'abc123', url: 'https://example.com/cat.jpg' }];


    service.getRandomCat().subscribe((data) => {
      expect(data).toEqual(mockCatData);
    });


    // EXPECT A SINGLE GET REQUEST TO THE CORRECT URL
    const req = httpMock.expectOne(`${environment.catApiUrl}/images/search`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCatData); // Provide mock response data
  });


  // TEST GET REQUEST FOR FETCHING THE LIST OF CAT BREEDS
  it('should fetch list of cat breeds', () => {
    const mockBreeds = [
      { id: 'beng', name: 'Bengal' },
      { id: 'siam', name: 'Siamese' }
    ];


    service.getBreeds().subscribe((data) => {
      expect(data).toEqual(mockBreeds);
    });


    const req = httpMock.expectOne(`${environment.catApiUrl}/breeds`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBreeds);
  });


  // TEST GET REQUEST FOR FETCHING BREED DETAILS
  it('should fetch breed details', () => {
    const breedId = 'beng';
    const mockBreedDetail = { id: 'beng', name: 'Bengal', description: 'A wild-looking cat' };


    service.getBreedDetails(breedId).subscribe((data) => {
      expect(data).toEqual(mockBreedDetail);
    });


    const req = httpMock.expectOne(`${environment.catApiUrl}/breeds/${breedId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBreedDetail);
  });


  // TEST GET REQUEST FOR FETCHING BREED IMAGE DETAILS
  it('should fetch breed detail image', () => {
    const breedImgId = 'img123';
    const mockImage = { id: 'img123', url: 'https://example.com/breed.jpg' };


    service.getBreedDetailImage(breedImgId).subscribe((data) => {
      expect(data).toEqual(mockImage);
    });


    const req = httpMock.expectOne(`${environment.catApiUrl}/images/${breedImgId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockImage);
  });


  // TEST GET REQUEST FOR FETCHING FAVORITE CATS
  it('should fetch favorite cats', () => {
    const mockFavorites = [{ id: 1, image_id: 'img123' }];


    service.getFavorites().subscribe((data) => {
      expect(data).toEqual(mockFavorites);
    });


    const req = httpMock.expectOne(`${environment.catApiUrl}/favourites`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFavorites);
  });


  // TEST POST REQUEST FOR ADDING A CAT TO FAVORITES
  it('should post favorite cat', () => {
    const mockData = 'img123';
    const mockResponse = { message: 'Successfully added to favorites' };


    service.postData(mockData).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });


    const req = httpMock.expectOne(`${environment.catApiUrl}/favourites`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ image_id: mockData });
    req.flush(mockResponse);
  });


});
