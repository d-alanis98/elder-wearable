import Geolocation, { GeolocationPrimitives } from '../../Geolocation/domain/Geolocation';

export default class PanicAlert {
    private readonly location: Geolocation;

    constructor(location: Geolocation) {
        this.location = location;
    }

    toPrimitives = (): PanicAlertPrimitives => ({
        location: this.location.toPrimitives(),
    });
}

export interface PanicAlertPrimitives {
    location: GeolocationPrimitives;
}