import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrotherDetailsComponent } from './brother-details.component';

describe('BrotherDetailsComponent', () => {
  let component: BrotherDetailsComponent;
  let fixture: ComponentFixture<BrotherDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrotherDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrotherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
