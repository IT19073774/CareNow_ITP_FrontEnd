import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MPComponent } from './mp.component';

describe('MPComponent', () => {
  let component: MPComponent;
  let fixture: ComponentFixture<MPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
