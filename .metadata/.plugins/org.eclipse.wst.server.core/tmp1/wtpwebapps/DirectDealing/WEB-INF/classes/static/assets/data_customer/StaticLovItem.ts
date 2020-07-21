import {StaticLov} from '../data_customer/StaticLov';

export class StaticLovItem {

    id: number;
    itemName: string;
    itemValue: string;
    itemPosition: number;
    createdBy: number;
    createdDate: Date;
    modifiedBy: number;
    modifiedDate: Date;
    currentState: string;
    staticLov: StaticLov;
}