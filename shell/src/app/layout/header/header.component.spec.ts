import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';

describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const authServiceMock = {
    getUser: jest.fn(),
    logout: jest.fn()
  };

  const routerMock = {
    navigate: jest.fn()
  };

  beforeEach(async () => {

    authServiceMock.getUser.mockReturnValue({
      email: 'test@example.com',
      isLoggedIn: true
    });

    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    })
      .overrideComponent(HeaderComponent, {
        set: {
          template: '<div>Header Test</div>'
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user email', () => {
    expect(component.userEmail).toBe('test@example.com');
  });

});