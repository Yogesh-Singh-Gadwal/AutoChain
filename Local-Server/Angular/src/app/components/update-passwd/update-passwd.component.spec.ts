import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswdComponent } from './update-passwd.component';

describe('UpdatePasswdComponent', () => {
  let component: UpdatePasswdComponent;
  let fixture: ComponentFixture<UpdatePasswdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePasswdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
