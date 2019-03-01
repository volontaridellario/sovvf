import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../../../shared/pipes/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
/**
 * AGM CORE
 */
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AgmDirectionModule } from 'agm-direction';

/**
 * MAPS
 */
import { MapsComponent } from './maps.component';
import { AgmComponent } from './agm/agm.component';
import { AgmContentComponent } from './agm/agm-content.component';
/**
 * MAPS-UI
 */
import { MapsFiltroComponent } from './maps-ui/filtro/filtro.component';
import { InfoWindowComponent } from './maps-ui/info-window/info-window.component';
import { CambioSedeModalComponent } from './maps-ui/info-window/cambio-sede-modal/cambio-sede-modal.component';
/**
 * Provider
 */
import {
    CentroMappaManagerService, SediMarkerManagerService, RichiesteMarkerManagerService,
    CentroMappaManagerServiceFake, SediMarkerManagerServiceFake, RichiesteMarkerManagerServiceFake
} from '../../../core/manager/maps-manager';
import {
    DispatcherCentroMappaService, DispatcherSediMarkerService, DispatcherRichiesteMarkerService,
    DispatcherCentroMappaServiceFake,
    DispatcherSediMarkerServiceFake, DispatcherRichiesteMarkerServiceFake
} from '../../../core/dispatcher/dispatcher-maps';
import {
    CentroMappaService, MezziMarkerService, SediMarkerService, RichiesteMarkerService,
    CentroMappaServiceFake, MezziMarkerServiceFake, SediMarkerServiceFake, RichiesteMarkerServiceFake
} from '../../../core/service/maps-service';
/**
 * Ngxs
 */
import { NgxsModule } from '@ngxs/store';
import { MarkerMeteoState } from '../store/states/filterbar/marker-meteo-switch.state';
import { MeteoMarkersState } from '../store/states/maps/meteo-markers.state';
import { MapsFiltroState } from '../store/states/maps/maps-filtro.state';
import { MapsDirectionState } from '../store/states/maps/maps-direction.state';
import { MarkerSelezionatoState } from '../store/states/maps/marker-selezionato.state';
import { MezziMarkersState } from '../store/states/maps/mezzi-markers.state';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        PipeModule.forRoot(),
        AgmCoreModule.forRoot(),
        AgmDirectionModule,
        AgmJsMarkerClustererModule,
        AgmSnazzyInfoWindowModule,
        SharedModule.forRoot(),
        NgxsModule.forFeature(
            [
                MarkerMeteoState,
                MeteoMarkersState,
                MapsFiltroState,
                MapsDirectionState,
                MarkerSelezionatoState,
                MezziMarkersState
            ]
        ),
    ],
    declarations: [
        MapsComponent,
        AgmComponent,
        AgmContentComponent,
        MapsFiltroComponent,
        InfoWindowComponent,
        CambioSedeModalComponent
    ],
    entryComponents: [CambioSedeModalComponent],
    exports: [
        MapsComponent
    ],
    providers: [
        {provide: RichiesteMarkerService, useClass: RichiesteMarkerServiceFake},
        {provide: RichiesteMarkerManagerService, useClass: RichiesteMarkerManagerServiceFake},
        {provide: DispatcherRichiesteMarkerService, useClass: DispatcherRichiesteMarkerServiceFake},
        {provide: MezziMarkerService, useClass: MezziMarkerServiceFake},
        {provide: SediMarkerService, useClass: SediMarkerServiceFake},
        {provide: SediMarkerManagerService, useClass: SediMarkerManagerServiceFake},
        {provide: DispatcherSediMarkerService, useClass: DispatcherSediMarkerServiceFake},
        {provide: CentroMappaService, useClass: CentroMappaServiceFake},
        {provide: CentroMappaManagerService, useClass: CentroMappaManagerServiceFake},
        {provide: DispatcherCentroMappaService, useClass: DispatcherCentroMappaServiceFake},
    ]
})
export class MapsModule {
}
