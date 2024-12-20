import React, { Component, FC } from 'react';
import { SText } from 'components/SText';
import { Column } from 'components/common';
import { spacings } from 'shared-styles/spacings';

export const Home: FC = o => (
    <Column>
        <SText h1 dark bold left={ spacings._6 } top={ spacings._7 }>Welcome</SText>
    </Column>
)