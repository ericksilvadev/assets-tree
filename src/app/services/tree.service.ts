import { Injectable, OnDestroy, signal, WritableSignal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FilterModel } from '../models/filter.model';
import { TreeItemModel } from '../pages/home/components/tree-view/tree-item/models/tree-item.model';
import { TreeRepository } from '../repositories/tree.repository';
import { AppContextService } from './app-context.service';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService implements OnDestroy {

  public items: WritableSignal<TreeItemModel[]> = signal([]);

  private _companyChangeSubscription: Subscription;
  private _filterChangeSubscription: Subscription;
  private _getItemsSubscription?: Subscription;

  constructor(private treeRepository: TreeRepository, appContext: AppContextService, filterService: FilterService) {
    this._companyChangeSubscription = appContext.currentCompany.subscribe(company => {
      this.setItems(company.id, filterService.filter.value);
    });

    this._filterChangeSubscription = filterService.filter.subscribe(filter => {
      this.setItems(appContext.currentCompany.value.id, filter);
    });
  }

  private setItems(companyId: string, filter: FilterModel = new FilterModel()): void {
    if (!companyId) return;

    this._getItemsSubscription = this.treeRepository.getItems(companyId, filter).subscribe(assets => {
      this.items.set(assets);
    });
  }

  public getChildren(parentId: string): Observable<TreeItemModel[]> {
    return this.treeRepository.getChildren(parentId);
  }

  ngOnDestroy(): void {
    this._companyChangeSubscription.unsubscribe();
    this._filterChangeSubscription.unsubscribe();
    this._getItemsSubscription?.unsubscribe();
  }
}
