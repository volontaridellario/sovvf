﻿//-----------------------------------------------------------------------
// <copyright file="FuoriServizio.cs" company="CNVVF">
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
using System;

namespace Modello.Classi.Soccorso.Eventi.Partenze
{
    /// <summary>
    ///   Modella il rilascio di un mezzo da una richiesta per uscita dal servizio.
    /// </summary>
    public class FuoriServizio : Rilascio
    {
        /// <summary>
        ///   Costruttore della classe.
        /// </summary>
        /// <param name="codiceMezzo">Il codice del mezzo</param>
        /// <param name="istante">E' l'istante in cui si verifica l'evento</param>
        /// <param name="codiceFonte">E' la fonte informativa dell'evento</param>
        /// <param name="motivazione">
        ///   E' la motivazione che giustifica la transizione di stato verso Fuori Servizio
        /// </param>
        public FuoriServizio(
            string codiceMezzo,
            DateTime istante,
            string codiceFonte,
            string motivazione) : base(codiceMezzo, istante, codiceFonte)
        {
            if (string.IsNullOrWhiteSpace(motivazione))
            {
                throw new ArgumentException("Cannot be null or whitespace", nameof(motivazione));
            }

            this.Motivazione = motivazione;
        }

        /// <summary>
        ///   E' la motivazione che giustifica la transizione di stato verso Fuori Servizio
        /// </summary>
        public string Motivazione { get; private set; }
    }
}
