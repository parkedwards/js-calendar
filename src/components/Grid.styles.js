import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  .time-slot {
    flex-grow: 1;
    border-top: 1px dotted black;
  }

  .time-slot span {
    cursor: pointer;
  }
`;
