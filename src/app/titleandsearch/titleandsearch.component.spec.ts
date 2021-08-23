import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleandsearchComponent } from './titleandsearch.component';

describe('TitleandsearchComponent', () => {
  let component: TitleandsearchComponent;
  let fixture: ComponentFixture<TitleandsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleandsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleandsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
