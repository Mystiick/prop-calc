export type Property = {
    name: string;
    paidOff: boolean;
    notes: string;
    loan: Loan;
    income: Income;
}

export type Loan = {
    listPrice: number;
    offerPrice: number;
    downPct: number;
    extraDown: number;
    interestRate: number;
    months: number;
    extraPayments: number;
    yearlyTaxes: number;
}

export type Income = {
    rentals: number[];
    agentCutPct: number;
    lineOfCredit: number;
    repairPct: number;
}
