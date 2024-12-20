import styled from "styled-components";

export const TextLimit = styled.div<{w:number}>`
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: ${p => p.w}rem;
`