import { Margins, cssMargins } from "shared-styles/utils"
import styled, { css } from "styled-components"
import { textColors } from "shared-styles/text-colors"
import { colors } from "shared-styles/colors"
import { textWeights } from "shared-styles/text-weights"
import { textSizes } from "shared-styles/text-sizes"

type TextColorType = {
    white?: boolean,
    dark?: boolean,
    medium?: boolean,
    light?: boolean,
    disabled?: boolean,
    link?: boolean,
    success?: boolean,
    danger?: boolean,
    warning?: boolean,
    info?: boolean,
}

const text_color_props: (keyof TextColorType)[] = [
    'white',
    'dark',
    'medium',
    'light',
    'disabled',
    'link',
    'success',
    'danger',
    'warning',
    'info',
]

type TextSizeType = {
    small?: boolean,
    primary?: boolean,
    secondary?: boolean,
    h1?: boolean,
    h2?: boolean,
    h3?: boolean,
}

const text_size_props: (keyof TextSizeType)[] = [
    'small',
    'primary',
    'secondary',
    'h1',
    'h2',
    'h3',
]

type TextWeightType = {
    bold?: boolean,
}

const text_weight_props: (keyof TextWeightType)[] = [
    'bold',
]

type TextType = {
    center?: boolean
    inline?: boolean
}

type STextProps = TextColorType 
                    & TextSizeType 
                    & TextWeightType 
                    & TextType 
                    & Margins

export const SText = styled.span<STextProps>`
${ p => cssMargins(p) }
${ p => {
    const color_prop = text_color_props.find(prop => p[prop] || false)
    return color_prop && css`
    color: ${textColors[color_prop]};
        ${ color_prop == 'link' && css`
            :hover {
                cursor: pointer;
                color: ${ colors.accent_7 };
            }
        ` }
    ` } }
${ p => {
    const size_prop = text_size_props.find(prop => p[prop] || false)
    return size_prop && css`
    font-size: ${textSizes[size_prop]};
    `
} }
${ p => {
    const weight_prop = text_weight_props.find(prop => p[prop] || false)
    return weight_prop && css`
    font-weight: ${textWeights[weight_prop]};
    ` } }
${ p => p.center && css`
    text-align: center;
` }
${ p => p.inline && css`
    display: inline-block;
` }
`