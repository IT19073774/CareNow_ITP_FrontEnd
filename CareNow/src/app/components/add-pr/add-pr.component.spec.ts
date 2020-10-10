import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPRComponent } from './add-pr.component';

describe('AddPRComponent', () => {
  let component: AddPRComponent;
  let fixture: ComponentFixture<AddPRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
