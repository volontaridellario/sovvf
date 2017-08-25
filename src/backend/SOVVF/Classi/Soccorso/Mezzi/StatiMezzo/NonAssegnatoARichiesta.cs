﻿//-----------------------------------------------------------------------
// <copyright file="NonAssegnatoARichiesta.cs" company="CNVVF">
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
using System.Diagnostics.CodeAnalysis;

namespace Modello.Classi.Soccorso.Mezzi.StatiMezzo
{
    [SuppressMessage("StyleCop.CSharp.ReadabilityRules", "SA1126:PrefixCallsCorrectly", Justification = "https://stackoverflow.com/questions/37189518/stylecop-warning-sa1126prefixcallscorrectly-on-name-of-class")]

    /// <summary>
    ///   Questo stato ha senso con riferimento ad una precisa <see cref="RichiestaAssistenza" /> per
    ///   la quale il mezzo non è ancora stato assegnato. L'unica transizione valida da questo stato
    ///   è la composizione partenza.
    /// </summary>
    public class NonAssegnatoARichiesta : AbstractStatoMezzo
    {
        /// <summary>
        ///   Il codice identificativo dello stato
        /// </summary>
        public override string Codice
        {
            get
            {
                return nameof(NonAssegnatoARichiesta);
            }
        }

        /// <summary>
        ///   Indica se il mezzo è disponibile in questo stato
        /// </summary>
        public override bool Disponibile
        {
            get
            {
                throw new InvalidOperationException("Non è possibile valutare la disponibilità di un mezzo nello stato sconosciuto");
            }
        }

        /// <summary>
        ///   In questo stato il mezzo non è assegnato alla richiesta
        /// </summary>
        public override bool AssegnatoARichiesta
        {
            get
            {
                return false;
            }
        }
    }
}