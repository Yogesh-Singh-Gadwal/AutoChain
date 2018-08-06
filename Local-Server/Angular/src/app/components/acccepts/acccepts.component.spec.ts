import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccceptsComponent } from './acccepts.component';

describe('AccceptsComponent', () => {
  let component: AccceptsComponent;
  let fixture: ComponentFixture<AccceptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccceptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
