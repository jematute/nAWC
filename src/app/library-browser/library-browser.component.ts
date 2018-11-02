import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LibraryService } from './library.service';
import { VaultModel, LibModel } from 'projects/ui-api/src';

@Component({
  selector: 'app-library-browser',
  templateUrl: './library-browser.component.html',
  styleUrls: ['./library-browser.component.less']
})
export class LibraryBrowserComponent implements OnInit {

  constructor(private libraryService: LibraryService) { }

  tree: VaultModel[];
  processing = true;
  @Output() librarySelected = new EventEmitter<LibModel>();

  ngOnInit() {
    this.libraryService.getLibraryTree().subscribe(vaults => {
      this.processing = false;
      this.tree = vaults;
    });
  }

  onLibrarySelected(library) {
    this.librarySelected.emit(library);
  }
}
