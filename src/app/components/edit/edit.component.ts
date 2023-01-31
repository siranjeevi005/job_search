import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobserviceService } from 'src/app/service/jobservice.service';
import { DialogComponent } from '../dialog/dialog.component';

interface jobLevel {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  constructor(
    private jobservice: JobserviceService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
  }

  job = new EventEmitter<any>();

  reactiveForms: any;
  tempReactiveForms: FormGroup | undefined;
  ngOnInit(): void {
    // this.flag = 1;
    this.reactiveForms = new FormGroup({
      company: new FormControl(null, Validators.required),
      logo: new FormControl(null, Validators.required),
      new: new FormControl(null, Validators.required),
      featured: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      level: new FormControl(null, Validators.required),
      postedAt: new FormControl(null, Validators.required),
      contract: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      languages: new FormControl(null, Validators.required),
      tools: new FormControl(null, Validators.required),
    });

    if (this.data) {
      this.reactiveForms.setValue({
        company: this.data.company,
        logo: this.data.logo,
        new: this.data.new,
        featured: this.data.featured,
        position: this.data.position,
        role: this.data.role,
        level: this.data.level,
        postedAt: this.data.postedAt,
        contract: this.data.contract,
        location: this.data.location,
        languages: this.data.languages,
        tools: this.data.tools,
      });
    }
  }
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  selectedValue: string | undefined;

  jobLevelType: jobLevel[] = [
    { value: 'Junior', viewValue: 'Junior' },
    { value: 'Midweight', viewValue: 'Midweight' },
    { value: 'Senior', viewValue: 'Senior' },
  ];

  toppings = new FormControl('');

  toppingList: string[] = ['React', 'Vue', 'Angular', 'node', 'Ruby'];

  languages = new FormControl('');

  languagesList: string[] = [
    'Html',
    'Css',
    'Javascript',
    'Python',
    'C#',
    'Java',
  ];

  newJobs: any = [];
  onSumbit() {
    this.jobservice.onUpdate(this.reactiveForms.value, this.data.id);
    console.log(this.reactiveForms);
  }
}
