import { HttpStatusCode } from '@angular/common/http';
import { Request, Response } from 'express';
import { FilterModel } from '../../app/models/filter.model';
import { TreeService } from '../domain/tree/tree.service';

export class TreeController {
  constructor(private treeService: TreeService) { }

  public async getTree(req: Request, res: Response) {
    const { id } = req.params;

    const filter = FilterModel.fromQueryParams(req.query);

    try {
      const treeItems = await this.treeService.getItems(id, filter);
      res.send(treeItems);
    } catch (error: unknown) {
      res.status(HttpStatusCode.InternalServerError).json({ error });
    }
  }

  public getChildren(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const treeItems = this.treeService.getChildren(id);
      res.send(treeItems);
    } catch (error: unknown) {
      res.status(HttpStatusCode.InternalServerError).json({ error });
    }
  }

  public getComponent(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const component = this.treeService.getComponent(id);

      if (!component) {
        res.status(HttpStatusCode.NotFound).send();
      }

      res.send(component);

    } catch (error: unknown) {
      res.status(HttpStatusCode.InternalServerError).json({ error });
    }
  }
}