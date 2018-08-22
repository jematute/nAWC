import { Component, OnInit } from '@angular/core';
import { LibraryService } from './library.service';
import { VaultModel } from '../classes/vaultmodel';
import { LibModel } from '../classes/libmodel';
import { SearchService } from '../search/search.service';
import { GridService } from '../results/grid/grid.service';

@Component({
  selector: 'library-browser',
  templateUrl: './library-browser.component.html',
  styleUrls: ['./library-browser.component.less']
})
export class LibraryBrowserComponent implements OnInit {

  constructor(private libraryService: LibraryService, private searchService: SearchService, private gridService: GridService) { }

  tree: VaultModel[];
  processing = true;
  ngOnInit() {  
    this.libraryService.getLibraryTree().subscribe(vaults => {
      this.processing = false;
      this.tree = vaults;
    });
  }

  librarySelected(library) {
    if (library.libId) {
      const selectedLibrary = library as LibModel;
      this.searchService.setSearchCriteria("SCHEMA_S_LIBID", selectedLibrary.libId);
      this.gridService.dataService = this.searchService;
      this.gridService.reloadGrid();
    }
  }
}
