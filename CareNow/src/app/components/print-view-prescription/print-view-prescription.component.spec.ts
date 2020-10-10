import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintViewPrescriptionComponent } from './print-view-prescription.component';

describe('PrintViewPrescriptionComponent', () => {
  let component: PrintViewPrescriptionComponent;
  let fixture: ComponentFixture<PrintViewPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintViewPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintViewPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

