import { Component, Input, OnInit } from '@angular/core';
import { CreatedBy } from '../../../Models/Data';

@Component({
  selector: 'app-badge-tracking-record',
  templateUrl: './badge-tracking-record.component.html',
  styleUrls: ['./badge-tracking-record.component.css']
})
export class BadgeTrackingRecordComponent implements OnInit {

  @Input() createdBy!: CreatedBy;

  constructor() { }

  ngOnInit(): void {
  }

}
