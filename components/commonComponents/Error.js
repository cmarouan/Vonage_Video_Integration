import styled from 'styled-components';

const ErrorComponent = styled.small`
    background: red;
    position: absolute;
    top: 88%;
    width: 88%;
    margin: 1rem;
    text-align: center;
    padding: 1rem 0px;
    color: white;
    font-weight: 100;
    border-radius: 5px;
`;

export const Error = ({ value }) => {
    return <ErrorComponent> {value} </ErrorComponent>;
};
