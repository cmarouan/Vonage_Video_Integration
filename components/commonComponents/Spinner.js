import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  
  border-top: 2px solid white;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  border-left: 3px solid white;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: white;
  margin: 0 0 0 50%;
`;

export default Spinner;