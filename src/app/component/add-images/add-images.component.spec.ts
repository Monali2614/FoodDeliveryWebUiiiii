import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImagesComponent } from './add-images.component';

describe('AddImagesComponent', () => {
  let component: AddImagesComponent;
  let fixture: ComponentFixture<AddImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddImagesComponent]
    });
    fixture = TestBed.createComponent(AddImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
