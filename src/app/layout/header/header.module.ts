import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialModule } from '../../material/material.module';
import { CustomDirectivesModule } from '../../custom-directives/custom-directives.module';
import { HelpMenuComponent } from './help-menu/help-menu.component';
import { UpdateIconComponent } from './update-icon/update-icon.component';

@NgModule({
  imports: [
    CommonModule, MaterialModule, CustomDirectivesModule
  ],
  declarations: [ HeaderComponent, HelpMenuComponent, UpdateIconComponent ],
  exports: [ HeaderComponent ] 
})
export class HeaderModule { }
