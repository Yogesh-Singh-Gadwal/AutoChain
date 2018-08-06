import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLocalItemsComponent } from './get-local-items.component';

describe('GetLocalItemsComponent', () => {
  let component: GetLocalItemsComponent;
  let fixture: ComponentFixture<GetLocalItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetLocalItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetLocalItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
