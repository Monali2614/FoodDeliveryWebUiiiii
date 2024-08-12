import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for services
import { MenuComponent } from './add-menu.component';
import { MenuService } from 'src/app/services/menu.service'; // Import MenuService

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports: [
        CommonModule, // Include CommonModule in the imports
        FormsModule,  // Include FormsModule for ngModel
        HttpClientModule // Include HttpClientModule if you use HttpClient in services
      ],
      providers: [
        { provide: MenuService, useValue: { addMenu: () => ({ subscribe: () => {} }) } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
