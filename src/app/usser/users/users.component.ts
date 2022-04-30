import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PawwowService } from 'src/app/services/pawwow.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { AddUsersComponent } from '../add-users/add-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns    : string[] = ['ID','nombres','usuario','rol','opciones'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;


  // length!:number;
  // pageSizeOptions: number[] = [10, 20, 30];
  // pageEvent!:PageEvent;

  userResponse    : any;
  user            : User [] = [];

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;


  constructor(public pawwowService: PawwowService,
              public dialog: MatDialog,
              private router : Router) {
    this.dataSource = new MatTableDataSource(this.user);
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
    this.getUsersList();
   }

   getUsersList() {
    this.pawwowService.getUsers().subscribe((data : any)=>{
      if(data.statusCode === 1000){
        this.userResponse = data;
        this.user = []
        this.getItemuser();
      }else{
        this.router.navigate(['/login']);
      }
    },
    (err : HttpErrorResponse)=>{
      console.log(err);
      this.router.navigate(['/']);
    });
  }


  public getItemuser(){
     let user = this.userResponse.result;
     user.forEach(element => {
      this.user.push(element);
     });
     console.log(this.user);
     console.log(this.user.length);
     this.iterator();
     //asignarle solo los 10 primeros elementos del arreglo
     //this.dataSource = new MatTableDataSource(this.user);
   }


   public adduser(){

     const modalRef = this.dialog.open(AddUsersComponent, {
       data: null
     });

     modalRef.componentInstance.title = "Agregar usuario"
     modalRef.beforeClosed().subscribe(() => {
       this.getUsersList()
     })
    }

   public onEdit(row: User){

    const modalRef = this.dialog.open(AddUsersComponent, { 
      data: row
    });

    modalRef.componentInstance.title = "Editar usuario"
    modalRef.beforeClosed().subscribe(() => {
      this.getUsersList()
    })
   }

   public onDelete(id: any){
    this.pawwowService.deleteUser(id).subscribe((data : any)=>{
      this.getUsersList()
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
    const part = this.user.slice(start, end);
    this.dataSource = new MatTableDataSource(part);
    //this.dataSource = part;
  }

}
