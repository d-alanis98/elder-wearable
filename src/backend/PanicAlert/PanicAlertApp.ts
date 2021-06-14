//use cases

//Base app
import App from '../App';


export default class PanicAlertApp extends App {
    constructor() {
        super(PanicAlertApp.name);
    }

    public start = async () => {
        try {
            console.log('Started');
            
        } catch(error) {
            this.logger.error(error.message);
        }
    }
}