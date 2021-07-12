import { BaseEntity } from '../../common/baseentity';

export class User extends BaseEntity {

	uniqueCode: string;
	firstName: string;
	lastName: string;
	password: string;
	confirmPassword: string;
	email: string;
	contactNo: string;
	territory: string;
	designation: string;
	emailSubject: string;
	emailBody: string;
	attachFileId: string;
	attachFileName: string;
	isNewUser: boolean;
	gender : String;
	userType : String;
	vendorName : String;
	
}
