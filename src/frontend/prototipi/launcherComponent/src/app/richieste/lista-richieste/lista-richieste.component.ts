import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SintesiRichiesta } from '../../shared/model/sintesi-richiesta.model';
import { ListaRichiesteManagerService } from '../../dispatcher/manager/lista-richieste-manager/lista-richieste-manager.service';
import { ScrollEvent } from 'ngx-scroll-event';
import { ListaRichiesteService } from '../lista-richieste-service/lista-richieste-service.service';
import { RicercaRichiesteService } from '../ricerca-richieste/ricerca-richieste-service/ricerca-richieste.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkerService } from '../../maps/service/marker-service/marker-service.service';
import { EventiRichiestaComponent } from '../../eventi-richiesta/eventi-richiesta.component';

@Component({
    selector: 'app-lista-richieste',
    templateUrl: './lista-richieste.component.html',
    styleUrls: ['./lista-richieste.component.css']
})
export class ListaRichiesteComponent implements OnInit {
    richieste: SintesiRichiesta[] = [];
    richiestaHover: SintesiRichiesta;
    richiestaSelezionata: SintesiRichiesta;
    richiestaFissata: SintesiRichiesta;
    richiestaSelezionataState: string; // Animazione
    loaderRichieste = true;
    loaderNuoveRichieste = false;

    preventSimpleClick: boolean;
    timer: any;
    contatoreNuoveRichieste = 9;

    constructor(private listaRichiesteManager: ListaRichiesteManagerService,
        private richiesteS: ListaRichiesteService,
        public ricercaS: RicercaRichiesteService,
        private modalService: NgbModal,
        private markerS: MarkerService) {
    }

    ngOnInit() {
        // Restituisce le Richieste
        this.listaRichiesteManager.getData().subscribe(richieste => {
            this.richieste = richieste;
            this.loaderRichieste = false;
        });
        // Restituisce la Richiesta Hover
        this.richiesteS.subjects.getRichiestaHover().subscribe(richiestaHover => {
            if (richiestaHover) {
                this.richiestaHover = richiestaHover;
            } else {
                this.richiestaHover = null;
            }
        });
        // Restituisce la Richiesta Selezionata
        this.richiesteS.subjects.getRichiestaSelezionata().subscribe(richiestaSelezionata => {
            if (richiestaSelezionata) {
                this.richiestaSelezionata = richiestaSelezionata;
            } else {
                this.richiestaSelezionata = null;
            }
        });
        // Restituisce la Richiesta Fissata in alto
        this.richiesteS.subjects.getRichiestaFissata().subscribe(richiestaFissata => {
            if (richiestaFissata) {
                this.richiestaFissata = richiestaFissata;
            } else {
                this.richiestaFissata = null;
            }
        });
    }

    nuoveRichieste(event: ScrollEvent) {
        if (event.isReachingBottom && event.isWindowEvent === false && this.contatoreNuoveRichieste < 10) {
            this.contatoreNuoveRichieste = 10;
            this.loaderNuoveRichieste = true;
            setTimeout(() => {
                this.listaRichiesteManager.onNewRichiesteList();
                this.loaderNuoveRichieste = false;
                this.contatoreNuoveRichieste = 9;
            }, 3000);
        }
    }

    richiestaClick(richiesta) {
        if (richiesta) {
            this.richiesteS.selezionata(richiesta.id);
            this.markerS.actionById(richiesta.id, 'click');
        }
    }
    richiestaDoubleClick(richiesta) {
        if (richiesta) {
            this.richiesteS.selezionata(richiesta.id);
            console.log('Doppio click su richiesta');
        }
    }
    fissaInAlto(richiesta) {
        if (richiesta) {
            if (richiesta !== this.richiestaFissata) {
                this.richiesteS.fissata(richiesta.id);
                this.markerS.actionById(richiesta.id, 'click');
            } else {
                this.unClick();
            }
        }
    }
    richiestaHoverIn(richiesta) {
        if (richiesta) {
            this.richiesteS.hoverIn(richiesta.id);
            this.markerS.actionById(richiesta.id, 'hover-in');
        }
    }
    richiestaHoverOut(richiesta) {
        if (richiesta) {
            this.richiesteS.hoverOut();
            this.markerS.actionById(richiesta.id, 'hover-out');
        }
    }
    unClick() {
        this.richiesteS.deselezionata();
        this.richiesteS.defissata();
        this.markerS.action('a', 'unclick');
    }

    visualizzaEventiRichiesta(richiesta) {
        this.modalService.open(EventiRichiestaComponent, { size: 'lg' });
    }

    /* Ritorna true se le parole matchano almeno in parte */
    match(word1: string, word2: string) {
        const word1San = word1.toLowerCase().substr(0, word1.length - 1);
        const word2San = word2.toLowerCase().substr(0, word2.length - 1);
        if (word1San === word2San) {
            return true;
        }
    }

    /* NgClass Template */
    cardShadowClass(r) {
        if (r) {
            return {
                'card-shadow-info': (r === this.richiestaHover || r === this.richiestaSelezionata) && this.match(r.stato, 'assegnato'),
                'card-shadow-success': (r === this.richiestaHover || r === this.richiestaSelezionata) && this.match(r.stato, 'presidiato'),
                'card-shadow-danger': (r === this.richiestaHover || r === this.richiestaSelezionata) && this.match(r.stato, 'chiamata'),
                'card-shadow-warning': (r === this.richiestaHover || r === this.richiestaSelezionata) && this.match(r.stato, 'sospeso'),
                'card-shadow-secondary': (r === this.richiestaHover || r === this.richiestaSelezionata) && this.match(r.stato, 'chiuso'),
                'bg-light': r === this.richiestaSelezionata || r === this.richiestaHover,
            };
        }
    }
}
