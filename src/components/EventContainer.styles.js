import styled, { keyframes } from "styled-components";
import { eventColors } from "../constants";

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export default styled.div`
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
`;

export const EventBlock = styled.div`
  width: calc(100%/${props => props.count.val});
  height: calc((100%)/${props => props.numberOfSlots + 1} *4);
  background: ${props => eventColors[props.type] || "rgba(255, 99, 71, 0.4)"};
  position: absolute;
  top: calc((100%)/${props => props.numberOfSlots + 1} * ${props => props.hourDelta});
  left: calc((100%/${props => props.count.val}) * ${props => props.position - 1});
  animation: 0.5s ${fadeIn} ease;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);


  color: white;

  .type-label {
    font-family: Lato;
    font-size: 20px;
  }

  .material-icons {
    position: absolute;
    top: 10px;
    right: 10px;

    &:hover {
      cursor: pointer;
      transform: scale(1.5);
      font-weight: bold;
      transition: 300ms all ease;
    }
  }
`;

export const TypeBtn = styled.button`
  outline: none;
  border: none;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: white;
    background: ${props => eventColors[props.type]};
    opacity: 1 !important;
  }
`;
