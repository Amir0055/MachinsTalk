import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownInputsComponent } from './drop-down-inputs.component';

describe('DropDownInputsComponent', () => {
  let component: DropDownInputsComponent;
  let fixture: ComponentFixture<DropDownInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownInputsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
