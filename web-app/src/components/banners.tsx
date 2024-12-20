import React, { Component } from 'react';
import { Row, Column, Separator, Grow, VSeparator } from 'components/common';
import styled, { css } from 'styled-components';
import { textSizes } from 'shared-styles/text-sizes';
import { colors } from 'shared-styles/colors';
import { spacings } from 'shared-styles/spacings';
import { textWeights } from 'shared-styles/text-weights';

const Banner = styled.div<{type: 'success' | 'accent' | 'info'}>`
    border: 1px solid;
    height: min-content;
    font-size: ${ textSizes.small };
    font-weight: ${ textWeights.bold };
    color: ${ colors.grey_1 };
    border-radius: ${ spacings._1 };
    padding: ${ spacings._0 };
    min-width: 3rem;
    display: flex;
    justify-content: center;
    ${ p => p.type == 'success' && css`
        background-color: ${ colors.success_6 };
        border-color: ${ colors.success_7 };
    `}
    ${ p => p.type == 'accent' && css`
        background-color: ${ colors.accent_6 };
        border-color: ${ colors.accent_7 };
    `}
    ${ p => p.type == 'info' && css`
        background-color: ${ colors.info_6 };
        border-color: ${ colors.info_7 };
    `}
`

export const UserBanner = <Banner type='info'>User</Banner>

export const ManagerBanner = <Banner type='success'>Manager</Banner>

export const AdminBanner = <Banner type='accent'>Admin</Banner>