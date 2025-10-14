import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Loan } from '../../../models/property.model';

@Component({
    selector: 'app-loan-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './property-form.component.html',
    styleUrls: ['../form.scss']
})
export class PropertyFormComponent {
    @Input({ required: true }) loan!: Loan;
    @Output() changed = new EventEmitter<void>();
}
