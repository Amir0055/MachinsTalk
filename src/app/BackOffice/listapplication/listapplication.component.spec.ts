import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapplicationComponent } from './listapplication.component';

describe('ListapplicationComponent', () => {
  let component: ListapplicationComponent;
  let fixture: ComponentFixture<ListapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListapplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
