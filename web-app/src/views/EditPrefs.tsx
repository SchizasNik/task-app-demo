import React, { Component } from "react";
import { Column, Separator, Grow, Row } from "components/common";
import styled from "styled-components";
import { spacings } from "shared-styles/spacings";
import { colors } from "shared-styles/colors";
import { SText } from "components/SText";
import { GreyCloseIcon } from "components/icons";
import { PrimaryButton, StrippedButton } from "components/buttons";
import { Checkbox } from 'components/checkbox'
import { light_card_css } from 'shared-styles/common'
import { Switch } from '@material-ui/core';
import { Input } from "components/input";
import { Profile, UserPrefs } from "types";
import { validateHours } from "utils/validateHour";
import { ShadeSpinner } from "components/spinners";
import { default_user_prefs } from "values/defaults";
import { AppStore, getUserId } from "services/store";
import { notify } from "components/Notifications";
import { api } from "services/api";

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

const PrefRow = styled(Row)`
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
    onEdit?(prefs: UserPrefs)
    profile?: Profile
}

type State = {
    hours: string
    limit_enabled: boolean
    loading: boolean
}

export class EditPrefs extends Component<Props, State> {

    state: State

    constructor (props) {
        super(props)
        const { profile } = this.props
        const prefs = profile ? profile.preferences : AppStore.prefs.get()
        this.state = {
            hours: prefs.preferred_working_hours + '',
            limit_enabled: prefs.working_hours_enabled,
            loading: false
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

    onConfirm = async () => {
        const { limit_enabled, hours } = this.state
        const { profile, onClose, onEdit } = this.props
        const prefs: UserPrefs = {
            preferred_working_hours: +hours,
            working_hours_enabled: limit_enabled
        }
        let user_id = ''
        if ( profile ) {
            user_id = profile.user.id
        } else {
            user_id = getUserId()
        }
        this.setState({ loading: true })
        try {
            await api.updateUserPrefs(user_id)(prefs)
            notify.success('User preferences updated')
            if ( !profile ) {
                AppStore.prefs.set(prefs)
            }
            onEdit && onEdit(prefs)
            onClose()
        } catch (error) {
            this.setState({ loading: false })
            notify.error('Could not save user preferences')
        }
    }

    render () {
        const { onClose, profile } = this.props
        const { hours, limit_enabled, loading } = this.state
        return (
            <Wrap>
                { loading &&
                <ShadeSpinner/> }
                <Header space_between center_align>
                    { profile ?
                    <SText h3 dark bold>Edit Preferences - {profile.user.username}</SText> :
                    <SText h3 dark bold>Edit Preferences</SText> }
                    <GreyCloseIcon onClick={ onClose }/>
                </Header>
                <Separator/>
                <PrefRow center_align top={ spacings._5 } space_between>
                    <SText  medium bold>Use filter</SText>
                    <Switch
                            color="primary"
                            onChange={ () => this.setState({ limit_enabled: !limit_enabled }) } 
                            checked={ limit_enabled }/>
                </PrefRow>
                <PrefRow center_align top={ spacings._3 } space_between>
                    <SText  medium bold>Hours per day</SText>
                    <HourInput
                        onChange={ e => this.onChangeHours(e.target.value) } 
                        value={ hours }/>
                </PrefRow>
                <Grow/>
                <Separator/>
                <Footer space_between center_align>
                    <StrippedButton onClick={ onClose }>cancel</StrippedButton>
                    <PrimaryButton onClick={ this.onConfirm } disabled={ hours === '' }>Confirm</PrimaryButton>
                </Footer>
            </Wrap>
        )
    }
}