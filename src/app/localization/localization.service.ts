import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject } from 'rxjs';
import {  map, takeLast, filter } from 'rxjs/operators';

@Injectable()
export class LocalizationService {
    
    private _languages: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    private _resourceStrings: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    private _currentLanguage: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    get languages(): BehaviorSubject<any> {
        return this._languages;
    }

    get currentLanguage(): BehaviorSubject<any> {
        return this._currentLanguage;
    }

    constructor(private http: HttpClient) {
        this.currentLanguage.pipe(filter(lang => lang && lang.active)).subscribe(lang => {
            this.getStrings(lang.value).subscribe();
        });
    }

    resourceStrings: Map<string, string>;

    public getLanguages(): void {
        this.http.get('http://wkst0835:8686/synergis.webapi/api/localization/availablelanguages').subscribe(
            response => {
                for (const key in response) {
                    if (response.hasOwnProperty(key)) {
                        let active = key === "en-US";
                        if (active) {
                            this.currentLanguage.next({ value: key, viewValue: response[key], active: true });
                        }

                        this._languages.next(this._languages.getValue()
                        .concat({ value: key, viewValue: response[key], active: active }));                     
                    }
                }
                
            }
        )
    }

    public getStrings(id: string): Observable<Object> {
        return this.http.get('http://wkst0835:8686/synergis.webapi/api/Localization/ResourceStrings/' + id).pipe(map(resp => {
            return this.resourceStrings = resp as Map<string, string>;
        }));
    }
}