import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSkeletonComponent } from './client-skeleton.component';

describe('ClientSkeletonComponent', () => {
  let component: ClientSkeletonComponent;
  let fixture: ComponentFixture<ClientSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
