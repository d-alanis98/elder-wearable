//Domain
import Geolocation from '../domain/Geolocation';
//Shared domain
import Logger from '../../Shared/domain/Logger/Logger';
//Use cases
import GetLocation from './GetLocation';
import SendLocation from './SendLocation';
//Configuration
import app from '../../../configuration/app';

export default class LocationInterval {
    private readonly logger: Logger;
    private interval: NodeJS.Timeout | null;

    constructor(logger: Logger) {
        this.logger = logger;
        this.interval = null;
    }

    public run = () => {
        this.interval = setInterval(async () => {
            const location: Geolocation = await new GetLocation().run();
            await new SendLocation(
                this.logger,
                location
            ).run();
        }, app.refreshInterval * 1000);

    }

    public stop = () => {
        this.interval && clearInterval(this.interval);
    }
}