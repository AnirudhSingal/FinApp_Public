import { Component, OnInit, Input } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-fa-input',
  templateUrl: './fa-input.component.html',
  styleUrls: ['./fa-input.component.css']
})
export class FaInputComponent implements OnInit {

  @Input() icon: string;
  
  get classes(){
    const cssClasses = {
      fa: true
    };

    cssClasses['fa-' + this.icon] = true;
    return cssClasses;
  }

  constructor() { 

  }

  ngOnInit(): void {
  }

}
