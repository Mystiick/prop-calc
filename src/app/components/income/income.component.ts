import {
    Component,
    Input
} from '@angular/core';
import {Calculated} from '../../models/calculated.model';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'app-income',
    standalone: true,
    imports: [
        DecimalPipe
    ],
    templateUrl: './income.component.html',
})
export class IncomeComponent {
    @Input({required: true}) calc!: Calculated;
}
