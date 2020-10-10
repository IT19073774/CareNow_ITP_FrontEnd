import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDsComponent } from './list-ds.component';

describe('ListDsComponent', () => {
  let component: ListDsComponent;
  let fixture: ComponentFixture<ListDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
