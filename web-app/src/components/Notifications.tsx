import React, { Component } from 'react';
import styled from "styled-components";
import uuid from 'uuid/v1';
import { CheckCircle as CheckCircleSVG } from '@styled-icons/boxicons-solid/CheckCircle'
import { Square as SquareSVG } from '@styled-icons/boxicons-solid/Square'
import { CloseOutline as CloseOutlineSVG } from '@styled-icons/evaicons-outline/CloseOutline'
import { Info as InfoSVG } from "@styled-icons/evaicons-solid/Info";
import { Warning as WarningSVG } from "@styled-icons/material/Warning";
import { spacings } from 'shared-styles/spacings';
import { colors } from 'shared-styles/colors';
import { shadowLevels, shadowColors } from 'shared-styles/shadows';
import { textColors } from 'shared-styles/text-colors';
import { Row } from './common';
import { flex_center_css } from 'shared-styles/common';
import { fade_in_css } from 'shared-styles/animations';

const TickIcon = styled(CheckCircleSVG)`
    height: ${ spacings._4 };
    color: ${ colors.success_6 };
`

const RectIcon = styled(SquareSVG)`
    height: ${ spacings._4 };
    color: ${ colors.danger_6 };
`

const CloseIcon = styled(CloseOutlineSVG)`
    height: ${ spacings._4 };
    color: ${ colors.grey_1 };
`

const InfoIcon = styled(InfoSVG)`
    height: ${ spacings._4 };
    color: ${ colors.info_6 };
`

const WarningIcon = styled(WarningSVG)`
    color: ${colors.warning_6};
    height: ${ spacings._4 };
`

let onNotify = (text: string | JSX.Element, type: NotificationType, time?: number) => {}

export const notify = {
    success (text: string | JSX.Element, time?: number) {
        onNotify(text, 'success', time)
    },
    error (text: string | JSX.Element, time?: number) {
        onNotify(text, 'error', time)
    },
    info (text: string | JSX.Element, time?: number) {
        onNotify(text, 'info', time)
    },
    warning (text: string | JSX.Element, time?: number) {
        onNotify(text, 'warning', time)
    }
}

type NotifyProp = {
    type: NotificationType
}

const Wrap = styled.div`
    z-index: 900;
    position: fixed;
    width: max-content;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const notify_colors = {
    success: colors.success_6,
    info: colors.info_6,
    warning: colors.warning_6,
    error: colors.danger_6,
}

const Notification = styled(Row)<NotifyProp>`
    margin-top: ${ spacings._4 };
    padding: ${ spacings._3 } ${ spacings._4 };
    width: fit-content;
    border-radius: ${ spacings._1 };
    align-items: center;
    background-color: ${ p => notify_colors[p.type] };
    animation: ${ fade_in_css } 180ms;
`

const Circle = styled(Row)`
    ${ flex_center_css };
    padding: ${ spacings._3 };
    background-color: ${ colors.grey_1 };
    border-radius: 50%;
    box-shadow: ${ shadowLevels.shadow_1 } ${shadowColors.medium};
    margin-right: ${ spacings._6 };
    margin-left: ${ spacings._1 };
`

const CloseWrap = styled(Row)`
    ${ flex_center_css };
    height: ${ spacings._5 };
    width: ${ spacings._5 };
    margin-left: ${ spacings._5 };
    cursor: pointer;
`

const Message = styled.div`
    color: ${textColors.white};
`

type NotificationType = 'success' | 'error' | 'info' | 'warning'
type Notification = {
    text: string
    type: NotificationType
    id: string
}
type State = {
    notifications: Notification[]
}
const icons = {
    success: <TickIcon/>,
    error: <RectIcon/>,
    info: <InfoIcon/>,
    warning: <WarningIcon/>
}
export class Notifications extends Component {
    state: State = {
        notifications: []
    }

    componentDidMount () {
        onNotify = this.onNotify;
    }

    onNotify = (text: string | JSX.Element, type: NotificationType, time?: number) => {
        const { notifications } = this.state;
        const duration = time || 5000;
        const entry = {
            type,
            text,
            id: uuid()
        };
        this.setState({
            notifications: [ ...notifications, entry ]
        });
        setTimeout( () => {
            this.onClose(entry.id)();
        }, duration)
    }

    onClose (id: string) {
        return () => {
            let { notifications } = this.state;
            notifications = notifications.filter( n => n.id != id );
            this.setState({ notifications });
        }
    }

    getNotifications () {
        const { notifications } = this.state;
        return notifications.map(n => (
            <Notification key={ n.id } type={ n.type }>
                <Circle>
                    { icons[n.type] }
                </Circle>
                <Message>{ n.text }</Message>
                <CloseWrap onClick={ this.onClose(n.id) }>
                    <CloseIcon/>
                </CloseWrap>
            </Notification>
        ))
    }

    render () {
        return (
            <Wrap>
                { this.getNotifications() }
            </Wrap>
        )
    }

}