import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiyOtpResetComponent } from './verifiy-otp-reset.component';

describe('VerifiyOtpResetComponent', () => {
  let component: VerifiyOtpResetComponent;
  let fixture: ComponentFixture<VerifiyOtpResetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifiyOtpResetComponent]
    });
    fixture = TestBed.createComponent(VerifiyOtpResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
