import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSkeletonComponent } from './asset-skeleton.component';

describe('AssetSkeletonComponent', () => {
  let component: AssetSkeletonComponent;
  let fixture: ComponentFixture<AssetSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
