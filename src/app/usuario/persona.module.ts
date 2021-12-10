import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerPersonaComponent } from './ver-persona/ver-persona.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrearPersonaComponent } from './crear-persona/crear-persona.component';



@NgModule({
  declarations: [
    VerPersonaComponent,
    CrearPersonaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSlideToggleModule
    
  ],
  exports: [
    VerPersonaComponent,
    CrearPersonaComponent
  ]
})
export class PersonaModule { }
