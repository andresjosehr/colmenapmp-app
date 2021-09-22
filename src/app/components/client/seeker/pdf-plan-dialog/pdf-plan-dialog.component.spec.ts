import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPlanDialogComponent } from './pdf-plan-dialog.component';

describe('PdfPlanDialogComponent', () => {
  let component: PdfPlanDialogComponent;
  let fixture: ComponentFixture<PdfPlanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfPlanDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfPlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
