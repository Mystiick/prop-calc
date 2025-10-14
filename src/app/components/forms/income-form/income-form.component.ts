import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
    Calculated,
    Income
} from '../../../models';

@Component({
    selector: 'app-income-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './income-form.component.html',
    styleUrls: ['../form.scss', './income-form.component.scss']
})
export class IncomeFormComponent {
    @Input({required: true}) income!: Income;
    @Input({required: true}) calc!: Calculated;
    @Output() changed = new EventEmitter<void>();

    public addIncome(): void {
        this.income.rentals.push(0);
        this.changed.emit();
    }

    public removeIncome(index: number): void {
        this.income.rentals.splice(index, 1);
        this.changed.emit();
    }
}
