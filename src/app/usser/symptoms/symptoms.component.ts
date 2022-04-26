import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Symptoms, SymptomsResponse } from 'src/app/Models/Symptoms';
import { PawwowService } from 'src/app/services/pawwow.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditSymptomsComponent } from '../edit-symptoms/edit-symptoms.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css']
})

export class SymptomsComponent implements AfterViewInit,OnInit {

  displayedColumns    : string[] = ['codigo','nombre','opciones'];
  dataSource: MatTableDataSource<Symptoms>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;


  // length!:number;
  // pageSizeOptions: number[] = [10, 20, 30];
  // pageEvent!:PageEvent;

  symptomsResponse    : any;
  symptoms            : Symptoms [] = [];

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;


  constructor(public pawwowService: PawwowService,
              public dialog: MatDialog,
              private router : Router) {
    this.dataSource = new MatTableDataSource(this.symptoms);
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   ngOnInit(): void {
    this.getSymptomList();
   }

   getSymptomList() {
    this.pawwowService.getSymptoms().subscribe((data : any)=>{
      if(data.statusCode === 1000){
        this.symptomsResponse = data;
        this.getItemSymptoms();
      }else{
        console.log('Inautorizado');
        this.router.navigate(['/login']);
      }
    },
    (err : HttpErrorResponse)=>{
      console.log(err);
      this.router.navigate(['/']);
    });
  }


  public getItemSymptoms(){
     let symptoms = this.symptomsResponse.result;
     symptoms.forEach(element => {
      this.symptoms.push(element);
     });
     console.log(this.symptoms);
     console.log(this.symptoms.length);
     this.iterator();
     //asignarle solo los 10 primeros elementos del arreglo
     //this.dataSource = new MatTableDataSource(this.symptoms);
   }


   public addSymptoms(){
     console.log('addSymptoms');
     let message = "Agregar Síntoma";
     this.pawwowService.addSymptomsPopup(message);
     //this.dialog.open(AddSymptomsComponent);
     //this.dialog.afterAllClosed();
   }

   public onEdit(row: any){
    console.log('onEdit'+row.codigo);
    console.log('onEdit'+row.nombre);
    console.log('onEdit'+row.descripcion);
    this.dialog.open(EditSymptomsComponent, { data:{datakey: row}});
   }

   public onDelete(id: any){
    this.pawwowService.deleteSymptom(id).subscribe((data : any)=>{
      console.log(data);
      //location.reload();
      const index = this.dataSource.data.indexOf(id);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    },
    (err : HttpErrorResponse)=>{
      console.log(err);
      console.log(err.error.statusCode);
      let message = err.error.message;
      //let message = err.error.statusCode;
      this.pawwowService.errorPopup(message);
    });
     //location.reload();
   }



   public handlePage(e: any) {
     console.log(e);
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }


  private iterator() {
    console.log('iterator')
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.symptoms.slice(start, end);
    this.dataSource = new MatTableDataSource(part);
    //this.dataSource = part;
  }


}
