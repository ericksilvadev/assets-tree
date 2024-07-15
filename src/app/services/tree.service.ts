import { Injectable, OnDestroy, signal, WritableSignal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TreeItemModel } from '../pages/home/components/tree-view/tree-item/models/tree-item.model';
import { TreeRepository } from '../repositories/tree.repository';
import { AppContextService } from './app-context.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService implements OnDestroy {

  public items: WritableSignal<TreeItemModel[]> = signal([]);

  private _companyChangeSubscription: Subscription;

  constructor(private treeRepository: TreeRepository, appContext: AppContextService) {
    this._companyChangeSubscription = appContext.currentCompany.subscribe(company => {
      this.setItems(company.id);
    });
  }

  private setItems(companyId: string) {
    this.treeRepository.getItems(companyId).subscribe(assets => {
      this.items.set(assets);
    });
  }

  public getAssets(companyId: string): Observable<TreeItemModel[]> {
    return this.treeRepository.getItems(companyId);
  }

  ngOnDestroy(): void {
    this._companyChangeSubscription.unsubscribe();
  }
}
