import { Dealer } from './dealer';
import { BranchUser } from './branchUser';
import { Documents } from './documents';
import { Turnover } from './turnover';

export class Customer {
    id:number;
    customerId: string;
    name: string;
    solId: string;
    category: string;
    leiCode: string;
    leiValidity: string;
    dealerList: Dealer[];
    branchUser: BranchUser;
    documents: Documents;
    turnover: Turnover;
}
