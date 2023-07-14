import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAppComponent } from './details-app.component';

describe('DetailsAppComponent', () => {
  let component: DetailsAppComponent;
  let fixture: ComponentFixture<DetailsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
