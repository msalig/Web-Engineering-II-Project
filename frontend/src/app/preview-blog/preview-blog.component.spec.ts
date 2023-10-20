import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBlogComponent } from './preview-blog.component';

describe('PreviewBlogComponent', () => {
  let component: PreviewBlogComponent;
  let fixture: ComponentFixture<PreviewBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewBlogComponent]
    });
    fixture = TestBed.createComponent(PreviewBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
