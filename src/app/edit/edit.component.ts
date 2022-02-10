import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.description = this.task.description;    
  }
  @Input() task = { 
    date: Date.now(),
    priority: 1,
    description: '',
    check: false
  }
  @Output() closeEvent = new EventEmitter<any>();

  description = ''

  save() {
    this.closeEvent.emit({type: 'edit', value: this.description});
    
  }

  close() {
    this.closeEvent.emit({type: 'edit', value: null});  
  }

}
