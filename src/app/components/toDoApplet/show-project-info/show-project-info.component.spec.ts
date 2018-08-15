import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjectInfoComponent } from './show-project-info.component';

describe('ShowProjectInfoComponent', () => {
  let component: ShowProjectInfoComponent;
  let fixture: ComponentFixture<ShowProjectInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProjectInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProjectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
