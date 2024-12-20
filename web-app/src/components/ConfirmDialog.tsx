import React, { Component, ReactElement } from 'react';
import styled from "styled-components";
import { PrimaryButton, SecondaryButton, DangerButton, StrippedButton } from 'components/buttons';
import { spacings } from 'shared-styles/spacings';
import { abs_fill_css } from 'shared-styles/common';
import { colors } from 'shared-styles/colors';
import { Row, Separator } from './common';
import { SText } from './SText';
import { GreyCloseIcon } from './icons';
import { zIndex } from 'shared-styles/zIndex';
import { fade_in_css } from 'shared-styles/animations';
import { AppHistory } from 'services/history';

let onConfirm = (req: ConfirmReq, clb: Clb) => {}

type Clb = (res: boolean) => void

type ConfirmReq = {
    text: ReactElement | string
    title?: string
    confirm_text?: string
    cancel_text?: string
    type?: ConfirmationType
    no_confirm_text?: boolean
}

export const confirm = (req: ConfirmReq) => {
    return new Promise<boolean>(r => {
        onConfirm(req, r);
    })
}


type ConfirmationType = 'info' | 'danger'

const Shade = styled.div`
    position: fixed;
    background-color: #00000036;
    top: -150px;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: ${ zIndex.confirm_dialog };
    animation: ${ fade_in_css } 180ms;
`

const Wrap = styled.div`
    ${ abs_fill_css }
    height: fit-content;
    margin: auto;
    width: 31.857em;
    background-color: ${ colors.grey_1 };
    border-radius: ${ spacings._2 };
    padding-left: ${ spacings._6 };
    padding-right: ${ spacings._6 };
`

const Body = styled(Row)`
    margin-top: ${ spacings._6 };
    margin-bottom: ${ spacings._6 };
    overflow-y: auto;
    max-height: 36em;
`

// ###############################################################

type State = ConfirmReq & {}

const confirm_buttons = {
    info: SecondaryButton,
    danger: DangerButton
}

export class ConfirmDialogView extends Component<{}, State> {

    onConfirmClb: Clb = () => {}; 

    state: State = {
        text: ''
    }

    componentDidMount () {
        onConfirm = this.onConfirm;
        AppHistory.listen( () => {
            this.setState({ text: '' })
        })
    }

    onConfirm = (req: ConfirmReq, clb: Clb) => {
        this.onConfirmClb = clb;
        this.setState({ 
            text: req.text, 
            confirm_text: req.confirm_text,
            cancel_text: req.cancel_text,
            no_confirm_text: req.no_confirm_text,
            type: req.type,
            title: req.title
        });
    }

    result = (v: boolean) => () => {
        this.setState({ 
            text: '',
            confirm_text: undefined,
            cancel_text: undefined,
            no_confirm_text: undefined,
            type: undefined
        });
        this.onConfirmClb(v);
    }

    render () {
        let { text, confirm_text, type, cancel_text, title, no_confirm_text } = this.state;
        if ( !text ) {
            return null;
        }
        confirm_text = confirm_text || 'OK'
        cancel_text = cancel_text || 'cancel'
        type = type || 'info';
        title = title || 'Confirmation'
        const Button = confirm_buttons[type];

        return (
            <Shade>
                <Wrap>
                    <Row space_between center_align top={ spacings._5 } bottom= { spacings._4 }>
                        <SText h3 bold>{ title }</SText>
                        <GreyCloseIcon/>
                    </Row>
                    <Separator/>
                    <Body>
                        { text }
                    </Body>
                    <Separator/>
                    <Row center_align space_between top={ spacings._4 } bottom={ spacings._4 }>
                        <StrippedButton onClick={ this.result(false) }>{ cancel_text }</StrippedButton>
                        { !no_confirm_text && 
                            <Button onClick={ this.result(true) }>{ confirm_text }</Button> }
                    </Row>
                </Wrap>
            </Shade>
        )
    }

}