import {StaticLovItem} from '../data_customer/StaticLovItem';

export class StaticLov{
    id: number;
    lovName: string;
    lovValue: string;
    reportCode: string;
    createdBy: number;
    createdDate: Date;
    modifiedBy: number;
    modifiedDate: Date;
    currentState: string;
	staticLovItem: StaticLovItem;
}