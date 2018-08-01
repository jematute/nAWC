import { Injectable } from '@angular/core';
import { WorkAreaModel, WorkAreaItemsList, WorkAreaExtractionItems, IncomingWillExtract, WorkAreaDBRecordModel } from './classes/WorkAreadModel';
import { Observable, of, throwError, forkJoin, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Global } from '../classes/global';
import { map, switchMap, tap, mergeMap, catchError, delay, concatMap } from 'rxjs/operators';
import { LocalizationService } from '../localization/localization.service';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { PlugInDefinition } from '../classes/PlugInDefinition';
import { ExtractionDataModel } from '../classes/ExtractionDataModel';
import { ProgressDialogService } from '../progress-dialog/progress-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class WorkareaService {

  constructor(private http: HttpClient, private locale: LocalizationService, private errorDialog: ErrorDialogService, private progressDialog: ProgressDialogService) { }
  workAreas: Array<WorkAreaModel> = [];
  pluginDefinitions: Array<PlugInDefinition> = [];
  getWorkAreas(hitServer: boolean): Observable<Array<WorkAreaModel>> {
    if (!hitServer && this.workAreas.length > 0) {
      return of(this.workAreas);
    }
    return this.getWorkAreaList().pipe(switchMap(workAreas => {
      return this.validateWorkAreas(workAreas).pipe(map(workareas => {

        //iterate the workareas and process
        workareas.forEach(workArea => {
          //set the icon
          this.setIcon(workArea);

          //calculate the name
          workArea.origName = workArea.name;
          workArea.displayName = workArea.label;
          if (workArea.displayName == null || workArea.displayName.length < 1)
            workArea.displayName = workArea.origName;
          workArea.name = workArea.displayName;

          //sort because name could be label
          workareas.sort((a, b) => {
            if (a.name.toUpperCase() < b.name.toUpperCase())
              return -1;
            if (a.name.toUpperCase() > b.name.toUpperCase())
              return 1;
            return 0;
          })
        });
        this.workAreas = workareas;
        return workareas;
      }));
    }));
  }

  private getWorkAreaList(): Observable<Array<WorkAreaModel>> {
    return this.http.get(`${Global.API_URL}/api/WorkArea/List`).pipe(map(resp => resp as Array<WorkAreaModel>));
  }

  private validateWorkAreas(workAreas: Array<WorkAreaModel>): Observable<Array<WorkAreaModel>> {
    return this.http.put(`${Global.ACS_URL}/api/values/ValidateWorkAreas`, workAreas).pipe(map(resp => resp as Array<WorkAreaModel>));
  }


  getWorkAreaItems(workArea: WorkAreaModel): Observable<any> {

    //get workarea items from acs
    return this.getLocalWorkAreaItems(workArea).pipe(switchMap(workAreaItemList => {
      workArea = this.updateValidation(workArea, workAreaItemList);

      if (!workAreaItemList.pathExists) {
        var msg = this.locale.resourceStrings["WORK_AREA_ACCESS"];
        var title = this.locale.resourceStrings["ERROR"];
        this.errorDialog.showError(title, msg);
        throwError("ACCESS_DENIED");
      }
      return this.getExtractionItems(workAreaItemList).pipe(switchMap(extractionItems => {
        //get the plugin definitions
        return this.getPluginDefinitions().pipe(switchMap(plugins => {
          //create extraction object to send to webapi
          let incomingWillExtract = new IncomingWillExtract();
          incomingWillExtract.PluginDefinitions = plugins;
          incomingWillExtract.Items = extractionItems.items;
          //check which items will extract
          return this.willExtract(incomingWillExtract).pipe(switchMap(items => {
            return from(items).pipe(
              concatMap(item => { 
                //execute each item in order
                console.log(`Lets attempt to extract ${item.Name}`)
                return this.extractAndUpdateItem(`${workArea.path}${item.Name}`, false); 
              }))
            // //using the array of items, create an observable and mergemap to flatten the observable into a stream of responses
            // return of(items).pipe(mergeMap(items => 
            //   //invoke the progress dialog and set the values accordingly
            //   //we'll use forkJoin to have each observable wait for the previous want to complete
            //   forkJoin(...items.map(item => {
            //     //update the progress dialog to display the filename
            //     console.log(`${item.Name} begins to extract`);
            //     //attempt to extract and update each item individually
            //     return this.extractAndUpdateItem(`${workArea.path}${item.Name}`, item.extractText).pipe(map(res => {
            //       //each item should report its progress
            //       console.log(console.log(item.Name, "finished extracting"));
            //       return res;
            //     }));
            //   }))
            // ));
          }));
        }))
      }));
    }))
  }

  testRequest(item): Observable<any> {
    return of("hello").pipe(delay(1000), switchMap(res => {
      console.log(res + item);
      return of("hi").pipe(map(res => {
        console.log(res + item);
      }));

    }));
  }

  getLocalWorkAreaItems(workArea: WorkAreaModel): Observable<WorkAreaItemsList> {
    return this.http.get(`${Global.ACS_URL}/api/workarea/items?id=${encodeURIComponent(workArea.workAreaId)}&path=${encodeURIComponent(workArea.path)}`)
      .pipe(map(resp => resp as WorkAreaItemsList));
  }

  getPluginDefinitions(): Observable<Array<PlugInDefinition>> {
    return this.http.get(`${Global.API_URL}/api/Plugins/GetDefinitions/0`)
      .pipe(map(resp => resp as Array<PlugInDefinition>), map(plugins => {
        return plugins.filter(plugin => plugin.loadOnStartUp === true);
      }), tap(plugins => { this.pluginDefinitions = plugins }));
  }

  updateValidation(workArea: WorkAreaModel, workAreaItemList: WorkAreaItemsList): WorkAreaModel {
    // Update Validation.
    let ValidationState_Valid = 1;
    let ValidationState_Invalid = 2;

    if (workArea != null) {
      if (workAreaItemList.pathExists) {
        // If this was invalid, fix it.
        if (workArea.validationState != ValidationState_Valid) {
          workArea.validationState = ValidationState_Valid;
          this.setIcon(workArea);
        }
      }
      else {
        // If this was valid, make it invalid.
        if (workArea.validationState == ValidationState_Valid) {
          workArea.validationState = ValidationState_Invalid;
          this.setIcon(workArea);
        }
      }
    }
    return workArea;
  }

  getExtractionItems(workAreaItems: WorkAreaItemsList): Observable<WorkAreaExtractionItems> {
    return this.http.put(`${Global.API_URL}/api/workarea/select/${workAreaItems.WorkAreaId}`, workAreaItems).pipe(map(resp => resp as WorkAreaExtractionItems), map(extractionItems => {
      if (extractionItems != null) {
        var invalidItemsArray = extractionItems.invalidItems;
        if (invalidItemsArray != null && invalidItemsArray.length > 0) {
          //var gateKeeperController = $injector.get('gateKeeperController');
          alert("Need a dialog: Invalid Items");
        }
      }
      return extractionItems;
    }));
  }

  willExtract(willExtractData: IncomingWillExtract): Observable<Array<WorkAreaDBRecordModel>> {
    return this.http.put(`${Global.ACS_URL}/api/document/willExtract`, willExtractData).pipe(map(resp => resp as Array<WorkAreaDBRecordModel>));
  }

  extractAndUpdateItem(filePNE: string, extractText: boolean) {

    return this.extractItem(filePNE, extractText).pipe(switchMap(extractData => {
      console.log(filePNE, "extracted");
      return this.updateExtractedData(extractData).pipe(map(res => {
        console.log(filePNE, "updated");
        return res;
      }), catchError(err => {
        console.log(filePNE, "update failed");
        return throwError(err);
      }));
    }), catchError(err => {
      console.log(filePNE, "extract failed");
      return of(err);
    }));
  }

  extractItem(filePNE: string, extractText: boolean): Observable<ExtractionDataModel> {
    return this.getPluginDefinitions().pipe(switchMap(plugins => {
      return this.http.put(`${Global.ACS_URL}/api/document/extract?path=${encodeURIComponent(filePNE)}&extractText=${extractText}/`, plugins).pipe(map(resp => resp as ExtractionDataModel));
    }));
  }

  updateExtractedData(extractedData: ExtractionDataModel): Observable<any> {
    return this.http.post(`${Global.API_URL}/api/Document/UpdateExtractionData`, extractedData);
  }

  setIcon(workAreaModel: WorkAreaModel) {
    var wa_local_32 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAASdAAAEnQB3mYfeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALwSURBVDiNnZU9TGNHFIW/O+/Zzz94AeN4SRSINlAhpUyUeBu2SLcFBaKnRkralHSpI6XfHlEgpY7YFHFDl2JXKZB2pUUbEMELxH/P781JYRuDwQLtqUYzc8/ce+7MGeMO/Prbn9+BVoXVDK0g3NWi4QWvJeqBdy+31mr18XgbDrZf7Ocq1cIiPt4A+1rSMmbzBrPX9wESNBD/GBxKHASwc3LWe7u9+axzRbr9Yj/3yVz2K6E1jHWJBTPyd1VxA6JtZu+816683zv7kP61vfmsEwJUqoVFpb01mX40rGB2I7PJMPJCyzj94JyjWnbnwN99rXy8gbFuWOFBZLe4rSC0roANABs05SeJ74clV6enqEwXKeWjiUSX7S6n501Ozv/rKyHahn5Pvf85BK1KWjazvBlEYchidZaFygzFXHYiabMTU4w+cNHq0E0SgDywFLhgNRRWw5gHCJxj7lGRhcoM8+USziZLWypEYPC+ccFx45Je6hH2GOOpM7QyuDZEmZClz+YoFaJ7O2VAKR/x5adzZDPhcG7WxEqIcAy67cwo5SLiJOGi5e+hhdR7SrmIYFSRyXDh9U1CJKnn/dkFcS+9lzQbBuSjDBqbv0HqvWh2Yv69bHLZjvHek3oBwgukUXjgHNPFHNXpKbzXGKnhAQHmJZrdmMA5smFAq5vSjmMExL2UuJdcBT4q5pjyWVrdGD86TGbmQ8FrYMagPFyJMiGZMKCUjwZZ3J1pGI58pi8fDZNehRJ1gycY5STxHJ2e49zDXimAl+glff0NHUvUw8C7l3L+W8STxPv88IV8BNrIHTpn+25rrVaXODCzd/0KbjXzPvRjxBFOB1vPa3UHEMCO99oVan1MikItwa7kdmBwpU7Oem/LM8Gecw6hdWSfP8hPoY04Ats1r71io/sGxpy/Ws58oYANeX2DsSTs8STnN3SM3CFOB5LbmTrtvtm87vzj+GXvj1rgglUZT02syEZ/lJl5pFeS6s4F+1vPb/9R/wMy314Z/U5xDQAAAABJRU5ErkJggg==";
    var wa_local_invalid_32 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAASdAAAEnQB3mYfeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAO1SURBVDiNjZVNbFRVFMd/57735s28YTr9HKclLcE2apqiIYQgJYZiYnTZRcNOEtYkunXZnWsT98SlpDGoiTtsJWmVYFCJFBRqqZQwlGmHaTudmTfv3eOiH/Qz9b+6OffeX845//sh7KMvv588CzqkyKCg/Shma1KwCvdVmXKsmbgyPDi1e79sDkavjifbc0EPNrwIclpV+xDJC7RsXweoQgmlIDCjym0Hri0sNeZGL1+obUFHr44nO9oSJxQdRhhRpVuE1H5V7JBSFZF5a3VMrb2+9DK+O3r5Qs0FaM8FPRo3hlX0U0ECkR2ZHSwhpWgfRj8xxpBrNWXgr/Ve2fAiwoggwf+C7WFLoOiIOlwEkA1TPlPlg82Sc9kjtGfTZFL+gaCVap1iucJCeXW9E0pV0BuxtZ+7oEOq2iciKRHwXZeeXAvd7c2kk4kDoZVaSNp/yfJajXoUAaSAXsc4Q64igwh5AMcY2prSdLc3k2/NYOTg1mYCHwSelZZ5XlqhEVsUeQ3hnBG0f+PY4HsuvV1tZAL/UKcEyKR8Xu9sI+G5m7EWUfpdFMOG20aETNInjCKW1+whWIitJZP0cV5VJCoYd/siRYliy7OlZcJGfCg04TqkfA/dFd8BtVap1EIWVyqsVEOstcRWAcUqqCqoklhexSuXyNiQ1kxA+ukCaxJQb2rGaUnjIlhAAbGqVOohjjEkXIe1ekw1DFEgbMTUGxE0IvK3fid7a5zM7DQx0AusdZ9h5fR7GpzvV1fhPtAs0LqZse+5eK5DJuVjt2X6cr7Igx9+5a3ZSbJxBZPLERWLeJ153owLZO/erM+WS0uuKlMCxxFao8jytFjGmAO8Xyjwxh/jNHsVWs6fJXGsm+r0A9KnTlL55Tby2z3H3HmRdB1rJtTYd1GOR9amNm/IfsouvmBgYRo3lyNxrJum94cIBgbwujqpzz4mVV/1jpYW0+bK8OCUKrdFZH6jt7vN3KOoWKQ6/YBooUjwzgnqj2ao/f2IqFQCWH98HbhmrY4punYYEMDrzJM+dRKvq5PVn2+RGugneHsAt6ODDR6c/vDjSsqXkjGmrGgelUAEb0+GlZDSkwpNtkoialCbmWH5xgSNwnOq96aJCoWCVms3HYCJb7+Kznx0afFI0nksRmJUQ4RYEUcgycZj3lCHsslqcmmxbv6d1fjen07t4UPqc0+ICoWCrdYm4yj6el+bv7j+06BjnCEVzonSr/Lqj5JYNfpucqn3zo/Jo6V/0ltxZNLC2Km5h9/8B5uXsYgTmZEQAAAAAElFTkSuQmCC";
    var wa_network_32 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAASdAAAEnQB3mYfeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMBSURBVDiNhdVNT1VXFMbx3zr3XIRbQCA1EIFbK6RpaOqk8Q1ryqxTB8SPoQO/AEnHxu/QITGN/QCNjmiMM9NobWKKqRKUtljkRS73nt3BucjlLa5kJydrP+efs9Z59trhiBi9ky5XmBGmMYWsY7uQPE3JQit5sHQrFg6+H7sPZ+ZS906fehauy5wPJiUjKQxGhy6RIlkVllPyHI9aYb7rrReLc/H+A/TMXOpuDfga1ySzGI/Qc1QVnZHYwkvJ3ZTcy9c8XpyL9zns9KlnXMNNodZbFbUqXZXjgY0Wmzt61ndMCjciozHgPzzLIQvXJbNCDb45zfQYE0PHQ5//y68vefAC1CSzlWQLP+Sjd9Jl4bxkvJqJUzW+P8u3dfpPHA/9Yqjc/+MfsbLJTstYSi6cvp2m8wozmBR6alUujnJumPpJsjgeOtDNuwaXxvjlT9YKPcFEMJML05IRwSdVrtYZ7Ga7eTywE3y1zsOXrG0jDEe4kmOqbRt5xnBvKVhvfBxaJEZ6yds/NDEYTOXKKgOaBW/WefiKvzc/Dv20xtmB8j0IIpHlnaJmwfIGKxssr7OxUy7Kdmy39rQnTzAxSK1Ks2Vf7IO2Ull6rcpQD1lW5lKiVZTe3I3unGql1LfSYWiRSEFIpaC3q1xjHcJdJxQHAO+b7KbanCKXPA0GhKG1Bj8/O9pKF0cZ7eOn3/fni3Z17Z6u4kmekoXIfI6hZsGbjcNA2GqWgOX1o/fbn/o6sZC3kgeV5JLweSiHyHg/fQdOU72/tNvUqb3cu23+WvtQ+lYKz4twP1+6FQvjd9IjfJmYhO/OiK9O7YeO9NJbpfvcXu7JCj8+brc0eSU8WroZCzm0wnwl6RFuoPbbm8NtqGZlrztttbKn2UzhbtE0T9tSXW+9aPa7FxmS2cVVY0vvPj5PGy1bklcp3MW9rnWLHJj8jQGfVZLrKbmQhQlhuH309k9+ViWviygnf9E037Vucd/kPxinb6fpSpiJzBVMpY47KijwJCULrcz9pZuH76j/AQAVKMWrQSZEAAAAAElFTkSuQmCC";
    var wa_network_invalid_32 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAASdAAAEnQB3mYfeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOuSURBVDiNhZVdT1RXFIafdeYcYM4AM0Od4WM+QCFa6YixRBCskfTGeEdTws+wF/4Bkl4brvsHemFMQ0viRdM2JC0goUmTtoICFoiUjoCMxRmGmXPOrF4cqINCXMlOdvZ+97OzPvbawgmWGNeBAAwhDALdgFG1XUFZVGXGU6Y278rM2+flaNIxpnVOA2lDGMXgqkAXSosKUanSKagoOYSsKs+AeU+4X/OK9bUxOfgf2jGmdV6ES8AwygiQEiF4khfVplAENlAeqDJh7vH72pgcmABOA2kDhoEvEOx6C7EtqAmcDix7sO8QzDt0IdwRA8oR/gWemgCGMIoygmAD9LbBYBI6m06HPtuF2Q2YWgfARhkJKEXgSzMxrgMIV1FSloHEbLh1Dj5JQ2Pt6dDzTf7+0ktkex8cj6QqfW33dNAMwBDQhRC0LehPQE8zpMNgyOnQSB28LsO1JPy4CnsVggKdAkMmwiBKCwIhC26kIVoHJfd0YDX4RhrmNmCvBAjNIlw3ge7DssE0oLneF+TL74dWFFrqwTxMqEJUoNvE91IA3Aps5WHub9jZfz/0jA3nIv45AAFRMMxqkVuBbAG2C5DNQ8HxB/jhKHlvtOFa6IyCbYHrccyOQT31XbctaAqCYfhrquBV/NpEldrdLHFnm3i2gPkczq9DiDC5UIxcKIZ5GBoVENSH1Nf4I1l1oXEkcByS3z+k+ZdJGlYXAOgD/kj189PFz3Tq4rCaKIsCEYSmvTJ8+/TkUupPwGWybH33kMjyD4S9AkY8jruzg9XawgUvi7UyWfog/2LXVGVGDM4CTW4FtgonJ6XoQri0TfTXSaJWgejNAWraUxQXnhDqvULh0Tzy2+NA/eJmnekpUwHlGsJZwW8iqUZoeOs1pRshtl0gvLWAGY9T056i8dMh7EwGq62V0uoawVLeSuRehszNuzKTGtd54EOFLoCbHchHsePQlno4UwAHcHd2KC48wc5ksC9fIj87x8HSCm4u9yb7nnA/oAQR7gD2n1vvhsEyILUMtwGrtYVQ7xWstlbys3MEM93YPRkOlldwtl740JpXrLuNTIgBKCNrOZKbr9/tp//shUmm+rngZSk8mqe0usbB0gp2T4bi4wVwnawg08c6fzlCe0AZVaXPEDoRmg+fngBECtt8vPaz3lqZLHUWnweCpbzl5nKYsRi4TrZSPJh2i8WvT+xDbfd0MCAMicF1oFur/qhApaKfz3+1O7Q4UZfI/RU6WhdkugIPeteXv/kPs8ZtPrpTz/0AAAAASUVORK5CYII=";
    var wa_shared_32 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAASdAAAEnQB3mYfeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQ3SURBVDiNbZRLbxtVGIafc2bssZ2Z2G1jN01iRyGNVIpaURqpBYQadYWgF0qF2FViARtWCLHvLwCpgjULhESRQEhVi1jVECFKFVBCWpKgOHGaxnHtxmk8vs/lsJi0uTTvaBZnvu97zqv3HI1gD/VfUwO6xxkF5xGMAtq2so9iAsEN1+PXwqdiefe82L7ou6piwuK4lLwPvCYEgwpSYlufAiWgpBRLAv7w4LraYKpwVTSegya/UmakzREkHwDnIhqZWAhC2z1uyvGg4UDL4wGKmwi+boWYKX8sagD65v4i2mZQCS4AV8wQZiYOQwmIhp6HNl1YXIcHG2RqDleANa1NA7j/DDrwORFfclrCRwqiJ/vg3SNwdmhXPlsRcHsRfpyFbJ6oEHyoS+aeQuVm32EBLynFAUAeS8HRJMQN6N7jjRtB/VgKEAilOCDg5d5r6ugzpwIOAYekQNdlMISCVXsPm0/dKohHICwRro/uK9IhnzTwrx4kiikUXZoG+6Ngd2BhPRiuNCGig6eg421BDR2qraB/rQnKJ+Z7mNsOKlBYg5H9kH8CtU4A+WEm+GZ3YKW61TtyANLdQa1WBNffqu2Auj6s1oKBVBfYbXh7BGIh8HxobXOaigXr8SVwfHYoyFRQBxquD4/qMF0CM7QTMrwP+kyYWN2MpQF1B0r1wIxSNAk4AVT5FISk4Clcu4M2UXj+JvVEIRmDOw93HVhwwzwFBTwKAHJsbEw/+O3orHQa96XvNqXylPBdhPIQygPlA4puA5Jdu7cKuAJqAiYffib+AdCjZvcXVk9qqGfik8GWnohE4geFkBIRTeCb/VS0JE1zmN+XLf4uBvk+ledD21VtrVH4vqv4Z3l4bKw3m80WxVsXLmXTR44f8z3XbFVK2vmLl6RhRES94/O47rFa9ZivCCq+RS18kEo4jZIhNMfGaBXbiXquYq1Pzh6SG+VUXF9MJpN3dCGEnhwYDLuuG6orR7159g0sy6RYLJLP57Ftmxdi65TbbZYdj78eb6i2L33DtcWAXvJf2bdKLGme0qRpOI63Wq1We/Rd8QSPUnieh1KKvr4+Tpw4gVKKmdk5uP4N9bbj7k9Y4sWR4fDp02d60+k0Kysr/tTUlBwfn4vtgCqlaDWbxKJRAGzbZnJyikpljXDYQEqJEdK4eOFcaOTwMJ7vidz8PLdu3XKrVXvFcZyfa7Xal+L8O+99l8oMjXq+u8+pPdFeHT2p9ff3RSyrW49GI0QiURqNOvV6g06ng67rJBJxHj0q+YVCoVar2cu53OLNZrM1o2ncn56entSlkL+UlhdySqluXUptfPw3LRNoIJPJ9PT29pqGYYhGo4njdIhEDJXP56v37t1bnJ/P/WdZ5ly5XP6pWq0uZbPZFuz9u+Ty5cunLMt6XUp9tN1uZXb1KSm1nOO0bywsLNy+e/fu2u75/wH2Yeg19QehYAAAAABJRU5ErkJggg==";
    var wa_shared_invalid_32 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAASdAAAEnQB3mYfeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARLSURBVDiNbZTNb1RVGIefcz+mM3c++mUHOv2mIm2dIk0xiMbQsDAYgYUsNCaSuNCNS/8B/gJNMK5dsJFE2RBdEI2IIBKbAMGWSoG2tHRuh+lMO3em987cj+PiFjqlfU/u4pz3fZ/zu79zcgS7RNd52a35HJNwCsFhQG1IB0gmEVz2fP5Y/kosvtwvGieZc9IQSQ4qCh8BbwtBn4S0aKiTIAXkpWRBwE0fLsp17i6fExs7oB3fyUS0xhAKnwEnoyq9hg56o8bNcH3YcMHxeYLkZwTfOzr3n30pKgDa5v4iVqNPCk4DZxM6id5mGGiBmL4TanswV4In6/RWXM4Cq2qNDWDqBbT7a6KBwlsKfCEhNp6BD4fg+MBL/mxZwO9zcGkGrs4TE4LPNYX/nkOVzbpXBbwuJe2AMpqGkQ5oboLULl9zU5gfTQMCISXtAg7tPS9HXigV0Al0KgJNU8ImJOSsXWQ+VyuhOQoRBeEFaIGkRw/oAaa10FESQhJXVWiLgVWHx6WwuWhDVANfQt3fgjZpUHbC+lUbZIAR+CQaDiqMiAr722B+DSr1EPLT/XDNqsPT8lbt/nboSYW5iglesJXbBvUCyFXChnQcrBp8sB8MHfwAnAalaSOc/7kAbsC2CD0VVIENL4CVKtzLQ0LfDhlshUwCJnObtmxA1YV8NRQjJTYhJ4TKgGWhsOxLPKuOOrm88ya9Egt/9+m6pKloEll7hmpX6d/MC0gpUrYsAWJiYkKzLEsUPr52FjXyDULEkVJBhFyJACH4JCs4MSi5vejSfeUCe65fJjk3/WLTez1HWGh77Qe/HHwq3j95+lstGh2oqy19jtZyINq8RxOKIkSshSDRRVHtwE4M0tqcZKCeY+jOL7w5+yvpWgHFsfEKBfTOvVSlTp7U0oPU4BVNKOpoZt/waOB7CaeYV069N0FTU5RqPaBQ9cmVczwsmhQrSbxSgQOTl2nVq7QeO0qkrwd7eob4+BjVv/9B3J7aw8rdo5oQQuvo7ot4nqdXpStPHH+XZDKBaZrMz89jWRb7jBLPajUMZ5l9+Wm0dJpIXw+p4xMY2Sx6ppPa3DyxWkXvKq3Gte3HIcMhJb7vI6Ukk8kwNjaGlJL1639RuQBeoYA9PYORzWK8MUrl5i2cBw/xSqWd91RKiWPbGLEYAJZlcefOXYrFVSKRJrqKJUYAvXMv8fEx9EwnlZu3iGVHMA5mcWYf4uZXUIeGs+9J32+2inmq5ZJbXlvzTDOnWFZFiccN+vv76erK0NbWhnRVlhY9UoFNxHNxHj2i/NtVXHMFe2oazzRNaTvX1OHh0WSlXMxtlNce+HV36unSk6lyubzqunVH1/XAMAw0TXMdp+aurJbdmULdTWxUPX15EX/qX9WZnaW2sIhnmmZgOzd8z7u423PJmTNnjiSTyXcURTtcqzm9NDyrAsGBcrt6aHE61VV6HG9YvxHAj+MLs5f+B1II74HacGnkAAAAAElFTkSuQmCC";

    // Calculate Icon
    //workAreaModel.icon = workAreaIcon;
    var bShared = false;
    if (workAreaModel.shared == "P" || workAreaModel.shared == "C")
      bShared = true;
    var ValidationState_Unchecked = 0;
    var ValidationState_Valid = 1;
    var ValidationState_Invalid = 2;
    var DriveType_Local = "L";
    var DriveType_Network = "N";
    if (workAreaModel.validationState == ValidationState_Valid) {
      if (bShared) {
        workAreaModel.icon = wa_shared_32;
      }
      else if (workAreaModel.type == DriveType_Network) {
        workAreaModel.icon = wa_network_32;
      }
      else {
        workAreaModel.icon = wa_local_32;
      }
    }
    else {
      if (bShared) {
        workAreaModel.icon = wa_shared_invalid_32;
      }
      else if (workAreaModel.type == DriveType_Network) {
        workAreaModel.icon = wa_network_invalid_32;
      }
      else {
        workAreaModel.icon = wa_local_invalid_32;
      }
    }
  }

}
