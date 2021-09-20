import OT from '@opentok/client';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Adjusting from './Adjusting';
import Header from './Header';
import getConfig from 'next/config';
import { useRouter } from 'next/router';

const Video = styled.div`
    height: 100vh;
    width: 100%;
    border-radius: 10px;
    position: relative;
`;

const Publisher = styled.div`
    height: 100%;
    border-radius: 10px;
`;

const Subscriber = styled.div`
    top: 53px;
    position: absolute;
    right: 7px;
    height: 175px;
    width: 140px;
`;

export default function Vonage() {
    const [publisher, setPublisher] = useState({});
    const [audio, setAudio] = useState(true);
    const [video, setVideo] = useState(true);
    const [loading, setLoading] = useState(false);
    const [connection, setConnection] = useState(false);
    const { publicRuntimeConfig: { API_KEY, SESSION_ID, TOKEN } = {} } =
        getConfig();
    const router = useRouter();

    const initSession = (API_KEY, SESSION_ID) =>
        OT.initSession(API_KEY, SESSION_ID);

    const session = useMemo(
        () => initSession(API_KEY, SESSION_ID),
        [API_KEY, SESSION_ID]
    );

    const handleError = (error) => {
        if (error) {
            console.error(error);
        }
    };

    const initPublisher = () => {
        const options = {
            insertMode: 'append',
            width: '100%',
            height: '100%',
            fitMode: 'cover',
            style: {buttonDisplayMode: 'off'}
        };

        return OT.initPublisher('publisher', options, handleError);
    };

    const handleAudio = (status) => {
        publisher.publishAudio(status);
        setAudio(status);
    };

    const handleVideo = (status) => {
        publisher.publishVideo(status);
        setVideo(status);
    };

    const goLive = () => {
        try {
            setLoading(true);
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

            session.on(
                'sessionDisconnected',
                function sessionDisconnected(event) {
                    disconnect();
                    console.log(
                        'You were disconnected from the swssion',
                        event.reason
                    );
                }
            );

            session.connect(TOKEN, function callback(error) {
                if (error) {
                    handleError(error);
                } else {
                    session.publish(publisher, handleError);
                    setConnection(true);
                }
            });
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(true)
        }
    };

    const disconnect = () => {
        session.disconnect();
        setConnection(false);
        router.reload(window.location.pathname);
    };

    useEffect(() => {
        const published = initPublisher();
        setPublisher(published);
    }, []);

    return (
        <>
            <Video>
                <Publisher id="publisher" />
                <Subscriber id="subscriber" />
            </Video>
            {!connection && <Header />}
            <Adjusting
                videoStatus={video}
                audioStatus={audio}
                handleAudio={handleAudio}
                handleVideo={handleVideo}
                publisher={publisher}
                goLive={goLive}
                disconnect={disconnect}
                connection={connection}
                loading={loading}
            />
        </>
    );
}
