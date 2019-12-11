import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMaintScheduleListComponent } from './asset-maint-schedule-list.component';

describe('AssetMaintScheduleListComponent', () => {
  let component: AssetMaintScheduleListComponent;
  let fixture: ComponentFixture<AssetMaintScheduleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMaintScheduleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMaintScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
