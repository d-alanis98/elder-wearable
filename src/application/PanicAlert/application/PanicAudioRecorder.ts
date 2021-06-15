import CommandExecutor from '../../Shared/infrastructure/ChildProcess/ChildProcess'




export default class PanicAudioRecorder {
    
    public run = async () => {
        await this.executeRecording();
    };

    private executeRecording = async () => {
        await new CommandExecutor('arecord -d 5 -f cd .tmp/temp.wav')
            .execute()
    };
}