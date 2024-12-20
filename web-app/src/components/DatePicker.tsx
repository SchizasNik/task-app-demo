import React, { FC } from "react";
import styled, { css } from "styled-components";
import _DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { colors } from "shared-styles/colors";
import { textColors } from "shared-styles/text-colors";
import { textSizes } from "shared-styles/text-sizes";
import { spacings } from "shared-styles/spacings";
import { format } from 'date-fns'

export const DatePicker = styled(_DatePicker)`
    width: 7.5rem;
    padding-top: ${ spacings._2 };
    padding-bottom: ${ spacings._2 };
    background-color: ${ colors.grey_2 };
    text-indent: ${ spacings._3 };
    border: 1px solid ${ colors.grey_3 };
    border-radius: ${ spacings._1 };
    color: ${ colors.grey_8 };
    font-size: ${ textSizes.primary };
    &::placeholder {
        color: ${ textColors.light };
    }
    :active, :focus {
        background-color: ${colors.grey_1};
        border-color: ${colors.accent_6};
    }
    transition: background-color 0.3s, border-color 0.3s;
`

export const formatDate = (date: Date) => format(date, 'yyyy-MM-dd')