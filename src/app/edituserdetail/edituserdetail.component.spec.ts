import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserdetailComponent } from './edituserdetail.component';

describe('EdituserdetailComponent', () => {
  let component: EdituserdetailComponent;
  let fixture: ComponentFixture<EdituserdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdituserdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
