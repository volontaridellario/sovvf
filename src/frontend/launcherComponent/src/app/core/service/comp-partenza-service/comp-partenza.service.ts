import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { handleError } from '../../../shared/helper/handleError';

const API_URL_PREACCOPPIATI = environment.apiUrl.composizione.preaccoppiati;
const API_URL_SQUADRE = environment.apiUrl.composizione.squadre;
const API_URL_MEZZI = environment.apiUrl.composizione.mezzi;

@Injectable()
export class CompPartenzaService {

    constructor(private http: HttpClient) {
    }

    public getPreAccoppiati(): Observable<any> {
        return this.http.get(API_URL_PREACCOPPIATI).pipe(
            retry(3),
            catchError(handleError)
        );
    }

    public getMezziComposizione(): Observable<any> {
        return this.http.get(API_URL_MEZZI).pipe(
            retry(3),
            catchError(handleError)
        );
    }

    public getSquadre(): Observable<any> {
        return this.http.get(API_URL_SQUADRE).pipe(
            retry(3),
            catchError(handleError)
        );
    }

}
