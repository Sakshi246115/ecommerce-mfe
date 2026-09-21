import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RevampFallbackService } from '../services/revamp-fallback.service';

import { of } from 'rxjs';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const revampFallbackServiceMock = {
    getHomeContent: jest.fn()
  };

  beforeEach(async () => {

    revampFallbackServiceMock.getHomeContent.mockReturnValue(
      of({
        badge: 'Welcome to My Ecommerce',
        title: 'Everything You Need,',
        heading: 'Everything You Need,',
        headingHighlight: 'All in One Place.',
        description:
          'Discover quality products at amazing prices.'
      })
    );

    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      providers: [
        {
          provide: RevampFallbackService,
          useValue: revampFallbackServiceMock
        }
      ]
    })
      .overrideComponent(HomeComponent, {
        set: {
          template: '<div>Home Test</div>'
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});