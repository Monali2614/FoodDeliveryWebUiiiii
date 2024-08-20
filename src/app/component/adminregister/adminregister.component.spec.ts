import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminregisterComponent } from './adminregister.component';

describe('AdminregisterComponent', () => {
  let component: AdminregisterComponent;
  let fixture: ComponentFixture<AdminregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminregisterComponent]
    });
    fixture = TestBed.createComponent(AdminregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
