import Logger from '../../Shared/domain/Logger/Logger';
import CommandExecutor from '../../Shared/infrastructure/ChildProcess/ChildProcess'




export default class PanicAudioRecorder {
    private readonly logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    public run = async () => {
        await this.executeRecording();
    };

    private executeRecording = async () => {
        try {
            this.logger.info('Recording audio')
            await new CommandExecutor('arecord -d 5 -f cd /home/pi/.tmp/temp.wav')
                .execute()
            this.logger.info('Audio recorded')
        } catch(error) {
            this.logger.error(error.message);
            process.exit(1);
        }
    };
}