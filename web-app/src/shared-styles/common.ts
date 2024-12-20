import { css } from "styled-components";
import { spacings } from "./spacings";
import { shadowLevels, shadowColors } from "./shadows";
import { colors } from "./colors";

export const card_css = css`
    padding: ${ spacings._4 };
    box-shadow: ${ shadowLevels.shadow_1 } ${ shadowColors.medium };
    border-radius: ${ spacings._1 };
    background-color: ${ colors.grey_1 };
`

export const light_card_css = css`
    border: 1px solid ${colors.grey_4};
    border-radius: ${ spacings._1 };
    padding: ${ spacings._2 } ${ spacings._4 };
`

export const flex_center_css = css`
    justify-content: center;
    align-items: center;
`

export const abs_fill_css = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`