import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, takeLast, filter } from 'rxjs/operators';
import { Global } from '../classes/global';

@Injectable({
    providedIn: 'root'
})
export class LocalizationService {

    private _languages: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    private _resourceStrings: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    private _currentLanguage: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    private _lang: string;
    private languagesObj: Object;

    get languages(): BehaviorSubject<any> {
        return this._languages;
    }

    get currentLanguage(): BehaviorSubject<any> {
        return this._currentLanguage;
    }

    get language(): string {
        return this._lang;
    }

    constructor(private http: HttpClient) {
        this.currentLanguage.pipe(filter(lang => lang && lang.active)).subscribe(lang => {
            this._lang = lang.value;
            this.getStrings(lang.value).subscribe();
        });
    }

    resourceStrings: Map<string, string>;

    public getLanguages(): Observable<any> {
        if (!this.languagesObj) {
            return this.http.get(`${Global.API_URL}/api/localization/availablelanguages`).pipe(map(
                response => {
                    for (const key in response) {
                        if (response.hasOwnProperty(key)) {
                            const active = key === 'en-US';
                            if (active) {
                                this.currentLanguage.next({ value: key, viewValue: response[key], active: true });
                            }
                            this.languagesObj = response as Array<any>;
                            this._languages.next(this._languages.getValue()
                                .concat({ value: key, viewValue: response[key], active: active }));
                        }
                    }

                }
            ));
        }
        return of(this.languagesObj);
    }

    public getStrings(id: string): Observable<Object> {
        return this.http.get(`${Global.API_URL}/api/Localization/ResourceStrings/` + id).pipe(map(resp => {
            return this.resourceStrings = resp as Map<string, string>;
        }));
    }
}
