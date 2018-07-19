import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject } from 'rxjs';

@Injectable()
export class LocalizationService {

    private _languages: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    private _resourceStrings: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient) {
        
    }

    get languages(): BehaviorSubject<any> {
        return this._languages;
    }

    get resourceStrings(): BehaviorSubject<any> {
        return this.languages;
    }


    public getLanguages(): void {
        this.http.get('http://wkst0835:8686/synergis.webapi/api/localization/availablelanguages').subscribe(
            response => {
                for (const key in response) {
                    if (response.hasOwnProperty(key)) {
                        this._languages.next(this._languages.getValue()
                        .concat({ value: key, viewValue: response[key] }));                     
                    }
                }
                
            }
        )
    }

    public getStrings(): void {
        // return this.http.get('http://wkst0835:8686/synergis.webapi/api/localization/availablelanguages').map(
        //     resp => { this.resourceStrings = resp; return resp;  }
        // )
    }
}