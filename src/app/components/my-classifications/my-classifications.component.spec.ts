import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClassificationsComponent } from './my-classifications.component';

describe('MyClassificationsComponent', () => {
  let component: MyClassificationsComponent;
  let fixture: ComponentFixture<MyClassificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyClassificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClassificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
