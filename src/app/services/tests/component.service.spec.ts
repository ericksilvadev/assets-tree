import { TestBed } from '@angular/core/testing';

import { ComponentService } from '../component.service';
import { TreeRepository } from '../../repositories/tree.repository';
import { AssetEntity } from '../../../server/domain/entities/asset';
import { ComponentModel } from '../../models/component.model';
import { Sensors } from '../../models/sensors.enum';
import { Status } from '../../models/status.enum';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ComponentService', () => {
  let service: ComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeRepository],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get component', (done: DoneFn) => {
    // arrange
    const repository = TestBed.inject(TreeRepository);
    const component = new ComponentModel('1', 'Component', '1', Status.Operating, Sensors.Energy, '1', '1', '1');
    const spyGetItems = spyOn(repository, 'getComponent').and.returnValue(of(component));

    // act
    service.getComponent('1').subscribe((result: ComponentModel) => {
      // assert
      expect(result).toEqual(component);
      done();
    });
  });
});
