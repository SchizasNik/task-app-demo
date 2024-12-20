import React, { Component, FC } from 'react';
import { PrimaryButton, DefaultButton } from 'components/buttons';

type Props = {
    className?: string
    selected?: boolean
    disabled?: boolean
    onClick?()
}

export const OptionButton: FC<Props> = p => {
    const { selected, children, ...props } = p
    if ( selected ) {
        return (
            <PrimaryButton {...props} small >
                { children }
            </PrimaryButton>
        )
    }
    return (
        <DefaultButton {...props} small >
            { children }
        </DefaultButton>
    )
}