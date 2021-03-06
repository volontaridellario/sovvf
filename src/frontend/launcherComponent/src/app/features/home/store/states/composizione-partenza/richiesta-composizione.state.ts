import { SintesiRichiesta } from '../../../../../shared/model/sintesi-richiesta.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { RichiestaComposizione, TerminaComposizione } from '../../actions/composizione-partenza/richiesta-composizione.actions';
import { ComposizioneMarker } from '../../../maps/maps-model/composizione-marker.model';
import { MezziComposizioneState } from './mezzi-composizione.state';
import { SquadreComposizioneState } from './squadre-composizione.state';
import { PreAccoppiatiState } from './pre-accoppiati.state';

export interface RichiestaComposizioneStateModel {
    richiesta: SintesiRichiesta;
}

export const RichiestaComposizioneStateDefaults: RichiestaComposizioneStateModel = {
    richiesta: null
};

@State<RichiestaComposizioneStateModel>({
    name: 'richiestaComposizione',
    defaults: RichiestaComposizioneStateDefaults,
    children: [MezziComposizioneState,
        SquadreComposizioneState,
        PreAccoppiatiState]
})

export class RichiestaComposizioneState {

    @Selector()
    static richiestaComposizione(state: RichiestaComposizioneStateModel): SintesiRichiesta {
        return state.richiesta;
    }

    @Selector()
    static richiestaComposizioneMarker(state: RichiestaComposizioneStateModel): ComposizioneMarker[] {
        let composizioneMarkers: ComposizioneMarker[] = [];
        if (state.richiesta !== RichiestaComposizioneStateDefaults.richiesta) {
            const composizioneMarker = new ComposizioneMarker(
                state.richiesta.id, state.richiesta.localita, state.richiesta.tipologie, null,
                state.richiesta.priorita, state.richiesta.stato, new Date(state.richiesta.rilevanza), false);
            composizioneMarkers.push(composizioneMarker);
        } else {
            composizioneMarkers = [];
        }
        return composizioneMarkers;
    }

    @Action(RichiestaComposizione)
    richiestaComposizione({ getState, patchState }: StateContext<RichiestaComposizioneStateModel>, action: RichiestaComposizione) {
        const state = getState();
        patchState({
            ...state,
            richiesta: action.richiesta
        });
    }

    @Action(TerminaComposizione)
    terminaComposizione({ getState, patchState }: StateContext<RichiestaComposizioneStateModel>) {
        const state = getState();
        patchState({
            ...state,
            richiesta: RichiestaComposizioneStateDefaults.richiesta
        });
    }
}
