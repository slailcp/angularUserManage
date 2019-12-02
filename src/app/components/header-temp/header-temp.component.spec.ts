import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTempComponent } from './header-temp.component';

describe('HeaderTempComponent', () => {
  let component: HeaderTempComponent;
  let fixture: ComponentFixture<HeaderTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
