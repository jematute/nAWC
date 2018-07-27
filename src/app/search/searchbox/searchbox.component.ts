import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { ColumnsService } from '../../columns/columns.service';
import { FieldDefinition } from '../../columns/fieldDefinition';
import { FormControl } from '@angular/forms';
import { GridService } from '../../results/grid/grid.service';
import { LocalizationService } from '../../localization/localization.service';
import { FTSSearchService } from '../ftssearch.service';
import { debounceTime } from 'rxjs/operators';

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
  fieldFilter: string;
  currentFields: Array<FieldDefinition>;
  showDropdown: boolean = false;
  showCharWarning: boolean = false;
  searchFieldLabel: string;
  searchInput: FormControl = new FormControl();

  constructor(private search: SearchService, private columns: ColumnsService, private grid: GridService, private locale: LocalizationService, private ftsSearch: FTSSearchService) {
    this.selectedField = new FieldDefinition();
    this.columns.getColumns().subscribe(res => {
      //fts search
      let fts = new FieldDefinition();
      fts.displayName = locale.resourceStrings["FULL_TEXT_SEARCH"];
      fts.schemaID = "FTS";
      res.unshift(fts);
      
      this.userColumns = res.filter(column => column.displayName !== '');
      this.currentFields = this.userColumns;
      this.selectedField = res.filter(column => column.schemaID === "SCHEMA_S_LONGNAME")[0];
    }); 
  }

  toggleDropdown() {
    this.fieldFilter = "";
    this.currentFields = this.userColumns;
    this.showDropdown = !this.showDropdown;
  }

  inputKeyDown(e) {
    if (e.keyCode == 13) {
      if (this.searchValue.length > 0) {
          if (this.selectedField.schemaID == "FTS") {
              this.doFTSSearch();
          }
          else {
              this.doSearch(false);
          }
      }

  }
  }

  filterChanged() {
    this.currentFields = this.userColumns.filter(item => 
      item.displayName.toLowerCase().startsWith(this.fieldFilter.toLowerCase()
    ));
  }

  qsInputChanged() {
    //console.log(this.searchValue);
  }

  fieldSelected(item: FieldDefinition) {
    this.showDropdown = false;
    this.selectedField = item;
  }

  closeDropdown() {
    this.showDropdown = false;
    this.fieldFilter = "";
  }

  ngOnInit() {
    this.searchInput.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      if (this.selectedField.schemaID != "FTS")
        this.doSearch(true);
    });
  }

  onChange() {
  }

  doSearch(doNotClear) {
    if (this.searchValue) {
      this.search.setSearchCriteria(this.selectedField.schemaID, this.searchValue);
      this.grid.dataService = this.search;
      this.grid.reloadGrid();
      if (!doNotClear)
        this.searchValue = "";
    }
  }

  doFTSSearch() {
    this.ftsSearch.setSearchCriteria(this.searchValue);
    this.grid.dataService = this.ftsSearch;
    this.grid.reloadGrid();
    this.searchValue = "";
  }


}
