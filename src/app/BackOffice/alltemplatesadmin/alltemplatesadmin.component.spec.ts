import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltemplatesadminComponent } from './alltemplatesadmin.component';

describe('AlltemplatesadminComponent', () => {
  let component: AlltemplatesadminComponent;
  let fixture: ComponentFixture<AlltemplatesadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlltemplatesadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlltemplatesadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
