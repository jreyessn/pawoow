import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Questions } from 'src/app/Models/Questions';
import { PawwowService } from 'src/app/services/pawwow.service';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { AddQuestionsComponentComponent } from '../add-questions-component/add-questions-component.component';
import { EditQuestionsComponentComponent } from '../edit-questions-component/edit-questions-component.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements AfterViewInit,OnInit {

  displayedColumns    : string[] = ['codigo','pregunta','opciones'];
  //dataSource: MatTableDataSource<questions>;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  questionsResponse    : any;
  questions            : Questions[] = [];
  allQuestions         : MatTableDataSource<Questions> = new MatTableDataSource();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  constructor(public pawwowService: PawwowService,
              public dialog: MatDialog,
              private router : Router) {
    this.dataSource = new MatTableDataSource(this.questions);
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allQuestions.filter = filterValue.trim().toLowerCase();
    this.questions           = this.allQuestions.filteredData
    this.currentPage         = 0
    this.iterator()
  }

  ngOnInit(): void {
    this.getAllItemQuestions();
  }

  public getAllItemQuestions(){
    this.pawwowService.getQuestions().subscribe((data : any)=>{
      if(data.statusCode === 1000){
        this.questionsResponse = data;
        this.questions = []
        this.getItemQuestions();
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


  public getItemQuestions(){
    let questions = this.questionsResponse.result;
    questions.forEach(element => {
     this.questions.push(element);
    });
    
    this.allQuestions = new MatTableDataSource(questions)
    //this.dataSource = new MatTableDataSource(this.questions);
    this.iterator();
  }

  public addQuestions(){
    console.log('addQuestions');
    //this.dialog.open(AddQuestionComponent);
    let message = "Agregar Pregunta";
    const modalRef = this.pawwowService.addQuestionsPopup(message);
  
    modalRef.beforeClosed().subscribe(() => {
      this.getAllItemQuestions()
    })
  }

  public onEdit(row: any){

    const modalRef = this.dialog.open(EditQuestionsComponentComponent, { data:{datakey: row}});

    modalRef.beforeClosed().subscribe(() => {
      this.getAllItemQuestions()
    })
  }
  public onDelete(row: any){
    console.log(row);
    let id = row.codigo;
   this.pawwowService.deleteQuestion(id).subscribe((data : any)=>{
    console.log(data);
      const index = this.dataSource.data.indexOf(id);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();

  },
  (err : HttpErrorResponse)=>{
    console.log(err);
    console.log(err.error.message);
    let message = err.error.message;
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
  const part = this.questions.slice(start, end);
  this.dataSource = new MatTableDataSource(part);
  //this.dataSource = part;
}

}
