import styled, { css } from "styled-components"
import { Margins, FlexProps, cssMargins, flexProps, PositionProps } from "shared-styles/utils"
import { colors } from "shared-styles/colors"

export const Row = styled.div<Margins & FlexProps & PositionProps>`
    display: flex; 
    flex-direction: row;
    ${ p => cssMargins(p) } 
    ${ p => flexProps(p) }
    ${ p => p.relative && css`
        position: relative;
    `}
`

export const Column = styled(Row)`
    flex-direction: column;
`

export const Separator = styled.div<Margins>`
    min-height: 1px;
    background-color: ${ colors.grey_3 };
    align-self: stretch;
    ${ p => cssMargins(p) }
`

export const VSeparator = styled.div<Margins>`
    min-width: 1px;
    background-color: ${ colors.grey_3 };
    align-self: stretch;
    ${ p => cssMargins(p) }
`

export const Grow = styled.div`
    flex-grow: 1;
    position: relative;
`