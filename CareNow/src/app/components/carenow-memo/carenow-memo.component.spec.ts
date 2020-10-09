import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarenowMemoComponent } from './carenow-memo.component';

describe('CarenowMemoComponent', () => {
  let component: CarenowMemoComponent;
  let fixture: ComponentFixture<CarenowMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarenowMemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarenowMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
