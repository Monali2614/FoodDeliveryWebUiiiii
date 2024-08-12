import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AddRestaurantComponent } from './add-restaurant.component';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { Restaurant } from '../../models/restaurant';

describe('AddRestaurantComponent', () => {
  let component: AddRestaurantComponent;
  let fixture: ComponentFixture<AddRestaurantComponent>;
  let restaurantService: RestaurantService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRestaurantComponent ],
      imports: [ FormsModule, HttpClientModule ],
      providers: [
        {
          provide: RestaurantService,
          useValue: {
            addRestaurant: jasmine.createSpy('addRestaurant')
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRestaurantComponent);
    component = fixture.componentInstance;
    restaurantService = TestBed.inject(RestaurantService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties with default values', () => {
    expect(component.restaurantName).toBe('');
    expect(component.restaurantAddress).toBe('');
    expect(component.rating).toBe(0);
    expect(component.cuisines).toBe('');
  });

  it('should call addRestaurant and handle successful response', () => {
    const mockResponse: Restaurant = {
      restaurantId: 1,
      restaurantName: 'Test Restaurant',
      restaurantAddress: 'Test Address',
      rating: 4.5,
      cuisines: ['Cuisine1', 'Cuisine2'],
      menus: []
    };

    (restaurantService.addRestaurant as jasmine.Spy).and.returnValue(of(mockResponse));

    spyOn(console, 'log');

    component.restaurantName = 'Test Restaurant';
    component.restaurantAddress = 'Test Address';
    component.rating = 4.5;
    component.cuisines = 'Cuisine1, Cuisine2';

    component.addRestaurant();

    expect(restaurantService.addRestaurant).toHaveBeenCalledWith({
      restaurantId: 0,
      restaurantName: 'Test Restaurant',
      restaurantAddress: 'Test Address',
      rating: 4.5,
      cuisines: ['Cuisine1', 'Cuisine2'],
      menus: []
    });
    expect(console.log).toHaveBeenCalledWith('Restaurant added successfully', mockResponse);
  });

  it('should handle addRestaurant error', () => {
    (restaurantService.addRestaurant as jasmine.Spy).and.returnValue(throwError('Error'));
    spyOn(console, 'error');

    component.addRestaurant();

    expect(console.error).toHaveBeenCalledWith('Error adding restaurant', 'Error');
  });

  it('should split cuisines correctly', () => {
    component.cuisines = 'Cuisine1, Cuisine2, Cuisine3';
    const result = component.cuisines.split(',').map(cuisine => cuisine.trim());
    expect(result).toEqual(['Cuisine1', 'Cuisine2', 'Cuisine3']);
  });
});
