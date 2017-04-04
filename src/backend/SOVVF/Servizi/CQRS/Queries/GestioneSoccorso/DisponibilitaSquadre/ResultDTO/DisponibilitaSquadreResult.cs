﻿//-----------------------------------------------------------------------
// <copyright file="DisponibilitaSquadreResult.cs" company="CNVVF">
// Copyright (C) 2017 - CNVVF
// </copyright>
//-----------------------------------------------------------------------
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
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

using System.Collections.Generic;
using Modello.Servizi.CQRS.Queries.GestioneSoccorso.DisponibilitaSquadre.ResultDTO;

namespace Modello.Servizi.CQRS.Queries.GestioneSoccorso.DisponibilitaSquadre
{
    /// <summary>
    ///   DTO che restituisce l'elenco delle squadre disponibili.
    /// </summary>
    public class DisponibilitaSquadreResult
    {
        /// <summary>
        ///   Contiene le informazioni relativamente alle squadre disponibili.
        /// </summary>
        public IEnumerable<SquadraDisponibile> Squadre { get; set; }
    }
}
