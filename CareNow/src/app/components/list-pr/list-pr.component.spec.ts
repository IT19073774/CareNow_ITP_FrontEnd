import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPRComponent } from './list-pr.component';

describe('ListPRComponent', () => {
  let component: ListPRComponent;
  let fixture: ComponentFixture<ListPRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
