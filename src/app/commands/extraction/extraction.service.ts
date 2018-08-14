import { Injectable } from '@angular/core';
import { of, Observable } from '../../../../node_modules/rxjs';
import { map, switchMap } from '../../../../node_modules/rxjs/operators';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Global } from '../../classes/global';
import { GridItem } from '../check-in/classes/grid-item';
import { WorkareaService } from '../../workarea/workarea.service';

@Injectable({
  providedIn: 'root'
})
export class ExtractionService {

  constructor(private http: HttpClient, private workAreaService: WorkareaService) { }

  extractingText(libId) {

    //look up the lib properties to determine FTS option
    if (libId != null && libId.length > 0) {

      //check for ADEPT_NULL_LIBID
      if (libId == "ADEPT_NULL_LIBID")
        return of(false);

      //get the lib properties
      //if extract text on, set extractText to 1

      //put libid into list b/c that's what the calling function expects
      var libIdList = [libId];

      //call the local function to check fts
      this.ftsEnabled(libIdList).pipe(map(resp => {
        if (resp != null) {
          //response is a dictionary of string, bool (libid, ftsenabled)
          //extract = resp[libId];
        }
        else {
          //extract = false;
        }
      }));
    }
  }

  //make the call to determine if extraction is required
  extractionRequired(gridItem: GridItem): Observable<boolean> {
    let params = `
    ${gridItem.selectionItem.tableNumber}/
    ${gridItem.selectionItem.fileId}/
    ${gridItem.selectionItem.majRev}/
    ${gridItem.selectionItem.detailedInfo.libId}/
    ${gridItem.currentUTC}
    `
    return this.http.get(`${Global.API_URL}/api/Document/requiresextraction/${params}`)
      .pipe(map(resp => resp as boolean));
  };

  //using the incoming library id, determine if the library is fts enabled
  ftsEnabled(libraryIdList: string[]): Observable<Map<string, boolean>> {
    //expecting List<string> adeptLibraryIds
    return this.http.post(`${Global.API_URL}/api/Library/FTSEnabled`, libraryIdList)
      .pipe(map(resp => resp as Map<string, boolean>));
  }

  //extract the incoming item
  //The isNew parameter is used because if NEW, we check minor revision to consider Out From Library
  extractItem(extractionItem, isNew): Observable<any> {

    //check if we're doing fts extraction
    return this.extractingText(extractionItem.libId).pipe(switchMap(extractingResponse => {

      //promise to do the extraction and update the data on return
      return this.workAreaService.extractItem(extractionItem.filePNE, extractingResponse).pipe(switchMap(extractedData => {
        if (extractedData) {
          extractedData.AdeptTableNumber = extractionItem.tableNumber;
          extractedData.AdeptFileId = extractionItem.fileId;
          extractedData.AdeptMajorRevision = extractionItem.fileMajRev;
          extractedData.AdeptMinorRevision = extractionItem.fileMinRev;

          //promise to update the extraction data and check if a call to a minrev minus one is necessary
          return this.workAreaService.updateExtractedData(extractedData).pipe(switchMap(response => {

            if (isNew == true && extractedData.AdeptMinorRevision > 1) {
              //check minrev - if it's greater than .1, update both .1 and the .2 (this is true for NEW/Out From Library)
              extractedData.AdeptMinorRevision = extractionItem.fileMinRev - 1;

              //if another update is required, promise to do it
              return this.workAreaService.updateExtractedData(extractedData);
            }
            else {
              //resolve the promise for the first item
              of(true);
            }
          }));
        }
        else {
          of(true);
        }
      }));
    }));
  }

}
