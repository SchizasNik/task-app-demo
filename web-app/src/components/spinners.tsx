import React, { FC, Component } from 'react';
import styled from 'styled-components';

import { Spinner2 as Spinner2SVG } from '@styled-icons/icomoon/Spinner2'
import { colors } from 'shared-styles/colors';
import { abs_fill_css } from 'shared-styles/common';
import { zIndex } from 'shared-styles/zIndex';
import { spacings } from 'shared-styles/spacings';
import { rotate_css, fade_in_css } from 'shared-styles/animations';

const Shade = styled.div`
    ${ abs_fill_css }
    background-color: ${ colors.grey_10 }47;
    z-index: ${ zIndex.spinner };
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${ fade_in_css } 90ms;
`

const SpinnerIcon = styled(Spinner2SVG)`
    height: ${ spacings._8 };
    color: ${ colors.grey_1 };
    animation: ${rotate_css} 2s linear infinite;
`

export const ShadeSpinner: FC = () => (
    <Shade>
        <SpinnerIcon/>
    </Shade>
)

