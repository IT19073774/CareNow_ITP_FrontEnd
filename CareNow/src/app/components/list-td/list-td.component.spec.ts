import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTDComponent } from './list-td.component';

describe('ListTDComponent', () => {
  let component: ListTDComponent;
  let fixture: ComponentFixture<ListTDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
