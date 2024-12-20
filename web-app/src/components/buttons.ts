import styled, { css } from "styled-components";
import { spacings } from "shared-styles/spacings";
import { colors } from "shared-styles/colors";
import { textWeights } from "shared-styles/text-weights";
import { textColors } from "shared-styles/text-colors";
import { textSizes } from "shared-styles/text-sizes";

type ButtonProps = {
    disabled?: boolean
    small?: boolean
    mini?: boolean
    icon?: boolean
}

export const PrimaryButton = styled.button<ButtonProps>`
    border: none;
    font: unset;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${ spacings._1 };
    text-align: center;
    background-color: ${colors.accent_6};
    color: ${ colors.grey_1 };
    font-weight: ${ textWeights.bold };
    cursor: pointer;
    :hover {
        background-color: ${colors.accent_5};
    }
    :active {
        background-color: ${colors.accent_7};
    }
    transition: background-color 0.3s;
    opacity: ${ p => p.disabled ? '0.6' : 'unset' };
    pointer-events: ${ p => p.disabled ? 'none' : 'unset' };
    padding: ${ spacings._2 } ${ spacings._4 };
    ${ p => p.small && css`
        padding: ${ spacings._1 } ${ spacings._3 };
        font-size: ${ textSizes.secondary };
    `}
    ${ p => p.mini && css`
        padding: ${ spacings._1 };
    `}
    ${ p => p.icon && css`
        padding: ${ spacings._2 } ${ spacings._2 };
    `}
`

export const DefaultButton = styled(PrimaryButton)`
    background-color: ${ colors.grey_3 };
    color: ${ textColors.medium };
    :hover {
        background-color: ${colors.grey_4};
    }
    :active {
        background-color: ${colors.grey_5};
    }
`

export const StrippedButton = styled(PrimaryButton)`
    font-weight: ${ textWeights.bold };
    color: ${ textColors.medium };
    background-color: unset;
    :hover {
        background-color: ${colors.grey_2};
    }
    :active {
        background-color: ${colors.grey_4};
    }
`

export const DangerButton = styled(PrimaryButton)`
    background-color: ${ colors.danger_6 };
    :hover {
        background-color: ${colors.danger_7};
    }
    :active {
        background-color: ${colors.danger_8};
    }
`

export const SecondaryButton = styled(PrimaryButton)`
    color: ${ colors.accent_5 };
    background-color: ${ colors.grey_1 };
    border: 1px solid ${colors.accent_6};
    :hover {
        background-color: ${colors.grey_2};
    }
    :active {
        background-color: ${colors.grey_4};
    }
`