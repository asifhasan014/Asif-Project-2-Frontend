import { BaseEntity } from '../../common/baseentity';

export class Microwavelinkreport extends BaseEntity {

	linkName: string;
	sourceNEName: string;
	sourceNEId: string;
	sourceBoard: string;
	sourcePort: string;
	sinkNEName: string;
	sinkNEId: string;
	sinkBoard: string;
	sinkPort: string;
	sourceProtectType: string;
	sinkProtectType: string;
	sourceProtectUnitType: string;
	sinkProtectUnitType: string;
	sourceProtectionGroupActiveWorkUnit: string;
	sinkProtectionGroupActiveWorkUnit: string;
	sourceNEPresetValueofTransmitPower: string;
	sinkNEPresetValueofTransmitPower: string;
	sourceNECurrentValueofTransmitPower: string;
	sinkNECurrentValueofTransmitPower: string;
	sourceNEPresetValueofReceivePower: string;
	sourceNEAMStatus: string;
	sinkNEAMStatus: string;
	remarks: string;


}
