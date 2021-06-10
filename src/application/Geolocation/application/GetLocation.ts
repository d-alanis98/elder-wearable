import axios from 'axios';
//Domain
import Geolocation from '../domain/Geolocation';

export default class GetLocation {

    public run = async (): Promise<Geolocation> => {
        const geolocation: Geolocation = await this.getIPLocation();
        return geolocation;
    }

    private getIPLocation = async () => {
        const response = await axios.get('https://ipinfo.io/json');
        const { loc: locationString } = response.data;
        return Geolocation.fromString(locationString);
    }
}

