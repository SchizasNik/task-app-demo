import React, { Component } from 'react';
import { colors } from "shared-styles/colors"
import { spacings } from "shared-styles/spacings"
import { Row } from "./common"
import styled from "styled-components"
import { FC } from "react"
import { SText } from "./SText"

const Wrap = styled(Row)`
    background-color: ${ colors.grey_1 };
    padding: ${ spacings._4 } ${ spacings._7 };
`

export const HeaderRow: FC = p => (
    <Wrap>
        <SText h2 dark bold>
            { p.children }
        </SText>
    </Wrap>
)