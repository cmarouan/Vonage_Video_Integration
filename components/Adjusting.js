import { useState, useEffect } from 'react';
import { Select, Button, IconButton } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/layout';
import styled from 'styled-components';
import { FiVideo, FiVideoOff } from 'react-icons/fi';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import { AiFillSound } from 'react-icons/ai';
import { getAvailableDevices } from '../helpers/getDevices';

const AdjustingContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    width: 92%;
    margin: 1rem;
    height: 34vh;
`;

const ButtonsContainer = styled.div`
    margin: 0.5rem;
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
            <ButtonsContainer>
                <Stack direction="row" spacing={4}>
                    <IconButton
                        aria-label="Video"
                        icon={videoStatus ? <FiVideo /> : <FiVideoOff />}
                        background="linear-gradient(#e53e3e, #ff005e)"
                        size="lg"
                        color="white"
                        onClick={() => handleVideo(!videoStatus)}
                    />
                    <IconButton
                        aria-label="Mic"
                        icon={
                            audioStatus ? (
                                <BsFillMicFill />
                            ) : (
                                <BsFillMicMuteFill />
                            )
                        }
                        background="linear-gradient(#e53e3e, #ff005e)"
                        size="lg"
                        color="white"
                        onClick={() => handleAudio(!audioStatus)}
                    />
                </Stack>
            </ButtonsContainer>
            <ListsContainer>
                <Item>
                    <Select
                        size="lg"
                        icon={<FiVideo />}
                        onChange={(e) =>
                            publisher.setVideoSource(e.target.value)
                        }
                    >
                        {devices?.videoDevices?.map(({ label, deviceId }) => (
                            <option key={deviceId} value={deviceId}>
                                {label}
                            </option>
                        ))}
                    </Select>
                </Item>
                <Item>
                    <Select
                        size="lg"
                        icon={<BsFillMicFill />}
                        onChange={(e) =>
                            publisher.setAudioSource(e.target.value)
                        }
                    >
                        {devices?.audioInputDevices?.map(
                            ({ label, deviceId }) => (
                                <option key={deviceId} value={deviceId}>
                                    {label}
                                </option>
                            )
                        )}
                    </Select>
                </Item>
                <Item>
                    <Select
                        size="lg"
                        icon={<AiFillSound />}
                        onChange={(e) =>
                            publisher.setAudioSource(e.target.value)
                        }
                    >
                        {devices?.audioOutputDevices?.map(
                            ({ label, deviceId }) => (
                                <option key={deviceId} value={deviceId}>
                                    {label}
                                </option>
                            )
                        )}
                    </Select>
                </Item>
                <Item>
                    {!connection ? (
                        <Button
                            background="linear-gradient(#e53e3e, #ff005e)"
                            colorScheme="pink"
                            variant="solid"
                            size="lg"
                            width="100%"
                            onClick={() => goLive()}
                        >
                            Go live
                        </Button>
                    ) : (
                        <Button
                            background="linear-gradient(#e53e3e, #ff005e)"
                            variant="solid"
                            size="lg"
                            width="100%"
                            onClick={() => disconnect()}
                        >
                            End live
                        </Button>
                    )}
                </Item>
            </ListsContainer>
        </AdjustingContainer>
    );
}
