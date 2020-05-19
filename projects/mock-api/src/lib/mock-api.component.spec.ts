import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockApiComponent } from './mock-api.component';

describe('MockApiComponent', () => {
  let component: MockApiComponent;
  let fixture: ComponentFixture<MockApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
