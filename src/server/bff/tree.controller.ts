import { Request, Response } from 'express';
import { TreeService } from '../domain/tree/tree.service';

export class TreeController {
  constructor(private getTreeItemsService: TreeService) { }

  public async getTree(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const treeItems = await this.getTreeItemsService.getItems(id);
      res.send(treeItems);
    } catch (error: unknown) {
      res.status(500).json({ error });
    }
  }

  public getChildren(req: Request, res: Response) {
    const { parentId } = req.params;

    try {
      const treeItems = this.getTreeItemsService.getChildren(parentId);
      res.send(treeItems);
    } catch (error: unknown) {
      res.status(500).json({ error });
    }
  }

  public getComponent(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const treeItem = this.getTreeItemsService.getComponent(id);
      res.send(treeItem);
    } catch (error: unknown) {
      res.status(500).json({ error });
    }
  }
}