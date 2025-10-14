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

@Component({
    selector: 'app-expense-form',
    standalone: true,
    imports: [FormsModule],
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
