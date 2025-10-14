import {
    Component,
    Input
} from '@angular/core';
import {Calculated} from '../../models';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'app-mortgage',
    standalone: true,
    imports: [
        DecimalPipe
    ],
    templateUrl: './mortgage.component.html',
    styleUrls: ['../summary.scss']
})
export class MortgageComponent {
    @Input({required: true}) calc!: Calculated;
}
