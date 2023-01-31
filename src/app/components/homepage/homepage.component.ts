import { Component, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { JobserviceService } from 'src/app/service/jobservice.service';
import { HttpClient } from '@angular/common/http';
export interface jobs {
  name: string;
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  @Input() newJobcComponent: any;
  constructor(
    public dialog: MatDialog,
    private jobService: JobserviceService,
    private http: HttpClient
  ) {
    this.newJob = this.jobService.newJobDetails;
    this.http.get(this.url + 'newJobs').subscribe((res) => {
      this.newJob = res;
      console.log(this.newJob);
    });
  }

  url = 'http://localhost:3000/';

  newJob: any = [];
  ngOnInit(): void {
    // this.newJob = this.jobService.newJobDetails;
    this.jobService.getUsers().subscribe((response: any) => {
      this.newJob = response;
    });
    this.newJob = this.jobService.newJobDetails;
  }

  new: any = 'new';

  onDialog() {
    console.log('clicked');
    this.dialog.open(DialogComponent);
    // this.newJob = this.jobService.newJobDetails;

    // console.log(this.newJobcComponent);
    // this.newJob = this.jobService.newJobDetails;
    // console.log(this.newJob);
  }

  deleteJob(id: any) {
    console.log(id);
    this.jobService.deleteJob(id);
    console.log('clicked');

    this.newJob = this.jobService.newJobDetails;
  }

  editJob(job: any) {
    this.jobService.editJob(job);
  }
  clone(job: any) {
    this.jobService.clone(job);
    this.newJob = this.jobService.newJobDetails;
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  jobApplications: jobs[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our job
    if (value) {
      this.jobApplications.push({ name: value });
      console.log(this.jobApplications);
    }

    // Clear the input value
    event.chipInput!.clear();

    if (value) {
      this.http.get(this.url + 'newJobs?q=' + value).subscribe((res) => {
        console.log(res);
        this.newJob = res;
      });
    }
  }

  remove(job: jobs): void {
    const index = this.jobApplications.indexOf(job);

    if (index >= 0) {
      this.jobApplications.splice(index, 1);
      console.log(this.jobApplications);
    }
    this.newJob = this.jobService.newJobDetails;
  }

  edit(job: jobs, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove job if it no longer has a name
    if (!value) {
      this.remove(job);
      return;
    }

    // Edit existing job
    const index = this.jobApplications.indexOf(job);
    if (index >= 0) {
      this.jobApplications[index].name = value;
    }
  }
}
