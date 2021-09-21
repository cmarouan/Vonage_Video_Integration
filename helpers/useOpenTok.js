import OT from '@opentok/client';
import getConfig from 'next/config';

const { publicRuntimeConfig: { API_KEY } = {} } = getConfig();

let session = {};

const handleError = (error) => {
    if (error) {
        console.error(error);
    }
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

export const disconnectSession = () => session.disconnect();

export const connectToSession = (
    TOKEN, SESSION_ID,
    { publisher, callbackDisconnect, callbackConnect }
) => {
    try {
        session = OT.initSession(API_KEY, SESSION_ID);
        session.on('streamCreated', function streamCreated(event) {
            const subscriberOptions = {
                insertMode: 'append',
                width: '100%',
                height: '100%',
            };
            session.subscribe(
                event.stream,
                'subscriber',
                subscriberOptions,
                handleError
            );
        });

        session.on('sessionDisconnected', function sessionDisconnected(event) {
            if (typeof callbackDisconnect === 'function') {
                callbackDisconnect();
            }
            console.log('You were disconnected from the swssion', event.reason);
        });

        session.connect(TOKEN, function callback(error) {
            if (error) {
                handleError(error);
            } else {
                session.publish(publisher, handleError);
                if (typeof callbackConnect === 'function') {
                    callbackConnect(true);
                }
            }
        });
    } catch (error) {
        handleError(error);
    }
};
