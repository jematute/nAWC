import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { SearchParams } from '../search-params';
import { ColumnsService } from '../../columns/columns.service';
import { FieldDefinition } from '../../columns/fieldDefinition';
import { FormControl } from '@angular/forms';
import { GridService } from '../../results/grid/grid.service';
import 'rxjs/add/operator/take';
@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.less']
})
export class SearchboxComponent implements OnInit {
  
  userColumns: Array<FieldDefinition>;
  searchValue: string = "";
  selectedField: FieldDefinition;
  selectControl: FormControl = new FormControl();
  
  constructor(private search: SearchService, private columns: ColumnsService, private grid: GridService) {
    this.selectedField = new FieldDefinition();
    this.columns.getColumns().subscribe(res => {
      this.userColumns = res.filter(column => column.displayName !== '');
      this.selectedField = res.filter(column => column.schemaID === "SCHEMA_S_LONGNAME")[0];
      console.log("this is where is at");
    }); 
  }

  ngOnInit() {
    
  }

  onChange() {
    console.log("on change");
  }

  doSearch() {
    if (this.searchValue) {
      this.search.setSearchCriteria(this.selectedField.schemaID, this.searchValue);
      this.grid.dataService = this.search;
      this.grid.reloadGrid();
      this.searchValue = "";
    }
  } 
}
