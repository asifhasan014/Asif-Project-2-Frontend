import { BaseEntity } from '../../common/baseentity';

export class Uniquelinktableforsltsl extends BaseEntity {

	system_link_code: string;
	vendor: string;
	source_ne_name: string;
	source_board: string;
	source_port: string;
	source_card_name: string;
	sink_ne_name: string;
	sink_board: string;
	sink_port: string;
	sink_card_name: string;
	source_protect_type: string;
	source_protection_group_id: string;
	source_xpic_group_id: string;
	source_xpic_group_capacity: string;
	source_ne_frequency: string;
	sink_ne_frequency: string;
	source_ne_radio_work_mode: string;
	packet_link_capacity: string;
	max_capacity: string;
	max_modulation: string;
	link_code_a_end: string;
	link_code_z_end: string;
	link_code_combination: string;
	ldma_link_id: string;
	system_link_code_main: string;
	system_link_code_protection: string;
	dataforDate: Date;
	minrslaend: number;
	minrslzend: number;
	maxrslaend: number;
	maxrslzend: number;
	currslaend: number;
	currslzend: number;
	mintslaend: number;
	mintslzend: number;
	maxtslaend: number;
	maxtslzend: number;
	curtslaend: number;
	curtslzend: number;
	maxRSL: number;
	maxTSL: number;
	commercialZone: string;
	division: string;
	district: string;
	thana: string;
	unionName: string;
	pmfZone: string;
	ldmaTXPower: number;
	ldmaRXSignal: number;
	mwLinkReportPresetTX: string;
	mwLinkReportCurrentTX: string;
	sinkProtectionGroupActiveWorkUnit: string;
	sourceProtectType: string;
	sourceProtectionGroupActiveWorkUnit: string;
	deviationRSL: number;
	deviationTSL: number;
	remarks: string;


}
