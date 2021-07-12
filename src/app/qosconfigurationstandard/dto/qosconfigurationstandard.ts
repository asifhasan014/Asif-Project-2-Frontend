import { BaseEntity } from '../../common/baseentity';

export class Qosconfigurationstandard extends BaseEntity {

	standardSwitchPort: string;
	switchPortDetails: string;
	standardConfigurationValue: string;
	configurationDetails: string;
	checkSwitchPort: string;
	checkConfigurationValue: string;
	configurationStatus: string;
	type: string;
	vendor: string;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
