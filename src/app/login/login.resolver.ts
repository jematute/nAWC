import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';

import { delay, switchMap } from 'rxjs/operators';
import { LocalizationService } from '../localization/localization.service';

@Injectable()
export class LoginResolver implements Resolve<Observable<Object>> {
  constructor(public locale: LocalizationService) { }

  resolve() {
    return this.locale.getLanguages().pipe(switchMap(resp => {
      return this.locale.getStrings(this.locale.language);
    }));
  }
}