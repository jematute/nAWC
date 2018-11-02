import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { VaultModel, Global, LibModel } from 'projects/ui-api/src';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:max-line-length
  vaultIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAEmzAABJswEXCwzhAAAAB3RJTUUH4AcPDiwNfc1HfQAAAn5JREFUOMuN1F+IVGUYBvDfGWdHdrG/7lWFEAVeRJGxaLlTnYMQFA4EgRXVXWXqCHpTaNclRBC1s0QXQtAfIcKgifKimLMxSyZhFCRCmguKUpjErqi7OzPHC8+B42lm8L35ON973ud93pfne4IwjM7gVnRciy4C/aObnsV8gh5OllOwF3ACV7CYFvQDHXS/ErdjtpwyO9HplI6Vy7038FKhc7cPm/xdCQfQQKecdW63f0jCMJrALziEkVzRiiFM78HTeB8ywCthGG3HerwVx60DbjDCMNqAx7PvDPAipvM/NprtjMlz2I07cCEIgukdmyc/mvpm1s7Nk/9rUOqzH1CvVeE17A+C0p67H5i4b9Vt4y8uLy3uazTb0/3A8gxH8BvuL+SnKqNj6z5+c1ulMjr2TpIkD43fueZo9Pyr2xvN9lS9Vj0+iOHNSeJhfJcbOcS5VzatO14ZHWtjPgiCid/jQ9twGk/1Y5gBJkFgpKCxSynzHubxBBbOnv3nb4zh8jDAecziydwOj8CH3x5+No5ba5eXFqfOn5lb/973RzdiNb4YtsNOur9OIb+l1+vONJrtT/AVti5dvrQLz9Rr1X+HMSw20Gi21WvVH7EBy9iJcYT1WvVgKquBDG9JxflBJp1UNtnoR5IkKQVB0CvI6jqpQRCG0X+YjOPWH2EYfYlV+CnPdkgkWIN7sQkLxaIGohsEy17SaXyevfcyKngwDKObUql8nRtjkC/2CgZRwiNYUcZBvIzHMIdzuCv1t1/7OE03Lb6AP9P9r8XP+DTIucYxvIvPsBXVOG5tGeAwhzGDvdiIt+O49WhRNnPYj4XU204N2d1JvJ6+lhn8lSWuAmA3xid7y3JNAAAAAElFTkSuQmCC';
  // tslint:disable-next-line:max-line-length
  folderIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABIElEQVQ4y6WTIU/DQBiGn7vUIJZmW5AEEuzI6ieYqcD1JxTHP0DwO9DrT6hCbGqCBNllGNySOZKGNDUkbD1Er0dPrLuFV12+3vf0zXffK5RStFUthjEQA7fYWgKJDPOkXRQNoFoMr4AUGNOtFRDJMN8YgG7OAB83FUAgw3wjdSE9oRl9NwUQ+/kgBmYAeD7i8qG+Uq5Rny/HQPeeHlg9kNEz4vzOfFVvUyjXXYBY7OcDBSD6E8T1o5P/6uPJgD1T7d1Af+IEEGcXKA2Qptpt1dZPYY4GoMp353719WoBlgDsCrfu7621nRL4W80W+eDfbadJs4kZMMbzEb3RcUDtdiXDPGheIQIydoWvHFzoVY7MEHUwAh0UHMIUWGH6T5x/AZhbbQlxY2seAAAAAElFTkSuQmCC';
  // tslint:disable-next-line:max-line-length
  libraryIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABJklEQVQ4y6WTsU6DUBSGPwgJE2VxK7HumpQRp07uPAJubjyDD2Bit07KI3R1ZKKbNdHRpETYXKSTEw73wgVuozT+yQ0/53D+HM79j1HXNV3MlkRABCzoIwWSPCbpBo1GYLbkDFgDc37HCxDmMbtWQBZvAZdx+AL8PGZnysD6r+LAg4ndvrqyBuP0vo6AxybzeiOeFyvFHRvKPdym8PTe07225MBavH3q3LVFYeBpApF5YNoaskK0f+lpqYU1jJyf6PzhGe6uxK94Eygq9Y05FHBscbo8K1Rs2IU55s6qb9iU6ja6sKTD2jmUe5Xs8k1xsIPUhL41p444Q54VEEzho+oJJI0TtyMsrFk6j/GbGYTSnhxh5bAdolwMXy4KI5bJ7y3Tf9b5BwszX5v5ECq5AAAAAElFTkSuQmCC';
  // tslint:disable-next-line:max-line-length
  checkedLibIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABd0lEQVQ4y42TP0gCYRjGf5ogQipIm5IOIWhBjjaJQ6MgIrQ4XGDQppNLQxTcGObWVAotbTq66eQUGpRCFCh4W4s6iEHYcH/1wu6B45573u95+O793s+2XC4xIlhBAAQgwSraQHVUoGoUbWpAsEIIqAOHbMYLkB4VGGoBirkHeLGGCRAbFRjaFaH+nzkeAI9T+/QqHmy7t0sBeFArr+fy++BO524nSDO4akPzcyX31KE0TMPbl5l7nbIxHjAFCPY/um1CZyxv/yhgKiUc68r+jpnfd+HmWP6VgAfGU32NfT3A7ZQfI++MdW19F3YrZzZdwHNJpBcKkzsL0yiHybdEABzKhGl9kGa6UeX5lshWt7YSmurW2F5MJAdQNQb43foilafWzL5sBlc0QvJa9KuT2Ns0wo1yGF82w7w/wBWN4L+84OMkx7w/QD2FtJVR3nt6BNDMli9TviWS6tZwRSP8TKd8jyW1VLFZvc7FZklK9ut+g1SJDd+Lv/9NgbqxjyBFAAAAAElFTkSuQmCC';
  // tslint:disable-next-line:max-line-length
  openLibIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABcklEQVQ4y42TMUhCURSGPx/mc1ERCoQn2eSSmItggzg1OOXm+tradGh0CRwNcmsqR91siqBFHBwMSrExUNCWBEmH0OU13Ofz6ovyh8v93zn3/znv3HschmEgI1RGB3QgxToaQGWQoyIHHUuDUJkDoA4c8Tc6QGaQo28ZmOJXwMd2+AJigxx9xQzU/xMnguBVrU+fqcGxf23owN0y0zsXe+RmxT0qjGZw2YDH9zXfM6fZMAtvYzv3qUKYCNoMdOWXbtvQGoryj4O2VMq5GTnctfPbF7g6Eb8S9MJwujqjbBp4VLFk3hquYptVOLe5s+kc8u17nsZNYRyGxSTJ/PMUxXxhFkYzsWSu7glxRovTS5fIaHFc/ibuQHXkBCpyIzXPymzJXX4hLkazANZep60p5tvuSLNAqGznxWiWQrcGQKFbs0y2esqe8IXFe+kSkYeL9VswByMmVyJjMUla/ON7IqfKjm3H2R2ojna8z5os7qVL+R+5MX8bLgf20wAAAABJRU5ErkJggg==';
  // tslint:disable-next-line:max-line-length
  folderExpandedIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABR0lEQVQ4y62TMUvDUBSFv/vMoIiEtqBb6+YiNIPg0KFTFofiHxDqZH+J4K+wm2txbCkoKDh0SNFNhOLgIKYSSxGlyXNokiZg24Ce6eW+nHPfO+8e0VqTRNAp1IE6UCWNa6CpbLeZLEokEHQK20ALKLMYfeBQ2e4gFgjJDmCSDR5gKdsdqLDQisiSqyC5CqwVFwmYIQfx2/k6cA4gO6dI8WT6y+SD4K4Kn8+LhI7Fb+evIsPUfhfEmG37Y9CTtMnOEUy82Fgj5bY/JujV5raTzQOk1EA/nUWl6qydYYJhTu8/D6vFqTeGGZ8iFpBSAzZ2kb3L5W8wvEG/XACgksWs0KOHeK3CCUO/32ZjB18wuo9NVMBsNMePy7t7veRnM5pEByhjmMhWDVbWf2d/v6LfupGBfWW71v+MchgMKwwKGcJkpcL0lzj/AIiBfdrYw9a9AAAAAElFTkSuQmCC';

  getLibraryTree(): Observable<VaultModel[]> {
    return this.http.get(`${Global.API_URL}/api/Library/GetLibraryTree`)
      .pipe(map(result => {
        const vaults = result as VaultModel[];


        vaults.forEach(item => {
          item.icon = this.vaultIcon;
          this.setLibIcon(item);
        });
        return vaults;
      }));
  }

  setLibIcon(item) {
    let library: LibModel;
    if (item.libId) {
      library = item as LibModel;
      if (library.bIsFolder) {
        library.icon = this.folderIcon;
      } else
        if (item.properties.bChecking) {
          item.icon = this.checkedLibIcon;
        } else if (item.properties.bLaunch) {
          item.icon = this.openLibIcon;
        } else {
          item.icon = this.libraryIcon;
        }
    }
    if (item.children) {
      Array.from(item.children).forEach(i => this.setLibIcon(i));
    }
  }



}
