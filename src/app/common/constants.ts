export const Constants = {
	//for Tomcat project. Enable it before >ng build --base-href=/feportal/
	//apiUrl: '/baseproject',
	
	//for proxy api or directly for ROOT.war project of Tomcat
	
	 apiUrl: '/rest', //used for tomcat in same server
	//apiUrl: '', //use this when you deploy the webinf file in the backend project for running in spring boot main application
	// apiUrl: '/ratmodule2', //used this to deploy war on robiuat
	//apiUrl: 'http://192.168.40.251:7070/baseproject', //used for tomcat in different server

	// sets an idle timeout of 1800 seconds (30 mins), for testing purposes.
	// when the idle time is started, after SessionTimeOutInSec the user is logged out 
	SessionTimeOutInSec: 600,
	// sets a timeout period of 1500 seconds (25 mins). after 30 mins of inactivity, the user will be considered timed out.
	// After SessionOutWarningTimeInSec seconds, the idle watch starts
	SessionOutWarningTimeInSec: 15,
	
	Login: 'Login',
	Logout: 'Logout',
	Signup: 'Signup',
	GetAll: 'GetAll',
	GetById: 'GetById',
	GetByUniqueCode: 'GetByUniqueCode',
	Save: 'Save',
	SaveAll: 'SaveAll',
	Update: 'Update',
	IsLoggedIn: 'IsLoggedIn',
	MenuJSONStr: 'MenuJSONStr',
	UserData: 'UserData',
	Lock: 'Lock',
	UnLock: 'UnLock',
	GetAllVendors: 'GetAllVendors',
	GetAllClassNamesByVendor: 'GetAllClassNamesByVendor',
	GetAllProductsByVendorByClassName: 'GetAllProductsByVendorByClassName',
	GetTotalCountForComponents : 'GetTotalCountForComponents',
	GetByParams: 'GetByParam',
	UpdateEmailTemplate: 'UpdateEmailTemplate',
	LastActiveTime: 'LastActiveTime',
	GetDraftOnly: 'GetDraftOnly',
	GetTrackingList: 'GetTrackingList',
	SearchTrackingList: 'SearchTrackingList',
	GetCutOfDate: 'GetCutOfDate',
	onDemandExecution: 'ExecuteOnDemand',
	GetDeviceByType: 'GetDeviceByType'

};