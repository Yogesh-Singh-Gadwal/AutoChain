import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindUuidComponent } from './find-uuid.component';

describe('FindUuidComponent', () => {
  let component: FindUuidComponent;
  let fixture: ComponentFixture<FindUuidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindUuidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindUuidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
