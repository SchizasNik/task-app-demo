import { keyframes } from 'styled-components'

export const fade_in_css = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`

export const rotate_css = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;