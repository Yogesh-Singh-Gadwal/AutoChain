import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeChainComponent } from './see-chain.component';

describe('SeeChainComponent', () => {
  let component: SeeChainComponent;
  let fixture: ComponentFixture<SeeChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
