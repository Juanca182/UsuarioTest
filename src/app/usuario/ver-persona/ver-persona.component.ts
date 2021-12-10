import { AfterViewInit, Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { Estado, Persona } from 'src/app/interfaces/persona.interface';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PERSONAS } from '../material/data/personas';
import { MatDialog } from '@angular/material/dialog';
import { CrearPersonaComponent } from '../crear-persona/crear-persona.component';

@Component({
  selector: 'app-ver-persona',
  templateUrl: './ver-persona.component.html',
  styles: [
  ]
})
export class VerPersonaComponent  implements OnInit,AfterViewInit {

  

  displayedColumns: string[] = ['usuario', 'email', 'nombre', 'apellido', 'estado', 'Actions'];
  dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator ;
  @ViewChild(MatSort)
  sort!: MatSort;

  users: Persona[] = [];

  constructor(public dialog: MatDialog, 
              private changeDetectorRefs: ChangeDetectorRef) {
   
    this.users = PERSONAS;
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.changeDetectorRefs.detectChanges();
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(field: string, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const trimmed = filterValue.trim().toLowerCase();

    this.dataSource.filter = trimmed;

    this.dataSource.filterPredicate = ( data: any, filter: string ) => {
      const dataField = String(data[field]).toLowerCase();
      return dataField.includes(filter); 
    };


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(person: Persona | any = null, isEdit: boolean = false) {
    const dialogRef = this.dialog.open(CrearPersonaComponent, {width:'90%', data: { 
            push: (element: Persona) => {
              this.users.push(element);
              this.dataSource.paginator = this.paginator;
            },
            edit: (id: number, element: Persona) => {
              const indice = this.users.findIndex(user => user.id === id);
              this.users[indice] = element;
              this.dataSource.paginator?._changePageSize(5);
            },
            person, 
            isEdit
    }});

  }

}
