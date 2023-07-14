import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAppComponent } from './ajoutApp.component';

describe('AjoutuserComponent', () => {
  let component: AjoutAppComponent;
  let fixture: ComponentFixture<AjoutAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
