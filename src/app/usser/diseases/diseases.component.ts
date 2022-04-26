import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Diseases } from 'src/app/Models/Diseases';
import { PawwowService } from 'src/app/services/pawwow.service';
import { AddDiseasesComponent } from '../add-diseases/add-diseases.component';
import { EditDiseasesComponent } from '../edit-diseases/edit-diseases.component';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css']
})
export class DiseasesComponent implements AfterViewInit,OnInit {

  displayedColumns    : string[] = ['codigo','enfermedad','opciones'];
  dataSource: MatTableDataSource<Diseases>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  diseasesResponse    : any;
  diseases            : Diseases [] = [];

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  constructor(public pawwowService: PawwowService,
              public dialog: MatDialog,
              private router : Router) {
    this.dataSource = new MatTableDataSource(this.diseases);
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
    this.pawwowService.getDiseases().subscribe((data : any)=>{
      if(data.statusCode === 1000){
        this.diseasesResponse = data;
        this.getItemDiseases();
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

  public getItemDiseases(){
    let diseases = this.diseasesResponse.result;
    diseases.forEach(element => {
     this.diseases.push(element);
    });
    console.log(this.diseases);
    this.dataSource = new MatTableDataSource(this.diseases);
    this.iterator();
  }

  public addDiseases(){
    console.log('addDisease');
    //this.dialog.open(AddDiseasesComponent);
    let message = "Agregar Enfermedad";
    this.pawwowService.addDiseasesPopup(message);
  }

  public onEdit(row: any){
    console.log('onEdit'+row.codigo);
    console.log('onEdit'+row.nombre);
    console.log('onEdit'+row.descripcion);
    this.dialog.open(EditDiseasesComponent, { data:{datakey: row}});
  }
  public onDelete(id: any){
   this.pawwowService.deleteDisease(id).subscribe((data : any)=>{
    console.log(data);
    //location.reload();
    const index = this.dataSource.data.indexOf(id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  },
  (err : HttpErrorResponse)=>{
    console.log(err);
    let message = err.error.statusCode;
    this.pawwowService.errorPopup(message);
  });
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
  const part = this.diseases.slice(start, end);
  this.dataSource = new MatTableDataSource(part);
  //this.dataSource = part;
}

}
