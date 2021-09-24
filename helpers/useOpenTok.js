import OT from '@opentok/client';
import getConfig from 'next/config';

const { publicRuntimeConfig: { API_KEY } = {} } = getConfig();

let session = {};

const handleError = (error) => {
    if (error) {
        console.error(error);
    }
    return error;
};

export const initPublisher = () => {
    const options = {
        insertMode: 'append',
        width: '100%',
        height: '100%',
        fitMode: 'cover',
        style: { buttonDisplayMode: 'off' },
    };

    return OT.initPublisher('publisher', options, handleError);
};

export const disconnectSession = async () => session.disconnect();

export const connectToSession = async (
    TOKEN,
    SESSION_ID,
    { publisher, callbackDisconnect, callbackConnect, outputDevice }
) => {
    try {
        session = OT.initSession(API_KEY, SESSION_ID);

        session.on('streamCreated', function streamCreated(event) {
            const subscriberOptions = {
                insertMode: 'append',
                width: '100%',
                height: '100%',
            };
            const subscriber = session.subscribe(
                event.stream,
                'subscriber',
                subscriberOptions,
                handleError
            );
            subscriber.on('videoElementCreated', (event) => {
                if (
                    typeof event.element.sinkId !== 'undefined' &&
                    outputDevice
                ) {
                    event.element
                        .setSinkId(outputDevice)
                        .then(() => {
                            console.log(
                                'successfully set the audio output device'
                            );
                        })
                        .catch((err) => {
                            console.error(
                                'Failed to set the audio output device ',
                                err
                            );
                        });
                } else {
                    console.warn(
                        'device does not support setting the audio output'
                    );
                }
            });
        });

        session.on('sessionDisconnected', function sessionDisconnected(event) {
            if (typeof callbackDisconnect === 'function') {
                callbackDisconnect();
            }
            console.log('You were disconnected from the swssion', event.reason);
        });

        return session.connect(TOKEN, function callback(error) {
            if (error) {
                handleError(error);
            } else {
                console.log('connected');
                session.publish(publisher, handleError);
                if (typeof callbackConnect === 'function') {
                    callbackConnect();
                }
            }
        });
    } catch (error) {
        return handleError(error);
    }
};

export const changeVideoSource = async (deviceId) => {
    try {
        const currentVideo = document.querySelector('video');
        const videoConstraints = {};
        
        if (deviceId === '') {
            videoConstraints.facingMode = 'environment';
        } else {
            videoConstraints.deviceId = { exact: deviceId };
        }
    
        const constraints = {
            video: videoConstraints,
            audio: true
        };
        
        currentVideo?.srcObject?.getTracks()?.forEach(track => {
            track.stop();
            track.enabled = false;
        });

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        currentVideo.srcObject = stream;
        
    } catch (error) {
        console.log(error?.message + error.name);
    }
};
