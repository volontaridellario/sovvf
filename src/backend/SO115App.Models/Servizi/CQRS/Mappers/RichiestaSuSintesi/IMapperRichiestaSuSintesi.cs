﻿//-----------------------------------------------------------------------
// <copyright file="IMapperRichiestaSuSintesi.cs" company="CNVVF">
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
using SO115App.API.Models.Classi.Soccorso;
using SO115App.API.Models.Servizi.CQRS.Queries.GestioneSoccorso.Shared.SintesiRichiestaAssistenza;

namespace SO115App.API.Models.Servizi.CQRS.Mappers.RichiestaSuSintesi
{
    /// <summary>
    ///   Servizio di mapping di <see cref="RichiestaAssistenza" /> sul DTO <see cref="SintesiRichiesta" />.
    /// </summary>
    public interface IMapperRichiestaSuSintesi
    {
        /// <summary>
        ///   Esegue il mapping di <see cref="RichiestaAssistenza" /> sul DTO <see cref="SintesiRichiesta" />.
        /// </summary>
        /// <param name="richiesta">La richiesta da mappare</param>
        /// <returns>Il DTO risultante dal mapping</returns>
        SintesiRichiesta Map(RichiestaAssistenza richiesta);
    }
}