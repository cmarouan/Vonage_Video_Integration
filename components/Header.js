import styled from 'styled-components';
import { WiDirectionLeft } from 'react-icons/wi';
import { Badge } from '../components/commonComponents/Badge';

const HeaderContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    padding: 1rem 0 0 0;
`;

const HeaderTopContainer = styled.div`
    display: flex;
    color: white;
    justify-content: space-between;
    padding: 0.2rem 1rem;
    font-size: 1rem;
    width: 100%;
`;

const HeaderTime = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 1rem;
    margin-top: 1rem;
`;

const BackContainer = styled.div`
    display: flex;
    font-size: 1.5rem;
`;

const BackText = styled.div`
    font-size: 1rem;
`;

const Title = styled.div`
    width: 27%;
`;

const Description = styled.div`
    padding: 0.2rem 1rem;
    color: white;
    font-size: 1rem;
    font-weight: 500;
`;

const Shadow = styled.div`
    box-shadow: -20px -3px 20px 20px #0000007a;
`;

export default function Header() {
    const date = new Date();

    return (
        <HeaderContainer>
            <Shadow />
            <HeaderTopContainer>
                <BackContainer>
                    <WiDirectionLeft />
                    <BackText style={{}}> Back </BackText>
                </BackContainer>
                <Title>Go live</Title>
                <div />
            </HeaderTopContainer>
            <HeaderTime>
                <Badge
                    value={`${date.getHours()}:${date.getMinutes()}`}
                    style={{ padding: '.5rem' }}
                />
            </HeaderTime>
            <Description>
                This video call developed with NextJs/Vonage API
            </Description>
        </HeaderContainer>
    );
}
