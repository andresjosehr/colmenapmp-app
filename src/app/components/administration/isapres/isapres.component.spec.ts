import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsapresComponent } from './isapres.component';

describe('IsapresComponent', () => {
  let component: IsapresComponent;
  let fixture: ComponentFixture<IsapresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsapresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsapresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
