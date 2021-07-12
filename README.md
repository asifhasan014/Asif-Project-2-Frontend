# Automation Module-2 (FrontEnd)
-----------------------------------------------------------------

## 1. [Documentation](https://github.com/togetherGithub/ROBI-Automation-2020-Module2-Documents)
## 2. Automation Source Code
* 2.1 [Backend](https://github.com/togetherGithub/ROBI-Automation-2020-Module2-Backend)
* 2.1 [Frontend](https://github.com/togetherGithub/ROBI-Automation-2020-Module2-Frontend)

# Project Details

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Or

### How to start

**Note** that this seed project requires **node >=v8.11.3 and npm >=6.4.0.

In order to start the project use:

```bash
$ cd 'FieldEngineerPortal-frontend'
# install the project's dependencies
$ npm install
# watches your files and uses livereload by default run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
$ npm start
# prod build, will output the production application in `dist`
# the produced code can be deployed (rsynced) to a remote server
$ npm run build
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Following things need to done for the project deployed into Tomcat. 

If the project is 'baseproject.war'
1. Go to /src/app/common/constants.ts  and change 'apiUrl' to '/baseproject/rest'
2. Run the following command 
	>ng build --prod --base-href=/baseproject/
	
Note: If the project is deployed as ROOT.war into Tomcat then no need to change 'apiUrl' as well as  --base-href in build.

## Run application locally using 'ng' command
### Run application 
	>ng serve

### Run application using proxy api
1. Edit proxy.conf.json file first to set your target API location (e.g., http://localhost:8080/feportal). If backend project is 'FieldEngineerPortal' then disable authorization checking by setting IS_PRODUCTION_MODE_ENABLED = false in com/mycompany/myproject/common/ApplicationConstants.java file 
2. Go to /src/app/common/constants.ts  and change 'apiUrl' to '/rest'
3. Run the application using following command.
	>ng serve --proxy-config=proxy.conf.json
	
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## some angular components 

https://angular.io/resources



