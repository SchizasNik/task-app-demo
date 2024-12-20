import { Margins, cssMargins } from "shared-styles/utils"
import { spacings } from "shared-styles/spacings"
import { colors } from "shared-styles/colors"
import styled, { css } from "styled-components"
import { textSizes } from "shared-styles/text-sizes"
import { textColors } from "shared-styles/text-colors"

export type InputProps = {
    grow?: boolean
    width?: string
}

export const Input = styled.input<Margins & InputProps & {danger?: boolean}>`
    padding-top: ${ spacings._2 };
    padding-bottom: ${ spacings._2 };
    background-color: ${ colors.grey_2 };
    text-indent: ${ spacings._3 };
    border: 1px solid ${ colors.grey_3 };
    border-radius: ${ spacings._1 };
    color: ${ colors.grey_8 };
    font-size: ${ textSizes.primary };
    &::placeholder {
        color: ${ textColors.light };
    }
    :active, :focus {
        background-color: ${colors.grey_1};
        border-color: ${colors.accent_6};
        ${ p => p.danger && css`
        border-color: ${ colors.danger_6 };` }
    }
    transition: background-color 0.3s, border-color 0.3s;
    ${ p => p.grow && css`
    flex-grow: 1;` }
    ${ p => p.width && css`
    width: ${ p.width };` }
    ${ p => p.danger && css`
    border-color: ${ colors.danger_6 };` }
    ${ p => cssMargins(p) }
`