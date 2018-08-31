import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  constructor(private libraryService: LibraryService) { }

  tree: VaultModel[];
  processing = true;
  @Output() onLibrarySelected = new EventEmitter<LibModel>();

  ngOnInit() {  
    this.libraryService.getLibraryTree().subscribe(vaults => {
      this.processing = false;
      this.tree = vaults;
    });
  }

  librarySelected(library) {
    this.onLibrarySelected.emit(library);
  }
}
