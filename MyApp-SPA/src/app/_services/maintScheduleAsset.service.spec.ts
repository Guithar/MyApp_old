/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MaintScheduleAssetService } from './maintScheduleAsset.service';

describe('Service: MaintScheduleAsset', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaintScheduleAssetService]
    });
  });

  it('should ...', inject([MaintScheduleAssetService], (service: MaintScheduleAssetService) => {
    expect(service).toBeTruthy();
  }));
});
