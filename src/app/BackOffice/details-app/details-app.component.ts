import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from 'src/app/entities/Path';
import { application } from 'src/app/entities/application';
import { ApplicationService } from 'src/app/services/application.service';
import { PathService } from 'src/app/services/path.service';

@Component({
  selector: 'app-details-app',
  templateUrl: './details-app.component.html',
  styleUrls: ['./details-app.component.css']
})
export class DetailsAppComponent  implements OnInit{
id !:number
app !:application;

constructor(private _service: ApplicationService,private srv: PathService,
  private router: ActivatedRoute,   private route: Router) { }
ngOnInit(): void {
 this.router.params.subscribe(params=>{
this.id=+params['idApp'];
this._service.idApp=this.id;
this.getAppData();
this.reloadPathsList(this.currentPageIndex, this.pageSize, true);
 })
 
}

private getAppData(): void {
  this._service.findById(this.id).subscribe(
    (data) => {
      this.app = data;
      console.log("App :");
      console.log(this.app);
     // this.listPaths();
    },
    (error) => {
      console.error('Error while fetching application data:', error);
    
    }
  );
}
redirectToUpdate(){
  this.route.navigate(['admin/updateApp']);
} 
deletee(path:Path)  {
  this._service.deletee(path.id).subscribe(
    () => {
      // Do any additional handling of the response here
      window.location.reload();
      this.route.navigate(['admin/DetailsApp']);
    },
    );
}
listPaths(){
  this.srv.findByApplication_Id(this.id).subscribe((data)=>{
    console.log(data);
    this.app.paths=data;
    },
  (error) => {
    console.error('Error while fetching paths:', error);
  })
}
goBack(): void {
  this.route.navigate(['admin/listapp']);
}
goBackTest(): void {
  console.log(this.app.paths);
  
  this.route.navigate(['admin/Setup/'+this.id]);
}
//PAgination
pageSize: number = 1;
currentPageIndex = 0;
pages: any;
total_pages!: number;
selectedItem: any;




generateNumberList(num: number): number[] {
  const numberList: number[] = [];
  for (let i = 1; i <= num; i++) {
    numberList.push(i);
  }
  return numberList;
}



onSelectedItemChange(newSelectedItem: any) {


  this.pageSize = newSelectedItem;
  this.reloadPathsList(this.currentPageIndex, this.pageSize, true);

}

setCurrentPage(index: number): void {
  this.currentPageIndex = index;
  this.reloadPathsList(this.currentPageIndex, this.pageSize, false);

}
// reload the list of devices
reloadPathsList(offset: number, pageSize: number, editPages: boolean) {
  if (!editPages) {
   
    this.srv
      .findByApplication_IdWithPagination(this.id,offset, pageSize)
      .subscribe((res: any) => {
        console.log(res);
        console;
        this.app.paths = res.content;
      });
  } else {
   

    this.srv
      .findByApplication_IdWithPagination(this.id,this.currentPageIndex, this.pageSize)
      .subscribe((res: any) => {
        console.log(res);
        this.app.paths = res.content;
        this.total_pages = res.totalPages;
        this.pages = this.generateNumberList(this.total_pages);
      });
  }
}


}
