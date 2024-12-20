import React, { Component, FC } from "react";
import { Column, Separator, Grow, Row } from "components/common";
import styled from "styled-components";
import { shadowLevels, shadowColors } from "shared-styles/shadows";
import { card_css } from "shared-styles/common";
import { spacings } from "shared-styles/spacings";
import { colors } from "shared-styles/colors";
import { SText } from "./SText";
import { textColors } from "shared-styles/text-colors";

export const PopMenu = styled(Column)`
    padding: ${ spacings._2 };
    border-radius: ${ spacings._1 };
    background-color: ${ colors.grey_1 };
    border: 1px solid ${ colors.grey_3 };
`

export const PopItem = styled(Row)`
    padding: ${ spacings._3 } 0;
    padding-right: ${ spacings._8 };
    text-indent: ${ spacings._1 };
    cursor: pointer;
    :hover {
        background-color: ${ colors.grey_2 };
    }
    transition: background-color 0.3s;
    & + & {
        border-top: 1px solid ${ colors.grey_3 };
    }
    color: ${ textColors.medium };
`