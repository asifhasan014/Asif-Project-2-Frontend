import { BaseEntity } from '../../common/baseentity';

export class Audittrail extends BaseEntity {

	uniqueCode :string;
	userId: number;
	operationType: string;
	operationTime: Date;
	componentName: string;
	requestObject: string;


}
