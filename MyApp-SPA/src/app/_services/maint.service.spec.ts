/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MaintService } from './maint.service';

describe('Service: Maint', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaintService]
    });
  });

  it('should ...', inject([MaintService], (service: MaintService) => {
    expect(service).toBeTruthy();
  }));
});
