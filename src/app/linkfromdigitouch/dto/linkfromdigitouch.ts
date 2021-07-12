import { BaseEntity } from '../../common/baseentity';

export class Linkfromdigitouch extends BaseEntity {

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
	system_link_code: string;
	link_code_combination: string;
	ldma_link_id: string;
	created_at: Date;
	updated_at: Date;
	system_link_code_main: string;
	system_link_code_protection: string;

}
