import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { CustomDirectivesModule } from '../../custom-directives/custom-directives.module';
import { HelpMenuComponent } from './help-menu/help-menu.component';
import { UpdateIconComponent } from './update-icon/update-icon.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MaterialModule } from 'projects/ui-api/src';

@NgModule({
  imports: [
    CommonModule, MaterialModule, CustomDirectivesModule
  ],
  declarations: [ HeaderComponent, HelpMenuComponent, UpdateIconComponent, UserMenuComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
