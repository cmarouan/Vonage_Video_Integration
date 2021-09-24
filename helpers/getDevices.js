export const getAvailableDevices = (devices = []) => {
    const videoType = 'videoinput';
    const audioInputType = 'audioinput';
    const audiOutputType = 'audiooutput';

    const formatted = {
        videoDevices: devices?.filter(({ kind }) => kind === videoType),
        audioInputDevices: devices?.filter(
            ({ kind, deviceId }) =>
                kind === audioInputType && deviceId !== 'communications'
        ),
        audioOutputDevices: devices?.filter(
            ({ kind, deviceId }) =>
                kind === audiOutputType && deviceId !== 'communications'
        ),
    };

    if (!formatted?.audioOutputDevices?.length) {
        formatted.audioOutputDevices = [{
            deviceId: 'communications',
            kind: audiOutputType,
            label: 'Default'
        }]
    }

    return formatted;
};
