import {Injectable} from '@angular/core';
import {
    Calculated,
    Loan,
    Property
} from '../models';
import Decimal from 'decimal.js';

@Injectable({providedIn: 'root'})
export class CalculatorService {
    public calculate(property: Property) {
        const calc = {} as Calculated;
        const {loan, income, expenses} = property;

        // Calculate Total values
        calc.downPayment = loan.offerPrice * loan.downPct / 100 + loan.extraDown;
        calc.principal = loan.offerPrice - calc.downPayment;

        // Income
        calc.totalIncome = income.rentals.reduce((acc, value) => acc + value, 0) ?? 0;

        // Expenses
        calc.monthlyTaxes = loan.yearlyTaxes / 12;
        calc.yearlyHoi = loan.offerPrice / 100;
        calc.monthlyHoi = calc.yearlyHoi / 12;

        calc.monthlyMort = this.calculateMonthlyMort(loan, calc.principal);
        calc.interest = calc.monthlyMort * (loan.years * 12) - calc.principal;
        calc.totalCostOfLoan = calc.principal + calc.interest;

        calc.monthlyAgentCut = calc.totalIncome * income.agentCutPct / 100;
        calc.yearlyAgentCut = calc.monthlyAgentCut * 12;
        calc.repairs = calc.totalIncome * income.repairPct / 100;
        calc.expenses = expenses.reduce((acc, expense) => acc + (expense.value ?? 0), 0) ?? 0;

        calc.monthlyPayments =
            calc.monthlyMort +
            loan.extraPayments +
            calc.monthlyHoi +
            calc.monthlyTaxes +
            calc.repairs +
            calc.expenses;

        calc.breakEven = calc.monthlyPayments / income.rentals.length;
        calc.agentBreakEven =
            (
                calc.monthlyPayments + (calc.monthlyPayments * income.agentCutPct / 100)
            ) / income.rentals.length;

        calc.monthlyProfit = calc.totalIncome - calc.monthlyPayments;
        calc.yearlyProfit = calc.monthlyProfit * 12;
        calc.agentMonthlyProfit = calc.monthlyProfit - calc.monthlyAgentCut;
        calc.agentYearlyProfit = calc.agentMonthlyProfit * 12;

        calc.monthlyLocAdded = (calc.downPayment * (income.lineOfCredit / 100)) / 12;
        calc.totalMonthlyProfit = calc.agentMonthlyProfit - calc.monthlyLocAdded;
        calc.deprecationTotalMonthlyProfit = -loan.offerPrice / 12 / 27.5 * 0.3 + calc.totalMonthlyProfit;

        return calc;
    }

    private calculateMonthlyMort(loan: Loan, principal: number): number {
        const rate = loan.interestRate / 12 / 100;
        const months = new Decimal(loan.years).times(12).toNumber();
        const loanAmount = principal;

        if (rate === 0)
            return loanAmount / months;

        return (loanAmount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    }
}
