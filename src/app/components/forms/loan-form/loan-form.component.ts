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

@Component({
    selector: 'app-loan-form',
    standalone: true,
    imports: [FormsModule, DecimalPipe],
    templateUrl: './loan-form.component.html',
    styleUrls: ['../form.scss']
})
export class LoanFormComponent {
    @Input({required: true}) loan!: Loan;
    @Input({required: true}) calc!: Calculated;
    @Output() changed = new EventEmitter<void>();
}
