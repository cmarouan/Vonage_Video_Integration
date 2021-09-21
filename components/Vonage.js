import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Adjusting from './Adjusting';
import Header from './Header';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import {
    initPublisher,
    connectToSession,
    disconnectSession,
} from '../helpers/useOpenTok';

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
    const { publicRuntimeConfig: { SESSION_ID, TOKEN } = {} } = getConfig();
    const router = useRouter();

    const handleError = (error) => {
        if (error) {
            console.error(error);
        }
    };

    const handleAudio = (status) => {
        publisher.publishAudio(status);
        setAudio(status);
    };

    const handleVideo = (status) => {
        publisher.publishVideo(status);
        setVideo(status);
    };

    const goLive = (SESSION_ID, TOKEN) => {
        try {
            setLoading(true);
            connectToSession(TOKEN, SESSION_ID, {
                callbackDisconnect: disconnect,
                callbackConnect: setConnection,
                publisher,
            });
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(true);
        }
    };

    const disconnect = () => {
        disconnectSession();
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
                goLive={() => goLive(SESSION_ID, TOKEN)}
                disconnect={disconnect}
                connection={connection}
                loading={loading}
            />
        </>
    );
}
