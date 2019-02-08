import { Action, Selector, State, StateContext } from '@ngxs/store';

// Model
import { VoceFiltro } from '../../voce-filtro.model';

// Action
import { GetFiltriRichieste, SetFiltroSelezionato, ResetFiltriSelezionati } from '../actions/filtri-richieste.actions';

// Tipologie
import { APP_TIPOLOGIE } from 'src/app/core/settings/tipologie';


export interface FiltriRichiesteStateModel {
  filtriRichieste: VoceFiltro[];
}

export const filtriRichiesteStateDefaults: FiltriRichiesteStateModel = {
  filtriRichieste: [
    { codice: '1', categoria: 'Presidiato', descrizione: 'Presidiato', star: true, selezionato: false },
    { codice: '2', categoria: 'Presidiato', descrizione: 'Non Presidiato', star: true, selezionato: false },
    { codice: '3', categoria: 'Rilevante', descrizione: 'Rilevante', star: true, selezionato: false },
    { codice: '4', categoria: 'Rilevante', descrizione: 'Non Rilevante', star: true, selezionato: false },
  ]
};

@State<FiltriRichiesteStateModel>({
  name: 'filtriRichieste',
  defaults: filtriRichiesteStateDefaults
})
export class FiltriRichiesteState {

  constructor() { }

  // SELECTORS
  @Selector()
  static filtriTipologie(state: FiltriRichiesteStateModel) {
    return state.filtriRichieste;
  }

  @Selector()
  static filtriSelezionati(state: FiltriRichiesteStateModel) {
    return state.filtriRichieste.filter(f => f.selezionato === true);
  }

  // GET
  @Action(GetFiltriRichieste)
  getFiltriRichieste({ getState, patchState }: StateContext<FiltriRichiesteStateModel>) {
    const state = getState();

    const filtriRichieste: VoceFiltro[] = copyObj(state.filtriRichieste);

    patchState({
      ...state,
      filtriRichieste: addFiltriTipologie(filtriRichieste)
    });
  }

  // SET FILTRO SELEZIONATO (SELEZIONATO, NON-SELEZIONATO)
  @Action(SetFiltroSelezionato)
  setFiltroSelezionato({ getState, patchState }: StateContext<FiltriRichiesteStateModel>, action: SetFiltroSelezionato) {
    const state = getState();

    const filtriRichieste = copyObj(state.filtriRichieste);
    const filtro = copyObj(action.filtro);

    patchState({
      ...state,
      filtriRichieste: setFiltroSelezionato(filtriRichieste, filtro)
    });
  }

  // RESET FILTRI SELEZIONATI
  @Action(ResetFiltriSelezionati)
  resetFiltriSelezionati({ getState, patchState }: StateContext<FiltriRichiesteStateModel>) {
    const state = getState();

    const filtriRichieste = copyObj(state.filtriRichieste);

    patchState({
      ...state,
      filtriRichieste: resetFiltriSelezionati(filtriRichieste)
    });
  }
}

export function addFiltriTipologie(filtriRichieste: VoceFiltro[]) {
  APP_TIPOLOGIE.forEach(tipologie => {
    filtriRichieste.push(new VoceFiltro('' + tipologie.codice, tipologie.categoria, tipologie.descrizione, tipologie.star));
  });

  return filtriRichieste;
}

export function setFiltroSelezionato(filtriRichieste: VoceFiltro[], filtro: VoceFiltro) {
  filtriRichieste.forEach((fR: VoceFiltro, index: any) => {
    if (fR.codice === filtro.codice) {
      filtro = toggleFiltro(filtro);
      filtriRichieste[index] = filtro;
    }
  });

  return filtriRichieste;
}

export function toggleFiltro(filtro: VoceFiltro) {
  filtro.selezionato = !filtro.selezionato;

  return filtro;
}

export function resetFiltriSelezionati(filtriRichieste: VoceFiltro[]) {
  filtriRichieste.forEach((fR: VoceFiltro) => {
    fR.selezionato = false;
  });
  const newFiltriRichieste = filtriRichieste;

  return newFiltriRichieste;
}

export function copyObj(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}