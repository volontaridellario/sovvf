﻿//-----------------------------------------------------------------------
// <copyright file="NavbarQueryHandler.cs" company="CNVVF">
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
using SO115App.API.Models.Classi.Navbar;
using System.Collections.Generic;
using System.IO;

namespace SO115App.API.Models.Servizi.CQRS.Queries.GestioneSoccorso.Navbar
{
    /// <summary>
    ///   Servizio che restituisce tutti i valori dei Box presenti in HomePage.
    /// </summary>
    public class NavbarQueryHandler : IQueryHandler<NavbarQuery, NavbarResult>
    {
        /// <summary>
        ///   Query che estrae i valori dei Box presenti in Home Page
        /// </summary>
        /// <param name="query">Filtri utilizzati per l'estrazione</param>
        /// <returns>Elenco dei mezzi disponibili</returns>
        public NavbarResult Handle(NavbarQuery query)
        {
            var navbars = new Classi.Navbar.Navbar();
            // preparazione del DTO
             navbars = CaricaNavbar(query);

            return new NavbarResult()
            {
                Navbar = navbars
            };
        }

        private static Classi.Navbar.Navbar CaricaNavbar(NavbarQuery query)
        {

            //TODO PARTE CHIAMATA DB

            //TODO DA MODIFICARE CON LA CONNESSIONE AL DB PER IL REPERIMENTO DEI DATI DEFINITIVI
            //DATI FAKE - ORA LI LEGGO DA FILE
            string filepath = "Fake/Navbar.json";
            string json;
            using (StreamReader r = new StreamReader(filepath))
            {
                json = r.ReadToEnd();
            }

            Classi.Navbar.Navbar navbars = JsonConvert.DeserializeObject<Classi.Navbar.Navbar>(json);

            return navbars;
        }
    }
}