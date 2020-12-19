import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDeleteConfirmationComponent } from './room-delete-confirmation.component';

describe('RoomDeleteConfirmationComponent', () => {
  let component: RoomDeleteConfirmationComponent;
  let fixture: ComponentFixture<RoomDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
