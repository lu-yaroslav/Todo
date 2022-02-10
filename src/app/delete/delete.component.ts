import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    
  }
  @Input() task = { 
    date: Date.now(),
    priority: 1,
    description: '',
    check: false
  }
  
 
  @Output() closeEvent = new EventEmitter<any>();


  remove() {
    this.closeEvent.emit({type: 'delete', value: this.task})
      
  }
  
  close() {
    this.closeEvent.emit({type: 'close', value: null})
     
  }
}
