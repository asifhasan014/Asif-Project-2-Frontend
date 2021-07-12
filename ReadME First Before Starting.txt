Step to Configure the Project :
1. RUN : npm install
2. RUN : npm audit fix
3. Open The following file \node_modules\admin-lte\build\less\AdminLTE.less and change the following line:
	
	@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic);
	 TO
	@import (css) url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic);

4. Run the following code to start tha appliation : ng serve --proxy-config=proxy.conf.json
5. If you get version related problem, then replace the version of devkit in package.json file at line number 66 as below :
	"@angular-devkit/build-angular": "^0.803.24",
Start from the step 1 again.

6. Please install the following library:
	- FlexLayout: npm install --save @angular/flex-layout@8.0.0-beta.27
	- Angular Material: ng add @angular/material
	**while installing material please select "BrowserAnimationsModule" and custom theme.
	- Highchart-Angular: npm i highcharts-angular --save
	- Highchart: npm i highcharts --save
	- File saving : npm i -s file-saver
	- Add to Package.json and run npm install: "@angular/http": "^7.1.1",
	- npm i @rxweb/reactive-form-validators

To Generate New Component:
	1. cd .\src\app\onDemandExecution\
	2. ng g c on-demand-traffic-path-analysis

**if your stylesheet is not working properly please run this command:
	- npm rebuild node-sass

**production build command
	- ng build --prod --base-href=/ratmodule2/

** to install ag grid enterprise modules
	- npm install @ag-grid-enterprise/all-modules