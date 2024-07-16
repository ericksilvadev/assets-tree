import { Request, Response } from 'express';
import { GetTreeItemsService } from '../domain/useCases/get-tree-items.service';

export class TreeController {
  constructor(private getTreeItemsService: GetTreeItemsService) { }

  public async getTree(req: Request, res: Response) {
    const { id } = req.params;
    const { skip = 0, take = 30 } = req.query;

    try {
      const treeItems = await this.getTreeItemsService.getItems(id, +skip, +take);
      res.send(treeItems);
    } catch (error: unknown) {
      res.status(500).json({ error });
    }
  }

  public getChildren(req: Request, res: Response) {
    const { parentId } = req.params;
    const { skip = 0, take = 30 } = req.query;

    try {
      const treeItems = this.getTreeItemsService.getChildren(parentId, +skip, +take);
      res.send(treeItems);
    } catch (error: unknown) {
      res.status(500).json({ error });
    }
  }
}