import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlResultComponent } from './url-result.component';

describe('UrlResultComponent', () => {
  let component: UrlResultComponent;
  let fixture: ComponentFixture<UrlResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrlResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
