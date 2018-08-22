import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VaultModel } from '../classes/vaultmodel';
import { HttpClient } from '@angular/common/http';
import { Global } from '../classes/global';
import { map } from 'rxjs/operators';
import { LibModel } from '../classes/libmodel';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  vaultIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAEmzAABJswEXCwzhAAAAB3RJTUUH4AcPDiwNfc1HfQAAAn5JREFUOMuN1F+IVGUYBvDfGWdHdrG/7lWFEAVeRJGxaLlTnYMQFA4EgRXVXWXqCHpTaNclRBC1s0QXQtAfIcKgifKimLMxSyZhFCRCmguKUpjErqi7OzPHC8+B42lm8L35ON973ud93pfne4IwjM7gVnRciy4C/aObnsV8gh5OllOwF3ACV7CYFvQDHXS/ErdjtpwyO9HplI6Vy7038FKhc7cPm/xdCQfQQKecdW63f0jCMJrALziEkVzRiiFM78HTeB8ywCthGG3HerwVx60DbjDCMNqAx7PvDPAipvM/NprtjMlz2I07cCEIgukdmyc/mvpm1s7Nk/9rUOqzH1CvVeE17A+C0p67H5i4b9Vt4y8uLy3uazTb0/3A8gxH8BvuL+SnKqNj6z5+c1ulMjr2TpIkD43fueZo9Pyr2xvN9lS9Vj0+iOHNSeJhfJcbOcS5VzatO14ZHWtjPgiCid/jQ9twGk/1Y5gBJkFgpKCxSynzHubxBBbOnv3nb4zh8jDAecziydwOj8CH3x5+No5ba5eXFqfOn5lb/973RzdiNb4YtsNOur9OIb+l1+vONJrtT/AVti5dvrQLz9Rr1X+HMSw20Gi21WvVH7EBy9iJcYT1WvVgKquBDG9JxflBJp1UNtnoR5IkKQVB0CvI6jqpQRCG0X+YjOPWH2EYfYlV+CnPdkgkWIN7sQkLxaIGohsEy17SaXyevfcyKngwDKObUql8nRtjkC/2CgZRwiNYUcZBvIzHMIdzuCv1t1/7OE03Lb6AP9P9r8XP+DTIucYxvIvPsBXVOG5tGeAwhzGDvdiIt+O49WhRNnPYj4XU204N2d1JvJ6+lhn8lSWuAmA3xid7y3JNAAAAAElFTkSuQmCC";
  folderIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AcPEzYMrhm9EwAAAYpJREFUOMvtlDFrFGEQhp/5bjccqLE0IC4xBJuIRBBBOOJ8dnaC/gUVkkC2sFL8A4KyrX/BKkUQRch+paBECEIQm/DJiQgnh5LLhWNvLNyLFqbQXJmnnnnemSlGVP0x4Ay/+RZC+VXVE0JJVhgAMZf9gqywJjAFnAYuAi+BjzEXRNVvAAOgAlxdcCqEsvtHCFlh88At4CYwC3SA50Af6MZc7gMkwPEQynOjxis37j4cnJhez4r1VeByPQXAB+AtsARsxFy6ddBkutN+5xdau+bStQSwe+CeFfYEuN0WEoM3YuwAizGXyAFkhRFz+X72UTeRaq9nLl1zAJfA6mnmMZqfVqQVc3kcc4mjG/6N0V2riZOfOxeWC+BHAkw8vbow1+xsbie9L9enXj94MaPe7XetXmNG/YFSGQ6s3XnfrtLJO9gwFVXfAzYR9yvOhhX/ijQaYIINz6PqtxgTqn7LAU7Vp2OQpYBzjJkj4ZHwf4UhlIPDikaOBOir+lf1gz0MDaCfAC1gekwbb/8EYYWIsaD+WQ0AAAAASUVORK5CYII=";
  libraryIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAEmzAABJswEXCwzhAAAAB3RJTUUH4AcPDiUqCQVJXwAAAiZJREFUOMvNlE9IVFEUxn/3znszmmUq2hRSMrXJWgXt7M99tVKScNOqba3DKCWoRYvaFcGUi3QvRFDMwghxbjCEIv1zkS6KwCgStZhJM+b53mnhe/EYWpSrPrjcc7/L+Tjn3HOPIgFjvGPACOAn6HVQR6ydqPAHKGO8OuB45HQVuA6UAKwt+sZ4j4CXwDTwTSneitAFCLhPHeA58AxYAzqBqrXFZAQ+0AVsBQ6IYIB7QBr8BxqoF5EBa4tXgElA10Spgbtnr90eBG4Ac9YWL1tbvABktIhIz7mLB++PvxoAlNZa1eZZXvyy+nN1ZaqpbWejhGE4NDbZP/RkqhfAASTluC1hGOQAPr2bLecLpRmgzUlnhkdvXpJ1vxoAh926+jQgIpJTwvdYgI2CbKC1vaMBOA+0Nu/Y9RrUnWTR410i20nkmQFYW6lUgT5gS+XrogvQsL2lDuivLC+WUUqnHHdUab0Uv/1sb9+ZzNjHatYY77Ex3tGa3nhojHc6sruM8V4k7qoaoLy8IN270wtsAhpAa81msXnP/1sgXyjpfKG0/68FDp08VT82X80m+G3AeHyQMJR8odSDUiAiI3Zm7/DEm9yGgAjN2fbGz+/nTtSIL/0eCOt+AHQGvh8CSBCmwzDIxM0w15nb40b2PzeSA5Dt2Jee/TDvAynANcZz44EScY4xngO4gDbGU0GQUhAoZYx3C+iORH9EfyJZ3JhLRWsZaIr+0fQvhEzRnkadJGEAAAAASUVORK5CYII=";

  getLibraryTree(): Observable<VaultModel[]> {
    return this.http.get(`${Global.API_URL}/api/Library/GetLibraryTree`)
      .pipe(map(result => {
        let vaults = result as VaultModel[];


        vaults.forEach(item => {
          item.icon = this.vaultIcon;
          this.setLibIcon(item)
        });
        return vaults;
      }));
  }

  setLibIcon(item) {
    let library: LibModel;
    if (item.libId) {
      library = item as LibModel;
      if (library.bIsFolder)
        library.icon = this.folderIcon;
      else
        library.icon = this.libraryIcon;
    }
    if (item.children) {
      Array.from(item.children).forEach(i => this.setLibIcon(i));
    }
  }



}
