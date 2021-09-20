import styled from "styled-components";
import { AiOutlineRight } from 'react-icons/ai';


const SelectContainer = styled.div`
    width: 100%;
    height: fit-content;
    position: relative;
`;

const Icon = styled.div`
    width: 1.5rem;
    height: 100%;
    left: 0.5rem;
    position: absolute;
    color: currentColor;
    font-size: 1.25rem;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    pointer-events: none;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 29px;
`;

const IconRight = styled.div`
    width: 1.5rem;
    height: 100%;
    right: 0.5rem;
    position: absolute;
    color: currentColor;
    font-size: 1.25rem;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    pointer-events: none;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 29px;
`;

const Select = styled.select`
    width: 100%;
    min-width: 0px;
    outline: 2px solid transparent;
    outline-offset: 2px;
    position: relative;
    appearance: none;
    background: inherit;
    padding-bottom: 1px;
    font-size: large;
    padding-inline-start: 20px;
    padding-inline-end: 2rem;
    height: 3.2rem;
    border-radius: 5px;
    border: 1px solid;
    border-color: #cecece;
    padding: 0 83px 0 45px;
`;

export const DropDown = ({
    onChange,
    options,
    icon
}) => {
    return (
        <SelectContainer onChange={onChange}>
            <Icon>{ icon }</Icon>
            <Select>
                {options?.map(({ label, deviceId }) => (
                    <option key={deviceId} value={deviceId}>
                        {label} 
                    </option>
                ))}
            </Select>
            <IconRight><AiOutlineRight /></IconRight>
        </SelectContainer>
    )
}
