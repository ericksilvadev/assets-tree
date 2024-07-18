import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FilterModel } from '../../models/filter.model';
import { TreeItemType } from '../../pages/home/components/tree-view/tree-item/models/tree-item.enum';
import { TreeItemModel } from '../../pages/home/components/tree-view/tree-item/models/tree-item.model';
import { TreeRepository } from '../../repositories/tree.repository';
import { AppContextService } from '../app-context.service';
import { FilterService } from '../filter.service';
import { TreeService } from '../tree.service';

describe('TreeService', () => {
  let service: TreeService;
  let items: TreeItemModel[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    items = [
      new TreeItemModel('1', 'Asset', TreeItemType.Asset),
      new TreeItemModel('2', 'Location', TreeItemType.Location),
      new TreeItemModel('3', 'Component', TreeItemType.Component)
    ]
    service = TestBed.inject(TreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tree items', () => {
    // arrange
    const repository = TestBed.inject(TreeRepository);
    const appContext = TestBed.inject(AppContextService);
    const spyGetItems = spyOn(repository, 'getItems').and.returnValue(of(items));

    // act
    appContext.setCurrentCompany({ id: '1', name: 'Company' });

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

  it('should set item when filter changes', () => {
    // arrange
    const repository = TestBed.inject(TreeRepository);
    const spyGetItems = spyOn(repository, 'getItems').and.returnValue(of(items));
    const appContext = TestBed.inject(AppContextService);
    appContext.currentCompany.next({ id: '1', name: 'Company' });
    const filterService = TestBed.inject(FilterService);

    // act
    filterService.filter.next(new FilterModel('search'));

    // assert
    expect(spyGetItems).toHaveBeenCalledTimes(2);
  });
});
