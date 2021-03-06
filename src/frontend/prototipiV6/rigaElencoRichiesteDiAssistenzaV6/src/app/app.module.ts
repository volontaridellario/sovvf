import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipeModule } from './shared/pipes/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ScrollEventModule } from 'ngx-scroll-event';
import { TimeagoModule, TimeagoFormatter, TimeagoCustomFormatter, TimeagoIntl } from 'ngx-timeago';
/*
    Richieste Module
 */
import { RichiesteModule } from './richieste/richieste.module';
/*
    Shared Module
 */
import { SharedModule } from './shared/shared.module';
/*
    solo per il componente
 */
import { NavTestComponent } from './lista-richieste-test/nav-test/nav-test.component';
import { FilterbarModule } from './filterbar/filterbar.module';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
    declarations: [
        AppComponent,
        NavTestComponent
    ],
    imports: [
        RichiesteModule,
        FilterbarModule,
        BrowserModule,
        Ng2Webstorage.forRoot(),
        BrowserAnimationsModule,
        HttpClientModule,
        FilterPipeModule,
        FormsModule,
        FilterPipeModule,
        ScrollEventModule,
        SharedModule,
        NgbModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-center',
            preventDuplicates: true,
        }),
        PipeModule.forRoot(),
        TimeagoModule.forRoot({
            intl: TimeagoIntl,
            formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter }
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
