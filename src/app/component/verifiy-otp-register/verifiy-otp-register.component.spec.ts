import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiyOtpRegisterComponent } from './verifiy-otp-register.component';

describe('VerifiyOtpRegisterComponent', () => {
  let component: VerifiyOtpRegisterComponent;
  let fixture: ComponentFixture<VerifiyOtpRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifiyOtpRegisterComponent]
    });
    fixture = TestBed.createComponent(VerifiyOtpRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
