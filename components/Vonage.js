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
import { getAvailableDevices } from '../helpers/getDevices';

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
    const [outputDevice, setOutputDevice] = useState('');
    const [connection, setConnection] = useState(false);
    const [devices, setDevices] = useState({});
    const [error, setError] = useState('');
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

    const goLive = async (e, SESSION_ID, TOKEN) => {
        try {
            e.preventDefault();
            console.log('go live clicked');
            setLoading(true);
            await connectToSession(TOKEN, SESSION_ID, {
                callbackDisconnect: disconnect,
                callbackConnect: () => {
                    setConnection(true);
                    setLoading(false);
                },
                publisher,
                outputDevice,
            });
        } catch (error) {
            handleError(error);
        }
    };

    const disconnect = async (e) => {
        try {
            e.preventDefault();
            if (confirm('Do you really want to end you live !')) {
                await disconnectSession();
                setConnection(false);
                router.reload(window.location.pathname);
            }
        } catch (error) {
            handleError(error);
        }
    };

    const getDevicesAndInitPublisher = async () => {
        setError('');
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;
        navigator.getUserMedia(
            {
                video: true,
                audio: true,
            },
            async () => {
                const res = await navigator.mediaDevices.enumerateDevices();
                const formatedDevices = getAvailableDevices(res);
                const published = initPublisher();
                setPublisher(published);
                setDevices(formatedDevices);
            },
            (err) => {
                setDevices({});
                setError(
                    `The following error occurred: ${err?.name} ! please check your permission`
                );
            }
        );
    };

    useEffect(() => {
        getDevicesAndInitPublisher();
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
                goLive={(e) => goLive(e, SESSION_ID, TOKEN)}
                disconnect={(e) => disconnect(e)}
                connection={connection}
                loading={loading}
                setOutputDevice={setOutputDevice}
                devices={devices}
                error={error}
            />
        </>
    );
}
