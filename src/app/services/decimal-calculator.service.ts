import {Injectable} from '@angular/core';
import {
    Calculated,
    Loan,
    Property
} from '../models';
import Decimal from 'decimal.js';

@Injectable({providedIn: 'root'})
export class DecimalCalculatorService {
    public calculate(property: Property) {
        const calc = {} as Calculated;
        const {loan, income, expenses} = property;

        // Calculate Total values
        calc.downPayment = new Decimal(loan.offerPrice).times(loan.downPct).dividedBy(100).plus(loan.extraDown).toNumber();
        calc.principal = new Decimal(loan.offerPrice).minus(calc.downPayment).toNumber();

        // Income
        calc.totalIncome = income.rentals.reduce((acc, value) => acc.add(value), new Decimal(0)).toNumber();

        // Expenses
        calc.monthlyTaxes = new Decimal(loan.yearlyTaxes).dividedBy(12).toNumber();
        calc.yearlyHoi = new Decimal(loan.offerPrice).dividedBy(100).toNumber();
        calc.monthlyHoi = new Decimal(calc.yearlyHoi).dividedBy(12).toNumber();

        calc.monthlyMort = this.calculateMonthlyMort(loan, calc.principal);
        calc.interest = new Decimal(calc.monthlyMort).times(new Decimal(loan.years).times(12)).minus(calc.principal).toNumber();
        calc.totalCostOfLoan = new Decimal(calc.principal).plus(calc.interest).toNumber();

        calc.monthlyAgentCut = new Decimal(calc.totalIncome).times(income.agentCutPct).dividedBy(100).toNumber();
        calc.yearlyAgentCut = new Decimal(calc.monthlyAgentCut).times(12).toNumber();
        calc.repairs = new Decimal(calc.totalIncome).times(income.repairPct).dividedBy(100).toNumber();

        calc.expenses = expenses.reduce((acc, expense) => acc.add(expense.value), new Decimal(0)).toNumber();

        calc.monthlyPayments =
            new Decimal(calc.monthlyMort)
                .plus(loan.extraPayments)
                .plus(calc.monthlyHoi)
                .plus(calc.monthlyTaxes)
                .plus(calc.repairs)
                .plus(calc.expenses)
                .toNumber();

        calc.breakEven = new Decimal(calc.monthlyPayments).dividedBy(income.rentals.length).toNumber();
        calc.agentBreakEven =
            new Decimal(calc.monthlyPayments)
                .times(income.agentCutPct)
                .dividedBy(100)
                .plus(calc.monthlyPayments)
                .dividedBy(income.rentals.length)
                .toNumber();

        calc.monthlyProfit = new Decimal(calc.totalIncome).minus(calc.monthlyPayments).toNumber();
        calc.yearlyProfit = new Decimal(calc.monthlyProfit).times(12).toNumber();
        calc.agentMonthlyProfit = new Decimal(calc.monthlyProfit).minus(calc.monthlyAgentCut).toNumber();
        calc.agentYearlyProfit = new Decimal(calc.agentMonthlyProfit).times(12).toNumber();

        calc.monthlyLocAdded =
            new Decimal(income.lineOfCredit)
                .dividedBy(100)
                .times(calc.downPayment)
                .dividedBy(12)
                .toNumber();
        calc.totalMonthlyProfit = new Decimal(calc.agentMonthlyProfit).minus(calc.monthlyLocAdded).toNumber();
        calc.deprecationTotalMonthlyProfit =
            new Decimal(-loan.offerPrice)
                .dividedBy(12)
                .dividedBy(27.5)
                .times(0.3)
                .plus(calc.totalMonthlyProfit)
                .toNumber();

        const pretaxProfit = new Decimal(calc.yearlyProfit).minus(loan.yearlyTaxes);
        calc.capRate = pretaxProfit.dividedBy(loan.offerPrice).times(100).toNumber();
        calc.cashOnCashReturn =  pretaxProfit.dividedBy(calc.downPayment).times(100).toNumber();

        return calc;
    }

    private calculateMonthlyMort(loan: Loan, principal: number): number {
        const rate = new Decimal(loan.interestRate).dividedBy(12).dividedBy(100).toNumber();

        if (rate === 0)
            return new Decimal(principal).dividedBy(new Decimal(loan.years).times(12)).toNumber();

        return new Decimal(principal)
            .times(rate)
            .times(
                new Decimal(1).plus(rate).pow(new Decimal(loan.years).times(12))
            )
            .dividedBy(
                new Decimal(1).plus(rate).pow(new Decimal(loan.years).times(12)).minus(1)
            ).toNumber();
    }
}
