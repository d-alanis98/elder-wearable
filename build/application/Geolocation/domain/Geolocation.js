"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Geolocation {
    constructor(latitude, longitude) {
        this.toPrimitives = () => ({
            lat: this.latitude,
            lon: this.longitude
        });
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
exports.default = Geolocation;
Geolocation.fromString = (locationString) => {
    try {
        const [latString, lonString] = locationString.split(',');
        return new Geolocation(Number(latString), Number(lonString));
    }
    catch (error) {
        return new Geolocation(0, 0);
    }
};
