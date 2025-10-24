import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
    Calculated,
    Loan
} from '../../../models';
import {DecimalPipe} from '@angular/common';
import {CurrencyInputComponent} from '../../currency-input/currency-input.component';

@Component({
    selector: 'app-loan-form',
    standalone: true,
    imports: [FormsModule, DecimalPipe, CurrencyInputComponent],
    templateUrl: './loan-form.component.html',
    styleUrls: ['../form.scss']
})
export class LoanFormComponent {
    @Input({required: true}) loan!: Loan;
    @Input({required: true}) calc!: Calculated;
    @Output() changed = new EventEmitter<void>();

    updateListPrice(value: string): void {
        // Remove commas and convert to number
        this.loan.listPrice = Number(value.replace(/,/g, ''));
    }
}
