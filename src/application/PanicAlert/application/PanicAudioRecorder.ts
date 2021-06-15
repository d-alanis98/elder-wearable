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
        this.logger.info('Recording audio')
        await new CommandExecutor('arecord -d 5 -f cd .tmp/temp.wav')
            .execute()
        this.logger.info('Audio recorded')
    };
}