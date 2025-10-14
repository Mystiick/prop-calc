import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Loan } from '../../../models/property.model';

@Component({
    selector: 'app-loan-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './loan-form.component.html',
    styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent {
    @Input({ required: true }) loan!: Loan;
    @Output() changed = new EventEmitter<void>();
}
