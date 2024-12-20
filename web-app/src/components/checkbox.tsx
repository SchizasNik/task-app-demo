import React, { FC } from 'react';
import styled, { css } from 'styled-components'
import { colors } from 'shared-styles/colors';

const Checkmark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 14px;
    width: 14px;
    background-color: white;
    border: solid 1px ${ colors.grey_5 };
    border-radius:4px;
    :after {
        content: "";
        position: absolute;
        display: none;
    }
    :after {
        left: 4px;
        top: 1px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }                
`

const Input = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    :hover + ${Checkmark} {
        background-color: ${ colors.accent_1 };
        border: 1px solid  ${ colors.accent_3 };

    }      
    &:checked + ${Checkmark} {
        background-color:${ colors.accent_6 };
        border: 1px solid  ${ colors.accent_7 };

    }
    &:checked + ${Checkmark}:after {
        display: block;
    }
        
`

const Container = styled.label`    
    display: block;
    position: relative;
    padding-left: 24px;
    cursor: pointer;
    font-size: 14px;
    height: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    /* width: max-content; */
    /* padding-right: 8px; */
`

type Props = {
    disabled?: boolean
    checked: boolean,
    text: string,
    className?: string,
    onChange(checked: boolean)
}

export const Checkbox: FC<Props> = p => (        
    <Container className={p.className}>{p.text}
        <Input type="checkbox"
            disabled={p.disabled}    
            checked={p.checked}
            onChange={e => p.onChange(e.target.checked)}/>
        <Checkmark/>
    </Container>
)