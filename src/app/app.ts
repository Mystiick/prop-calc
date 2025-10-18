import {
    Component,
    Inject
} from '@angular/core';
import {CalculatorService} from './services/calculator.service';
import {
    Calculated,
    Expense,
    Income,
    Loan,
    Property
} from './models';
import {MortgageComponent} from './components/mortgage/mortgage.component';
import {MonthlyComponent} from './components/monthly/monthly.component';
import {IncomeComponent} from './components/income/income.component';
import {LoanFormComponent} from './components/forms/loan-form/loan-form.component';
import {FormsModule} from '@angular/forms';
import {PropertyFormComponent} from './components/forms/property-form/property-form.component';
import {IncomeFormComponent} from './components/forms/income-form/income-form.component';
import {ExpenseFormComponent} from './components/forms/expense-form/expense-form.component';
import {DecimalCalculatorService} from './services/decimal-calculator.service';
import {environment} from '../environment'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        FormsModule,
        MortgageComponent,
        MonthlyComponent,
        IncomeComponent,
        IncomeFormComponent,
        LoanFormComponent,
        PropertyFormComponent,
        ExpenseFormComponent
    ],
    templateUrl: './app.html',
    styleUrls: ['./app.scss'],
    providers: [CalculatorService, DecimalCalculatorService]
})
export class App {
    protected readonly environment = environment;
    protected property: Property = {
        name: '',
        paidOff: false,
        loan: {
            listPrice: 90_000,
            offerPrice: 100_000,
            downPct: 25,
            extraDown: 5_000,
            interestRate: 7.5,
            years: 25,
            extraPayments: 100,
            yearlyTaxes: 2_000,
        } as Loan,
        income: {
            rentals: [1_000, 2_000] as number[],
            agentCutPct: 10,
            lineOfCredit: 7.2,
            repairPct: 5
        } as Income,
        expenses: [{name: 'Insurance', value: 133.33} as Expense]
    } as Property;
    protected calculated: Calculated;

    constructor(
        @Inject(DecimalCalculatorService) private calcService: DecimalCalculatorService,
        //@Inject(CalculatorService) private oldService: CalculatorService
    ) {
        this.calculated = this.calcService.calculate(this.property);
    }

    recalculate(): void {
        this.calculated = this.calcService.calculate(this.property);
    }
}
