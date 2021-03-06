﻿//-----------------------------------------------------------------------
// <copyright file="BoxRichiesteQueryHandler.cs" company="CNVVF">
// Copyright (C) 2017 - CNVVF
//
// This file is part of SOVVF.
// SOVVF is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// SOVVF is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see http://www.gnu.org/licenses/.
// </copyright>
//-----------------------------------------------------------------------
using CQRS.Queries;
using Newtonsoft.Json;
using SO115App.API.Models.Classi.Boxes;
using SO115App.API.Models.Servizi.CQRS.Queries.GestioneSoccorso.Boxes;
using SO115App.API.Models.Servizi.CQRS.Queries.GestioneSoccorso.Shared.SintesiRichiestaAssistenza;
using System;
using System.Collections.Generic;
using System.IO;

namespace SO115App.API.Models.Servizi.CQRS.Queries.GestioneSoccorso.DisponibilitaMezzi
{
    /// <summary>
    /// Servizio che restituisce tutti i valori dei Box presenti in HomePage.
    /// </summary>
    public class BoxRichiesteQueryHandler : IQueryHandler<BoxRichiesteQuery, BoxRichiesteResult>
    {
        /// <summary>
        /// Query che estrae i valori dei Box presenti in Home Page
        /// </summary>
        /// <param name="query">Filtri utilizzati per l'estrazione</param>
        /// <returns>Elenco dei mezzi disponibili</returns>
        public BoxRichiesteResult Handle(BoxRichiesteQuery query)
        {
            // preparazione del DTO
            var boxes = CaricaBox(query);

            return new BoxRichiesteResult()
            {
                BoxRichieste = boxes
            };
        }

        private static BoxInterventi CaricaBox(BoxRichiesteQuery query)
        {
            BoxInterventi interventi = new BoxInterventi();

            //TODO PARTE CHIAMATA DB

            //TODO DA MODIFICARE CON LA CONNESSIONE AL DB PER IL REPERIMENTO DEI DATI DEFINITIVI
            //DATI FAKE - ORA LI LEGGO DA FILE
            string filepath = "Fake/ListaRichieste.json";
            string json;
            using (StreamReader r = new StreamReader(filepath))
            {
                json = r.ReadToEnd();
            }

            List<SintesiRichiesta> ListaRichieste = JsonConvert.DeserializeObject<List<SintesiRichiesta>>(json);

            interventi.AnnoCorrente = DateTime.Now.Year;
            interventi.Assegnati = ListaRichieste.FindAll(x => x.Stato == 3).Count;
            interventi.Chiamate = ListaRichieste.FindAll(x => x.Stato == 0).Count;
            interventi.NomeTurnoCorrente = "B";
            interventi.NomeTurnoPrecedente = "A";
            interventi.Presidiati = ListaRichieste.FindAll(x => x.Stato == 2).Count;
            interventi.Sospesi = ListaRichieste.FindAll(x => x.Stato == 1).Count;
            interventi.TotAnnoCorrente = ListaRichieste.FindAll(x => x.IstanteRicezioneRichiesta.Year == DateTime.Now.Year).Count;
            interventi.TotTurnoCorrente = ListaRichieste.FindAll(x => x.IstanteRicezioneRichiesta.Year == DateTime.Now.Year).Count;
            interventi.TotTurnoPrecedente = 0;
            interventi.Totale = ListaRichieste.Count;

            return interventi;
        }
    }
}