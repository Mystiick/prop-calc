import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
    Calculated,
    Expense
} from '../../../models';
import {CurrencyInputComponent} from '../../currency-input/currency-input.component';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'app-expense-form',
    standalone: true,
    imports: [FormsModule, CurrencyInputComponent, DecimalPipe],
    templateUrl: './expense-form.component.html',
    styleUrls: ['../form.scss', './expense-form.component.scss']
})
export class ExpenseFormComponent {
    @Input({required: true}) expenses!: Expense[];
    @Input({required: true}) calc!: Calculated;
    @Output() changed = new EventEmitter<void>();

    public addExpense(): void {
        this.expenses.push({} as Expense);
        this.changed.emit();
    }

    public removeExpense(index: number): void {
        this.expenses.splice(index, 1);
        this.changed.emit();
    }
}
