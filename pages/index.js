import styled from 'styled-components';
import dynamic from 'next/dynamic';
const Vonage = dynamic(() => import('../components/Vonage'), {
    ssr: false,
});

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100vh;

    @media (min-width: 1300px) {
        width: 60%;
        margin: 0;
    }
`;

export default function Home() {
    return (
        <Container>
            <Vonage />
        </Container>
    );
}
