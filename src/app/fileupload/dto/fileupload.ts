import { BaseEntity } from '../../common/baseentity';

export class Fileupload extends BaseEntity {

	uniqueCode: string;
	component: string;
	recordId: number;
	fileName: string;
	fileSize: number;
	fileType: string;
	fileStorePath: string;


}
