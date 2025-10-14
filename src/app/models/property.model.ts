import {Income} from './income.model';
import {Loan} from './loan.model';

export type Property = {
    name: string;
    paidOff: boolean;
    notes: string;
    loan: Loan;
    income: Income;
}