import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrotherListComponent } from './brother-list.component';

describe('BrotherListComponent', () => {
  let component: BrotherListComponent;
  let fixture: ComponentFixture<BrotherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrotherListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrotherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
