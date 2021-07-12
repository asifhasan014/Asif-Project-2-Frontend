import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { User } from '../dto/user';
import { UserService } from '../service/user.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.css']
})
export class UsergridComponent implements OnInit {

	gridOptions: GridOptions;
	users: User[];
	userList$;
	user: User = {
		componentId: -1,
		designation:'',
		status: 1, //for generating active user or unlocked user - 0 means locked user
		version: 0,
		operation: '',
		csrfNonce: '' , 
		uniqueCode: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
		email: '',
		contactNo: '',
		territory:'',
		emailSubject: '',
		emailBody: '',
		attachFileId: '',
		attachFileName: '',
		gender:'',
		isNewUser:true,
		userType: '',
		vendorName: ''
	};
	
	constructor(
		private router: Router,
		private userService: UserService
	) {
		
		this.userList$ = this.userService.getUserList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 10,
			rowSelection: 'single',
            onGridReady: () => {
                this.userList$.subscribe(
                    apiResponse => {
						this.loadUsersIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.users);
                        }
                    }
                );
                this.gridOptions.api.sizeColumnsToFit();
			}
			,
			onCellClicked:(event)=>{
				if (event.column.getColId() === 'editAction') {
					// do your stuff here
					var selectedRows = this.gridOptions.api.getSelectedRows();
					var selectedItemId = -1;
					selectedRows.forEach( function(selectedRow, index) {
						selectedItemId = selectedRow.componentId;
					});
					this.router.navigate(['/users/' + selectedItemId]);
				 }
			}
			// ,
			// onSelectionChanged: () => {
			// 	var selectedRows = this.gridOptions.api.getSelectedRows();
			// 	var selectedItemId = -1;
			// 	selectedRows.forEach( function(selectedRow, index) {
			// 		selectedItemId = selectedRow.componentId;
			// 	});
			// 	router.navigate(['/users/' + selectedItemId]);
			// }
		};

	}

	ngOnInit() {
	}	
		
	private loadUsersIntoArray(apiResponse){
		if (apiResponse.success){
			this.users = apiResponse.data.map(obj =>{
				var rObj = <User>{
					componentId: obj.componentId,
					status: obj.status,
					version: obj.version ,
					uniqueCode: obj.uniqueCode,
					firstName: obj.firstName,
					lastName: obj.lastName,
					password: '',
					confirmPassword: '',
					email: obj.email,
					contactNo: obj.contactNo,
					territory: obj.territory,
					emailSubject: obj.emailSubject,
					emailBody: obj.emailBody,
					userType: obj.userType,
					vendorName: obj.vendorName
					

				};
				return rObj;
			});
		}
	}
	
	onAddUser(){
		this.router.navigate(['/users/-1']);
	}

	searchByParams(){
		//this.productList$ = this.productService.getProductList();
		this.userList$ = this.userService.getUsersByUniqueCode(this.user.uniqueCode);
		this.userList$.subscribe(
			apiResponse => {
				this.loadUsersIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.users);
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	}

	private isMobileAgent(){
        var ua = navigator.userAgent;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
            return true;
        }

         return false;  
    }
    private createMobileColDefs(){
        return[
			{
    			headerName: "Action",
    			field: "editAction",
   				width: 100,
    			cellRenderer: function() {
        		return '<span><i class="fa fa-edit"></i></span>';
    			}
			}, 
			
			{
				headerName: "User Name",
				field: "uniqueCode",
				filter: "agTextColumnFilter"
			},
            {
				headerName: "Email",
				field: "email",
				filter: "agTextColumnFilter"
			}
        ];
    }
    


	private createColumnDefs(){
		if(this.isMobileAgent()){
			return this.createMobileColDefs();
		}
		return [
			{
    			headerName: "Action",
    			field: "editAction",
   				width: 100,
    			cellRenderer: function() {
        		return '<span><i class="fa fa-edit"></i></span>';
    			}
			}, 
			
			{
				headerName: "User Name",
				field: "uniqueCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "First Name",
				field: "firstName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Last Name",
				field: "lastName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Email",
				field: "email",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Phone Number",
				field: "contactNo",
				filter: "agTextColumnFilter"
			},
			{
				headerName:"Territory",
				field: "territory",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "User Type",
				field: "userType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Vendor Name",
				field: "vendorName",
				filter: "agTextColumnFilter"
			}			

			
        ];
	}
		
}
