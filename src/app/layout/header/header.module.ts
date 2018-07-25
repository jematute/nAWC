import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialModule } from '../../material/material.module';
import { CustomDirectivesModule } from '../../custom-directives/custom-directives.module';
import { HelpMenuComponent } from './help-menu/help-menu.component';

@NgModule({
  imports: [
    CommonModule, MaterialModule, CustomDirectivesModule
  ],
  declarations: [ HeaderComponent, HelpMenuComponent ],
  exports: [ HeaderComponent ] 
})
export class HeaderModule { }
