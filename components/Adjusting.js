import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiVideo, FiVideoOff } from 'react-icons/fi';
import { BsFillMicFill, BsFillMicMuteFill, BsMic } from 'react-icons/bs';
import { AiFillSound } from 'react-icons/ai';
import { MdCallEnd } from 'react-icons/md';
import { getAvailableDevices } from '../helpers/getDevices';
import {
    SimpleButton,
    IconButton,
    CircleButton,
} from './commonComponents/Buttons';
import { DropDown } from './commonComponents/DropDowns';
import Spinner from './commonComponents/Spinner';

const AdjustingContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    width: 42vh;
    margin: 1rem;
    height: 34vh;
`;

const ButtonsContainer = styled.div`
    margin: 0.5rem;
    display: flex;
`;

const ListsContainer = styled.div`
    background: white;
    padding: 0.5rem;
    border-radius: 10px;
`;

const Item = styled.div`
    margin: 0.2rem 0;
`;

export default function Adjusting({
    videoStatus,
    audioStatus,
    handleAudio,
    handleVideo,
    goLive,
    disconnect,
    connection,
    publisher,
    loading,
}) {
    const [devices, setDevices] = useState({});

    const getDevices = async () => {
        const res = await navigator.mediaDevices.enumerateDevices();
        const formatedDevices = getAvailableDevices(res);
        setDevices(formatedDevices);
    };

    useEffect(() => {
        getDevices();
    }, []);

    if (!devices?.audioInputDevices) return null;
    return (
        <AdjustingContainer>
            {!connection && (
                <ButtonsContainer>
                    <IconButton
                        icon={videoStatus ? <FiVideo /> : <FiVideoOff />}
                        onClick={() => handleVideo(!videoStatus)}
                    />
                    <IconButton
                        icon={
                            audioStatus ? (
                                <BsFillMicFill />
                            ) : (
                                <BsFillMicMuteFill />
                            )
                        }
                        onClick={() => handleAudio(!audioStatus)}
                    />
                </ButtonsContainer>
            )}
            {!connection && (
                <ListsContainer>
                    <Item>
                        <DropDown
                            icon={<FiVideo />}
                            onChange={(e) =>
                                publisher.setVideoSource(e.target.value)
                            }
                            options={devices?.videoDevices}
                        />
                    </Item>
                    <Item>
                        <DropDown
                            icon={<BsMic />}
                            onChange={(e) =>
                                publisher.setAudioSource(e.target.value)
                            }
                            options={devices?.audioInputDevices}
                        />
                    </Item>
                    <Item>
                        <DropDown
                            icon={<AiFillSound />}
                            onChange={(e) =>
                                publisher.setAudioSource(e.target.value)
                            }
                            options={devices?.audioOutputDevices}
                        />
                    </Item>
                    <Item style={{ textAlign: 'center' }}>
                        <SimpleButton
                            value={loading ? <Spinner /> : 'Go live'}
                            onClick={() => goLive()}
                        />
                    </Item>
                </ListsContainer>
            )}
            {connection && (
                <Item style={{ textAlign: 'center', marginTop: '25vh' }}>
                    <CircleButton
                        onClick={() => disconnect()}
                        icon={<MdCallEnd />}
                    />
                </Item>
            )}
        </AdjustingContainer>
    );
}
