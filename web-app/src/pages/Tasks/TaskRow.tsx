import React, { Component } from 'react';
import { Row, Column, Separator, Grow, VSeparator } from 'components/common';
import styled from 'styled-components';
import { spacings } from 'shared-styles/spacings';
import { SText } from 'components/SText';
import { colors } from 'shared-styles/colors';
import { AddIcon, DateIcon, DotsIcon, SmallClockIcon } from 'components/icons';
import { light_card_css } from 'shared-styles/common';
import Popover from 'react-tiny-popover';
import { PopMenu, PopItem } from 'components/popmenu';
import { openModal } from 'views/ModalView';
import { EditTask } from 'views/EditTask';
import { confirm } from 'components/ConfirmDialog'
import { Task } from 'types';
import { textColors } from 'shared-styles/text-colors';
import { TextLimit } from 'components/texts';

const Wrap = styled(Row)`
    ${ light_card_css }
    background-color: ${ colors.grey_1 };
    & + & {
        margin-top: ${ spacings._2 };
    }
`

const Texts = styled(Column)`
    width: 22rem;
`

const IconWrap = styled(Row)`
    padding: ${ spacings._2 };
    border-radius: 50%;
    cursor: pointer;
    :hover {
        background-color: ${ colors.grey_2 };
    }
    transition: background-color 0.3s;
`

const ColorBar = styled.div<{ color: 'success' | 'danger'}>`
    width: ${ spacings._1 };
    border-radius: ${ spacings._1 };
    background-color: ${ p => textColors[p.color] };
    align-self: stretch;
    margin-right: ${ spacings._2 };
`

type Props = {
    task: Task,
    onDelete(),
    onEdit(task: Task),
    color?: 'success' | 'danger'
}

type State = {
    open: boolean
}

export class TaskRow extends Component<Props, State> {

    state: State = {
        open: false
    }

    onEdit = () => {
        this.setState({ open: false })
        openModal(p => <EditTask onEdit={ this.props.onEdit } task={ this.props.task } onClose={ p.onClose }/>)
    }

    onDelete = () => {
        this.setState({ open: false })
        this.props.onDelete()
    }

    render () {
        const { task, color } = this.props
        const { open } = this.state
        return (
            <Wrap center_align>
                { color &&
                <ColorBar color={ color }/> }
                <Texts>
                    <TextLimit w={ 20 }>
                        <SText h3 bold dark>{ task.note }</SText> 
                    </TextLimit>
                    <Row top={ spacings._0 } center_align>
                        <SmallClockIcon/>
                        <SText left={ spacings._1 } light>{ task.duration } hours</SText>
                    </Row>
                </Texts>
                <VSeparator right={ spacings._3 }/>
                <DateIcon/>
                <SText left={ spacings._2 } medium>{ task.date }</SText>
                <VSeparator left={ spacings._3 } right={ spacings._3 }/>
                <Popover
                    isOpen={ open }
                    position='right'
                    onClickOutside={() => this.setState({ open: false })}
                    content={(
                        <PopMenu>
                            <PopItem onClick={ this.onEdit }>Edit</PopItem>
                            <PopItem onClick={ this.onDelete }><SText danger>Delete</SText></PopItem>
                        </PopMenu>
                    )}>
                    <IconWrap onClick={ () => this.setState({ open: true }) }>
                        <DotsIcon/>
                    </IconWrap>
                </Popover>
            </Wrap>
        )
    }
}