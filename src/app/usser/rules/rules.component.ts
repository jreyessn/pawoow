import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Rule } from 'src/app/Models/Rules';
import { PawwowService } from 'src/app/services/pawwow.service';
import { EditRulesComponent } from '../edit-rules/edit-rules.component';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements AfterViewInit,OnInit {

  displayedColumns    : string[] = ['codigo','pregunta','SI', 'NO', 'Enf. SI', 'Enf. NO','opciones'];
  dataSource: MatTableDataSource<Rule>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;


  rulesResponse    : any;
  rules            : Rule [] = [];
  CodeSymptom      : any;

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  constructor(public pawwowService: PawwowService,
              public dialog: MatDialog,
              private router : Router) {
              this.dataSource = new MatTableDataSource(this.rules);
    }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.getRulesList(filterValue);
    this.CodeSymptom=filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getRulesList();
  }


  getRulesList(value?: any) {
    this.pawwowService.getRules(value).subscribe((data : any)=>{
      if(data.statusCode === 1000){
        this.rulesResponse = data;
        this.getItemRules();
      }else{
        console.log('Inautorizado');
        this.router.navigate(['/login']);
      }
    },
    (err : HttpErrorResponse)=>{
      console.log(err);
      //this.router.navigate(['/']);
    });
  }

  public getItemRules(){
    let rules = this.rulesResponse.result;
    rules.forEach(element => {
     this.rules.push(element);
    });
    console.log(this.rules);
    console.log(this.rules.length);
    this.iterator();
    //asignarle solo los 10 primeros elementos del arreglo
    //this.dataSource = new MatTableDataSource(this.symptoms);
  }

  public addRules(){
    console.log('addRules');
    let message = "Agregar Reglas";
    this.pawwowService.addRulesPopup(this.CodeSymptom);
    //this.dialog.open(AddSymptomsComponent);
    //this.dialog.afterAllClosed();
  }

  public onEdit(row: any){
    console.log('Not supported')
    console.log(row)
    // console.log('onEdit'+row.codigo);
    // console.log('onEdit'+row.nombre);
    // console.log('onEdit'+row.descripcion);
    // this.dialog.open(EditRulesComponent, { data:{datakey: row}});
   }

   public onDelete(value: any){
     console.log('Not supported')
     console.log(value);
     //value
     //value
    // this.pawwowService.deleteRule(ids, idd).subscribe((data : any)=>{
    //   console.log(data);
    //   location.reload();
    // const index = this.dataSource.data.indexOf(id);
    // this.dataSource.data.splice(index, 1);
    // this.dataSource._updateChangeSubscription();
    // },
    // (err : HttpErrorResponse)=>{
    //   console.log(err.error.statusCode);
    //   let message = err.error.statusCode;
    //   this.pawwowService.errorPopup(message);
    // });
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
    const part = this.rules.slice(start, end);
    this.dataSource = new MatTableDataSource(part);
    //this.dataSource = part;
  }


}
