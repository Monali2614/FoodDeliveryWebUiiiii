import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRestaurantsComponent } from './view-restaurants.component';

describe('ViewRestaurantsComponent', () => {
  let component: ViewRestaurantsComponent;
  let fixture: ComponentFixture<ViewRestaurantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRestaurantsComponent]
    });
    fixture = TestBed.createComponent(ViewRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
