import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TreeItemModel } from '../pages/home/components/tree-view/tree-item/models/tree-item.model';
import { TreeRepository } from '../repositories/tree.repository';
import { AppContextService } from './app-context.service';
import { TreeService } from './tree.service';

describe('TreeService', () => {
  let service: TreeService;
  let items: TreeItemModel[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    items = [
      new TreeItemModel('1', 'Asset', 'asset'),
      new TreeItemModel('2', 'Location', 'location'),
      new TreeItemModel('3', 'Component', 'component')
    ]
    service = TestBed.inject(TreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tree items', () => {
    // arrange
    const repository = TestBed.inject(TreeRepository);
    const spyGetItems = spyOn(repository, 'getItems').and.returnValue(of(items));

    // act
    service.getAssets('');

    // assert
    expect(spyGetItems).toHaveBeenCalled();
  });

  it('should set items on company change', () => {
    // arrange
    const repository = TestBed.inject(TreeRepository);
    const spyGetItems = spyOn(repository, 'getItems').and.returnValue(of(items));
    const appContext = TestBed.inject(AppContextService);
    appContext.currentCompany.next({ id: '1', name: 'Company' });

    // assert
    expect(spyGetItems).toHaveBeenCalled();
  });
});
