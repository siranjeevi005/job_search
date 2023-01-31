import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { CloneComponent } from '../components/clone/clone.component';
import { EditComponent } from '../components/edit/edit.component';

@Injectable({
  providedIn: 'root',
})
export class JobserviceService implements OnInit {
  constructor(public dialog: MatDialog, private http: HttpClient) {
    this.http.get(this.url + 'newJobs').subscribe((res) => {
      this.newJobDetails = res;
      console.log(this.newJobDetails);
    });
  }

  emitter = new EventEmitter<any>();
  ngOnInit(): void {
    this.http.get(this.url + 'newJobs').subscribe((res) => {
      this.newJobDetails = res;
    });
  }

  editableForm: any;

  public getUsers(): Observable<any> {
    return this.http.get<any>(this.url + 'newJobs');
  }
  url = 'http://localhost:3000/';

  newJobDetails: any = [];
  onSubmit(reactiveFormsValue: any) {
    console.log(reactiveFormsValue);

    console.log(this.newJobDetails);
    this.http
      .post(this.url + 'newJobs', reactiveFormsValue)
      .subscribe((res) => this.newJobDetails.push(res));
  }
  deleteJob(id: any) {
    console.log('clicked');
    let currJob: any;
    this.newJobDetails.forEach((job: any) => {
      if (id == job.id) {
        currJob = job;
      }
    });
    console.log(currJob);
    this.http
      .delete('http://localhost:3000/newJobs/' + id, currJob)
      .subscribe((res) => {
        this.ngOnInit();
      });
    this.newJobDetails = this.newJobDetails.filter((job: any) => id != job.id);
  }

  editJob(job: any) {
    console.log(job.id);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: job.id,
      company: job.company,
      logo: job.logo,
      new: job.new,
      featured: job.featured,
      position: job.position,
      role: job.role,
      level: job.level,
      postedAt: job.postedAt,
      contract: job.contract,
      location: job.location,
      languages: job.languages,
      tools: job.tools,
    };
    this.dialog.open(EditComponent, dialogConfig);
  }
  counter: any = 100;

  clone(job: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: job.id,
      company: job.company,
      logo: job.logo,
      new: job.new,
      featured: job.featured,
      position: job.position,
      role: job.role,
      level: job.level,
      postedAt: job.postedAt,
      contract: job.contract,
      location: job.location,
      languages: job.languages,
      tools: job.tools,
    };
    this.dialog.open(CloneComponent, dialogConfig);
  }

  onUpdate(reactiveFormsValue: any, id: any) {
    this.http
      .patch(this.url + 'newJobs/' + id, reactiveFormsValue)
      .subscribe((res) => console.log(res));
    console.log(reactiveFormsValue);
  }
}
