/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MaintScheduleService } from './maintSchedule.service';

describe('Service: MaintSchedule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaintScheduleService]
    });
  });

  it('should ...', inject([MaintScheduleService], (service: MaintScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
