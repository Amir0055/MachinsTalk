import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyadminComponent } from './bodyadmin.component';

describe('BodyadminComponent', () => {
  let component: BodyadminComponent;
  let fixture: ComponentFixture<BodyadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
