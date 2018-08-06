import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUuidComponent } from './get-uuid.component';

describe('GetUuidComponent', () => {
  let component: GetUuidComponent;
  let fixture: ComponentFixture<GetUuidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetUuidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetUuidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
