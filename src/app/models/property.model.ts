import {
    Expense,
    Income,
    Loan
} from './index';

export type Property = {
    name: string;
    paidOff: boolean;
    notes: string;
    loan: Loan;
    income: Income;
    expenses: Expense[];
}