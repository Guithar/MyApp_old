import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintScheduleAssetDetailModalComponent } from './maint-schedule-asset-detail-modal.component';

describe('MaintScheduleAssetDetailModalComponent', () => {
  let component: MaintScheduleAssetDetailModalComponent;
  let fixture: ComponentFixture<MaintScheduleAssetDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintScheduleAssetDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintScheduleAssetDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
