import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAssetDetailModalComponent } from './client-asset-detail-modal.component';

describe('ClientAssetDetailModalComponent', () => {
  let component: ClientAssetDetailModalComponent;
  let fixture: ComponentFixture<ClientAssetDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAssetDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAssetDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
