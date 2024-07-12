import { Injectable } from '@angular/core';
import { TreeRepository } from '../repositories/tree.repository';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor(private treeRepository: TreeRepository) { }

  public getAssets() {
    return this.treeRepository.getAssets();
  }
}
