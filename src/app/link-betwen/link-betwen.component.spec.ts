import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkBetwenComponent } from './link-betwen.component';

describe('LinkBetwenComponent', () => {
  let component: LinkBetwenComponent;
  let fixture: ComponentFixture<LinkBetwenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkBetwenComponent]
    });
    fixture = TestBed.createComponent(LinkBetwenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
