import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {Income, Loan, Property} from "./property.model";
import {Calculated} from "./calculated.model";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.html',
    imports: [
        FormsModule,
        DecimalPipe
    ],
    styleUrls: ['./app.scss']
})
export class App {
    protected calculated = {} as Calculated;

    protected property: Property = {
        name: "",
        paidOff: false,
        loan: {
            listPrice: 90000,
            offerPrice: 100000,
            downPct: 25,
            extraDown: 5000,
            interestRate: 7.5,
            months: 180,
            extraPayments: 100,
            yearlyTaxes: 2000,
        } as Loan,
        income: {
            rentals: [1000, 2000] as number[],
            agentCutPct: 10,
            lineOfCredit: 7.2,
            repairPct: 5
        } as Income
    } as Property;

    constructor() {
        this.calculated = new Calculated(this.property);
        this.recalculateFields();
    }

    public recalculateFields(): void {
        this.calculated = new Calculated(this.property);
    }

    public addIncome(): void {
        this.property.income.rentals.push(0);
        this.recalculateFields();
    }

    public removeIncome(index: number): void {
        this.property.income.rentals.splice(index, 1);
        this.recalculateFields();
    }
}
