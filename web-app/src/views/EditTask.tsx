import React, { Component } from "react";
import { Column, Separator, Grow, Row } from "components/common";
import styled from "styled-components";
import { spacings } from "shared-styles/spacings";
import { colors } from "shared-styles/colors";
import { SText } from "components/SText";
import { GreyCloseIcon, DateIcon, ClockIcon } from "components/icons";
import { PrimaryButton, StrippedButton } from "components/buttons";
import { Checkbox } from 'components/checkbox'
import { light_card_css } from 'shared-styles/common'
import { Switch } from '@material-ui/core';
import { Input } from "components/input";
import { DatePicker, formatDate } from "components/DatePicker";
import { Task, NewTask } from "types";
import { ShadeSpinner } from "components/spinners";
import { api } from "services/api";
import { notify } from "components/Notifications";
import { validateHours } from "utils/validateHour";
import { getUserId } from "services/store";

const Wrap = styled(Column)`
    position: relative;
    padding: 0 ${ spacings._6 };
    width: 28rem;
    height: 32rem;
    margin-top: 4rem;
`

const Header = styled(Row)`
    padding-top: ${ spacings._5 };
    padding-bottom: ${ spacings._4 };
`

const CardRow = styled(Row)`
    ${ light_card_css }
`

const Footer = styled(Row)`
    padding: ${ spacings._4 } 0;
`

const HourInput = styled(Input)`
    width: 2.8rem;
    text-align: center;
    text-indent: unset;
`

type Props = {
    onClose()
    task?: Task
    user_id?: string
    onAdd?()
    onEdit?(task: Task)
}

type State = {
    date: Date | null,
    hours: string,
    note: string,
    loading: boolean
}

export class EditTask extends Component<Props, State> {
    state: State

    constructor (props) {
        super(props)
        const { task } = this.props
        if ( task ) {
            this.state = {
                date: new Date(task.date),
                hours: task.duration + '',
                note: task.note,
                loading: false
            }
        } else {
            this.state = {
                date: new Date(),
                hours: '1',
                note: '',
                loading: false
            }
        }
    }

    componentWillUnmount () {
        this.setState = () => {}
    }

    onChangeHours = (hours: string) => {
        if ( !validateHours(hours) ) {
            return
        }
        this.setState({ hours })
    }

    onSave = async () => {
        const { onClose, onAdd, onEdit } = this.props
        const { date, hours, note } = this.state
        const _task: NewTask = {
            duration: +hours,
            note,
            date: formatDate(date || new Date),
        }
        this.setState({ loading: true })
        if ( this.props.task ) {
            try {
                const updated = await api.updateTask(this.props.task.id)(_task)
                notify.success('Tak updated')
                onEdit && onEdit(updated)
                onClose()
            } catch (error) {
                notify.error('Could not update task')
                this.setState({ loading: false })
            }
        } else {
            const { user_id } = this.props
            try {
                await api.createTask(user_id || getUserId())(_task)
                notify.success('Tak created')
                onAdd && onAdd()
                onClose()
            } catch (error) {
                notify.error('Could not create task')
                this.setState({ loading: false })
            }
        }
    }

    render () {
        const { onClose, task } = this.props
        const { hours, note, loading, date } = this.state
        const can_save = hours !== '' && !!note && !!date
        return (
            <Wrap>
                { loading &&
                <ShadeSpinner/> }
                <Header space_between center_align>
                    <SText h3 dark bold>{ task? 'Edit': 'Create' } Task</SText>
                    <GreyCloseIcon onClick={ onClose }/>
                </Header>
                <Separator/>
                <SText top={ spacings._6 } bottom={ spacings._2 }  medium bold>Note</SText>
                <Input value={ note } onChange={ e => this.setState({ note: e.target.value }) }/>
                <CardRow center_align top={ spacings._4 }>
                    <SText medium bold>Date</SText>
                    <Grow/>
                    <DateIcon/>
                    <Row left={ spacings._2 }/>
                    <DatePicker 
                        selected={ date } 
                        onChange={ date => this.setState({ date }) }/>
                </CardRow>
                <CardRow center_align space_between top={ spacings._4 }>
                    <SText medium bold>Hours</SText>
                    <Grow/>
                    <ClockIcon/>
                    <Row left={ spacings._2 }/>
                    <HourInput onChange={ e => this.onChangeHours(e.target.value) } value={ hours }/>
                </CardRow>
                <Grow/>
                <Separator/>
                <Footer space_between center_align>
                    <StrippedButton onClick={ onClose }>cancel</StrippedButton>
                    <PrimaryButton disabled={ !can_save } onClick={ this.onSave }>Save</PrimaryButton>
                </Footer>
            </Wrap>
        )
    }
}