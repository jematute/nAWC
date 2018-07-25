import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialModule } from '../../material/material.module';
import { CustomDirectivesModule } from '../../custom-directives/custom-directives.module';
import { HelpMenuComponent } from './help-menu/help-menu.component';
import { UpdateIconComponent } from './update-icon/update-icon.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
  imports: [
    CommonModule, MaterialModule, CustomDirectivesModule
  ],
  declarations: [ HeaderComponent, HelpMenuComponent, UpdateIconComponent, UserMenuComponent ],
  exports: [ HeaderComponent ] 
})
export class HeaderModule { }
