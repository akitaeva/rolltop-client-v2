import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavplacesComponent } from './favplaces.component';

describe('FavplacesComponent', () => {
  let component: FavplacesComponent;
  let fixture: ComponentFixture<FavplacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavplacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavplacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
