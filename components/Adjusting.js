import styled from 'styled-components';
import { FiVideo, FiVideoOff } from 'react-icons/fi';
import { BsFillMicFill, BsFillMicMuteFill, BsMic } from 'react-icons/bs';
import { AiFillSound } from 'react-icons/ai';
import { MdCallEnd } from 'react-icons/md';
import { Error } from './commonComponents/Error';
import {
    SimpleButton,
    IconButton,
    CircleButton,
} from './commonComponents/Buttons';
import { DropDown } from './commonComponents/DropDowns';
import Spinner from './commonComponents/Spinner';
import { changeVideoSource } from '../helpers/useOpenTok';
const AdjustingContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    width: 42vh;
    margin: 1rem;
    width: 91%;
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
    setOutputDevice,
    devices,
    error
}) {
    if (
        devices?.videoDevices?.length > 0 ||
        devices?.audioInputDevices?.length > 0
    ) {
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
                                    changeVideoSource(e.target.value)
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
                                    setOutputDevice(e.target.value)
                                }
                                options={devices?.audioOutputDevices}
                            />
                        </Item>
                        <Item style={{ textAlign: 'center' }}>
                            <SimpleButton
                                disabled={loading}
                                value={loading ? <Spinner /> : 'Go live'}
                                onClick={(e) => goLive(e)}
                            />
                        </Item>
                    </ListsContainer>
                )}
                {connection && (
                    <Item style={{ textAlign: 'center', marginTop: '25vh' }}>
                        <CircleButton
                            disabled={!connection}
                            onClick={(e) => disconnect(e)}
                            icon={<MdCallEnd />}
                        />
                    </Item>
                )}
            </AdjustingContainer>
        );
    }
    if (error?.length) return <Error value={error} />;
    return null;
}
