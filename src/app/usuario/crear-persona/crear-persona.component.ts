import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Estado } from '../../interfaces/persona.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styles: [`
    .formulario{
      display: flex;
      flex-direction: row; 
      flex-wrap: wrap;     
    }

    .formulario-item {
      display: flex;
      flex-direction: column; 
    }
  `
  ]
})
export class CrearPersonaComponent implements OnInit  {

  estados: Estado[] = [Estado.activo, Estado.inactivo];
  personaForm!: FormGroup;
  isChecked = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                      private formBuilder: FormBuilder,
                      private dialogRef: MatDialogRef<CrearPersonaComponent> ) {  }

   ngOnInit() {
     this.initForms();
  }

   agregarPersona() {
     if (this.personaForm.invalid) {
       return null;
    }
    
    if (this.data.person ) {
      this.data.edit( this.data.person.id , {...this.data.person, ...this.personaForm.getRawValue()});
    }
    else {
      this.data.push({...this.personaForm.getRawValue(), id: Date.now()});
    }
    this.close();
    return null;
   }

   close(result = null) {
    this.dialogRef.close(result);
  }

  initForms() {
    const { isEdit, person } = this.data;
    this.personaForm = this.formBuilder.group({
      usuario: [{ value: null, disabled: !isEdit}, [Validators.required, Validators.maxLength(100)]],
      email: [{ value: null, disabled: !isEdit}, [Validators.required, Validators.email]],
      nombre: [{ value: null, disabled: !isEdit}, [Validators.required, Validators.maxLength(20)]],
      apellido: [{ value: null, disabled: !isEdit}, [Validators.required, Validators.maxLength(20)]],
      estado: [{ value: null, disabled: !isEdit}, [Validators.required]] 
    });

    if (person) {
      this.personaForm.patchValue(this.data.person);
      this.isChecked = this.data.person.estado === Estado.activo;
    }
    

  }

  


}
