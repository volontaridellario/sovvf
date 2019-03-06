import { MezzoMarker } from '../../../maps/maps-model/mezzo-marker.model';

export class GetMezziMarkers {
    static readonly type = '[Mezzi Marker] Get Mezzi Marker';
}

export class SetMezziMarkers {
    static readonly type = '[Mezzi Marker] Set Mezzi Marker';

    constructor(public mezziMarkers: MezzoMarker[]) {
    }
}