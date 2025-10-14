import {
    Component,
    Input
} from '@angular/core';
import {Calculated} from '../../models/calculated.model';
import {Property} from '../../models/property.model';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'app-monthly',
    standalone: true,
    imports: [
        DecimalPipe
    ],
    templateUrl: './monthly.component.html',
})
export class MonthlyComponent {
    @Input({required: true}) calc!: Calculated;
    @Input({required: true}) property!: Property;
}
