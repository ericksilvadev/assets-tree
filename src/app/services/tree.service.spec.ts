import { TestBed } from '@angular/core/testing';

import { TreeService } from './tree.service';
import { TreeRepository } from '../repositories/tree.repository';
import { AssetModel } from '../models/assets.model';
import { Sensors, Status } from '../models/filter.model';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TreeService', () => {
  let service: TreeService;
  let asset: AssetModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    asset = new AssetModel('1', 'MOTORS H12D - Stage 1', '656733b1664c41001e91d9ed', '656a07c3f2d4a1001e2144c5', Sensors.Vibration, Status.Operating, 'MTC052', 'QHI640');
    service = TestBed.inject(TreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tree assets', () => {
    // arrange
    const assets = [asset]
    const repository = TestBed.inject(TreeRepository);
    const spy = spyOn(repository, 'getAssets').and.returnValue(of(assets));

    // act
    service.getAssets();

    // assert
    expect(spy).toHaveBeenCalled();
  });
});
