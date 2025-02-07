import { ComponentFixture, TestBed } from '@angular/core/testing';


import { HomeComponent } from './home.component';
import { CatService } from '../../services/cat.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('HomeComponent', () => {
  let component: HomeComponent; // Declare a variable to hold the component instance
  let fixture: ComponentFixture<HomeComponent>; // Declare a fixture to hold the component's testing environment


  beforeEach(async () => {
    // Asynchronous function to configure the testing module before each test
    await TestBed.configureTestingModule({
      imports: [HomeComponent], // Import the component that will be tested
      providers: [
        CatService, // Provide the service dependency required by the component
        provideHttpClient(), // Provide HTTP client for API calls
        provideHttpClientTesting() // Provide an HTTP testing module for mocking API calls
      ]
    }).compileComponents(); // Compile the components and their templates


    // Create a fixture of the HomeComponent
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance; // Get the instance of HomeComponent
    fixture.detectChanges(); // Trigger Angular’s change detection to apply data bindings
  });


  it('should create', () => {
    // Basic test case to check if the component is created successfully
    expect(component).toBeTruthy();
  });
});
