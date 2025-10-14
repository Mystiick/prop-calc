import {Property} from "../property.model";

export class Calculated {
    public downPayment: number = 0;
    public principal: number = 0;
    public interest: number = 0;
    public monthlyHoi: number = 0;
    public yearlyHoi: number = 0;

    public monthlyTaxes: number = 0;
    public monthlyPayments: number = 0;
    public monthlyMort: number = 0;

    public totalCostOfLoan: number = 0;
    public totalIncome: number = 0;

    public monthlyAgentCut: number = 0;
    public yearlyAgentCut: number = 0;

    public breakEven: number = 0;
    public monthlyProfit: number = 0;
    public yearlyProfit: number = 0;
    public agentBreakEven: number = 0;
    public agentMonthlyProfit: number = 0;
    public agentYearlyProfit: number = 0;

    public repairs: number = 0;
    public monthlyLocAdded: number = 0;
    public totalMonthlyProfit: number =0;
    public deprecationTotalMonthlyProfit: number = 0;

    constructor(property: Property) {
        this.recalculate(property);
    }

    public recalculate(property: Property) {
        if (!property.income.rentals.length)
            return;

        // Calculate Total values
        this.downPayment = property.loan.offerPrice * property.loan.downPct / 100 + property.loan.extraDown;
        this.principal = property.loan.offerPrice - this.downPayment;

        // Calculate Monthly values
        this.monthlyTaxes = property.loan.yearlyTaxes / 12;
        this.yearlyHoi = property.loan.offerPrice / 100;
        this.monthlyHoi = this.yearlyHoi / 12;
        this.monthlyMort = this.calculateMonthlyMort(property);
        this.interest = this.monthlyMort * property.loan.months - this.principal;
        this.totalCostOfLoan = this.principal + this.interest;

        // Income
        this.totalIncome = property.income.rentals.reduce((a, b) => a + b);
        this.monthlyAgentCut = this.totalIncome * property.income.agentCutPct / 100;
        this.yearlyAgentCut = this.monthlyAgentCut * 12;
        this.repairs = this.totalIncome * property.income.repairPct / 100;

        this.monthlyPayments =
            this.monthlyMort +
            property.loan.extraPayments +
            this.monthlyHoi +
            this.monthlyTaxes +
            this.repairs;

        this.breakEven = this.monthlyPayments / property.income.rentals.length;
        this.agentBreakEven =
            (this.monthlyPayments + (this.monthlyPayments * property.income.agentCutPct / 100))
            / property.income.rentals.length;

        this.monthlyProfit = this.totalIncome - this.monthlyPayments;
        this.yearlyProfit = this.monthlyProfit * 12;
        this.agentMonthlyProfit = this.monthlyProfit - this.monthlyAgentCut;
        this.agentYearlyProfit = this.agentMonthlyProfit * 12;

        this.monthlyLocAdded = (this.downPayment * (property.income.lineOfCredit / 100)) / 12;
        this.totalMonthlyProfit = this.agentMonthlyProfit - this.monthlyLocAdded;
        this.deprecationTotalMonthlyProfit = -property.loan.offerPrice / 12 /27.5 * 0.3 + this.totalMonthlyProfit;
    }

    private calculateMonthlyMort(property: Property): number {
        const rate = property.loan.interestRate / 12 / 100;
        const months = property.loan.months;
        const loanAmount = this.principal;

        if (rate === 0)
            return loanAmount / months;

        return (loanAmount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    }
}