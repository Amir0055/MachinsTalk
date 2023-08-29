import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPaginatorComponent } from './my-paginator.component';

describe('MyPaginatorComponent', () => {
  let component: MyPaginatorComponent;
  let fixture: ComponentFixture<MyPaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPaginatorComponent]
    });
    fixture = TestBed.createComponent(MyPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
