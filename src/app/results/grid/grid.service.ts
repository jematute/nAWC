import { Injectable } from '@angular/core';
import { IGridInterface } from './grid-interface';
import { IGetDataParams } from '../../classes/getDataParams';

@Injectable()
export class GridService {
  
  public dataService: IGridInterface;
  
  constructor() { }

  getData(params: IGetDataParams) {
    this.dataService.getData(params);
  }

  getCount(params: IGetDataParams) {

  }

}
