import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bluecolumn',
  templateUrl: './bluecolumn.component.html',
  styleUrls: ['./bluecolumn.component.css']
})
export class BluecolumnComponent implements OnInit {
	params: any;
	
	constructor() { }

	ngOnInit() {
	}
	
    agInit(params: any): void {
        this.params = params;
    }	
}
