import {Component, OnInit} from '@angular/core';
import {BoxManagerService} from '../../core/manager/boxes-manager/box-manager-service.service';
import {BoxInterventi} from '../boxes-model/box-interventi.model';
import {BoxMezzi} from '../boxes-model/box-mezzi.model';
import {BoxPersonale} from '../boxes-model/box-personale.model';

@Component({
    selector: 'app-info-aggregate',
    templateUrl: './info-aggregate.component.html',
    styleUrls: ['./info-aggregate.component.css']
})
export class InfoAggregateComponent implements OnInit {
    interventi: BoxInterventi;
    mezzi: BoxMezzi;
    personale: BoxPersonale;

    constructor(private boxManager: BoxManagerService) {
    }

    ngOnInit() {
        this.boxManager.getBoxInterventi().subscribe((r: BoxInterventi) => {
            this.interventi = r;
        });
        this.boxManager.getBoxMezzi().subscribe((r: BoxMezzi) => {
            this.mezzi = r;
        });
        this.boxManager.getBoxPersonale().subscribe((r: BoxPersonale) => {
            this.personale = r;
        });
    }
}
