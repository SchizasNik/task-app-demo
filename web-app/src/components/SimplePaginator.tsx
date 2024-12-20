import React, { Component, FC } from "react";
import styled, { css } from 'styled-components';
import { colors } from "shared-styles/colors";
import { spacings } from "shared-styles/spacings";
import { Row } from "./common";
import { DefaultButton } from "./buttons";
import { SText } from "./SText";
import { LeftArrowIcon, RightArrowIcon } from 'components/icons'


type Props = {
    toPage(page: number)
    page: number
    page_size: number
    total: number
}

export const SimplePaginator: FC<Props> = p => {
    const { toPage, page, page_size, total } = p
    let first_index = (page - 1) * page_size + 1
    if ( first_index > total ) {
        first_index = total
    }
    let last_index = page * page_size
    if ( last_index > total ) {
        last_index = total
    }
    const has_previous = page != 1
    const has_next = total != last_index
    return (
        <Row center_align>
            <DefaultButton mini disabled={ !has_previous } onClick={ () => toPage(page - 1) }>
                <LeftArrowIcon/>
            </DefaultButton>
            <Row left={ spacings._1 }/>
            <DefaultButton mini disabled={ !has_next } onClick={ () => toPage(page + 1) }>
                <RightArrowIcon/>
            </DefaultButton>
            <SText left={ spacings._2 } dark bold>{ first_index } - { last_index } of { total }</SText>
        </Row>
    )
}