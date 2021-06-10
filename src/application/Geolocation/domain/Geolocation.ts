

export default class Geolocation {
    private readonly latitude: number;
    private readonly longitude: number;

    constructor(
        latitude: number, 
        longitude: number
    ) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    toPrimitives = (): GeolocationPrimitives => ({
        lat: this.latitude,
        lon: this.longitude
    });

    static fromString = (locationString: string) => {
        try {
            const [latString, lonString] = locationString.split(',');
            return new Geolocation(
                Number(latString),
                Number(lonString)
            );
        } catch(error) {
            return new Geolocation(0,0);
        }
    }
}

export interface GeolocationPrimitives {
    lat: number;
    lon: number;
}