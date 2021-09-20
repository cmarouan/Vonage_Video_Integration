import styled from 'styled-components';

const BadgeSmall = styled.small`
    display: inline-block;
    white-space: nowrap;
    vertical-align: middle;
    text-transform: uppercase;
    border-radius: 5px;
    background: linear-gradient(#e53e3e, #ff005e);
    color: white;
    padding: 0.3rem 0.55rem;
    font-weight: 600;
    width: 41px;
    width: 65px;
    text-align: center;
`;

export const Badge = ({ value }) => {
    return <BadgeSmall> {value} </BadgeSmall>;
};
