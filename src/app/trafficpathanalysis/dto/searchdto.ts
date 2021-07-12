import {BaseEntity} from '../../common';

export class searchdto extends BaseEntity {

    fromDate: string;
    toDate: string;
    fromTime: string;
    toTime: string;
    sourceIp: string;
    destinationIp: string;
}
