import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchrestaurantbyitemComponent } from './searchrestaurantbyitem.component';

describe('SearchrestaurantbyitemComponent', () => {
  let component: SearchrestaurantbyitemComponent;
  let fixture: ComponentFixture<SearchrestaurantbyitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchrestaurantbyitemComponent]
    });
    fixture = TestBed.createComponent(SearchrestaurantbyitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
