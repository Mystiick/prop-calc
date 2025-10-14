import {
    Component,
    Input
} from '@angular/core';
import {Calculated} from '../../models';
import {Property} from '../../models';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'app-monthly',
    standalone: true,
    imports: [
        DecimalPipe
    ],
    templateUrl: './monthly.component.html',
    styleUrls: ['../summary.scss']
})
export class MonthlyComponent {
    @Input({required: true}) calc!: Calculated;
    @Input({required: true}) property!: Property;
}
