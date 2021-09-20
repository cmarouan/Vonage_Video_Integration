import styled from "styled-components";

const Button = styled.button`
    background: linear-gradient(#e53e3e, #ff005e);
    width: 100%;
    height: 50px;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    border: none;
    font-size: 16px;
    cursor: pointer;
`;

const ButtonWithIcon = styled.button`
    background: linear-gradient(#e53e3e,#ff005e);
    height: 50px;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    padding: 1rem;
    margin-right: .5rem;
    border: none;
    font-size: 18px;
    cursor: pointer;
`;

const ButtonSmall = styled.button`
    background: linear-gradient(#e53e3e,#ff005e);
    width: 100%;
    height: 50px;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    padding: 1rem;
    border: none;
    cursor: pointer;

`;

const ButtonCircle = styled.button`
    background: linear-gradient(#e53e3e,#ff005e);
    height: 62px;
    border-radius: 50%x;
    color: white;
    font-weight: 600;
    padding: 1rem;
    border: none;
    cursor: pointer;
    width: 100px;
    border-radius: 50px;
    font-size: 27px;
`;

export const SimpleButton = ({
    onClick,
    value
}) => {
    return (
        <Button onClick={onClick}> {value} </Button>
    )
}

export const IconButton = ({
    onClick,
    icon
}) => {
    return (
        <ButtonWithIcon onClick={onClick}> {icon} </ButtonWithIcon>
    )
}

export const SmallButton = ({
    onClick,
    icon
}) => {
    return (
        <ButtonSmall onClick={onClick}> {icon} </ButtonSmall>
    )
}

export const CircleButton = ({
    onClick,
    icon
}) => {
    return (
        <ButtonCircle onClick={onClick}> {icon} </ButtonCircle>
    )
}