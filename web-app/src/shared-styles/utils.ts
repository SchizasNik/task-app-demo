import { css } from "styled-components"

export type FlexProps = {
    'end_content'?: boolean
    'center_align'?: boolean
    'center_content'?: boolean
    'end_align'?: boolean
    'space_between'?: boolean
    'grow'?: boolean
}

export type Margins = {
    top?: string
    left?: string
    right?: string
    bottom?: string
    padding?: string
}

export type PositionProps = {
    relative?: boolean
}

export const cssMargins = (p: Margins) => {
    return css`
        ${ p.top && css`
        margin-top: ${ p.top }; `}
        ${ p.left && css`
        margin-left: ${ p.left }; `}
        ${ p.right && css`
        margin-right: ${ p.right }; `}
        ${ p.bottom && css`
        margin-bottom: ${ p.bottom }; `}
        ${ p.padding && css`
        padding: ${ p.padding }; `}
    `
}

export const flexProps = (p: FlexProps) => {
    return css`
        ${ p["center_align"] && css`
        align-items: center; `}
        ${ p["end_align"] && css`
        align-items: flex-end; `}
        ${ p["space_between"] && css`
        justify-content: space-between; `}
        ${ p["center_content"] && css`
        justify-content: center; `}
        ${ p["end_content"] && css`
        justify-content: flex-end; `}
        ${ p["grow"] && css`
        flex-grow: 1; `}
    `
}