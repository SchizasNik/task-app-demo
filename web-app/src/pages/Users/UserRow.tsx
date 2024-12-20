import React, { Component } from 'react';
import { Row, Column, Separator, Grow, VSeparator } from 'components/common';
import styled from 'styled-components';
import { spacings } from 'shared-styles/spacings';
import { SText } from 'components/SText';
import { colors } from 'shared-styles/colors';
import { AddIcon, DateIcon, DotsIcon, SmallClockIcon, SmallSettingsIcon } from 'components/icons';
import { light_card_css } from 'shared-styles/common';
import Popover from 'react-tiny-popover';
import { PopMenu, PopItem } from 'components/popmenu';
import { openModal } from 'views/ModalView';
import { EditTask } from 'views/EditTask';
import { AdminBanner, ManagerBanner, UserBanner } from 'components/banners';
import { Profile, UserPrefs, UserRoleEnum } from 'types';
import { EditPrefs } from 'views/EditPrefs';
import { AppStore } from 'services/store';
import { confirm } from 'components/ConfirmDialog';
import { ShadeSpinner } from 'components/spinners';
import { notify } from 'components/Notifications';
import { api } from 'services/api';

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

const BannerWrap = styled(Row)`
    width: 4rem;
`

const banners = {
    user: UserBanner,
    manager: ManagerBanner,
    admin: AdminBanner
}

type Props = {
    profile: Profile
    onDelete()
    onEdit(profile: Profile)
    onEditTasks()
}

type State = {
    open: boolean
    loading: boolean
}

export class UserRow extends Component<Props, State> {


    user_role = AppStore.role.get()

    state: State = {
        open: false,
        loading: false
    }

    componentWillUnmount () {
        this.setState = () => {}
    }

    onEdit = () => {
        this.setState({ open: false })
        openModal(p => <EditPrefs 
                            onEdit={ this.onEditPrefs } 
                            profile={ this.props.profile } 
                            onClose={ p.onClose }/>)
    }
    
    onEditPrefs = (prefs: UserPrefs) => {
        const { profile } = this.props
        profile.preferences = prefs
        this.props.onEdit(profile)
    }

    onDelete = () => {
        this.setState({ open: false })
        this.props.onDelete()
    }

    onEditRole = (role: UserRoleEnum) => async () => {
        this.setState({ open: false })
        const confirmation = await confirm({
            text: "Are you sure you want to change this account's permissions to '" + role + "'?",
            confirm_text: 'Proceed'
        })
        if ( confirmation ) {
            this.setState({ loading: true })
            try {
                await api.updateUserRole(this.props.profile.user.id)({ role })
                this.props.onEdit({
                    ...this.props.profile,
                    role: { role }
                })
            } catch (error) {
                notify.error("Could not change account's permissions level")
            }
            this.setState({ loading: false })
        }
    }

    getRoleChangeOptions () {
        const { role } = this.props.profile.role
        if ( this.user_role == 'admin' ) {
            return (
                <>
                    { role != 'admin' &&
                    <PopItem onClick={ this.onEditRole('admin') }><SText link>Make admin</SText></PopItem> }
                    { role != 'manager' &&
                    <PopItem onClick={ this.onEditRole('manager') }><SText link>Make manager</SText></PopItem> }
                    { role != 'user' &&
                    <PopItem onClick={ this.onEditRole('user') }><SText link>Make user</SText></PopItem> }
                </>
            )
        }
        return null
    }

    render () {
        const { open, loading } = this.state
        const { profile } = this.props
        const hours = profile.preferences.preferred_working_hours
        const hours_enabled = profile.preferences.working_hours_enabled
        return (
            <Wrap center_align>
                { loading &&
                <ShadeSpinner/> }
                <Texts>
                    <SText h3 bold dark>{ profile.user.username }</SText> 
                    <Row top={ spacings._0 } center_align>
                        <SmallSettingsIcon/>
                        { hours_enabled ? 
                        <SText left={ spacings._1 } light>{ hours } hours per day</SText> :
                        <SText left={ spacings._1 } light>Hour limit disabled</SText> 
                         }
                    </Row>
                </Texts>
                <BannerWrap end_content>
                    { banners[profile.role.role] }
                </BannerWrap>
                <VSeparator left={ spacings._3 } right={ spacings._3 }/>
                <Popover
                    isOpen={ open }
                    position='right'
                    onClickOutside={() => this.setState({ open: false })}
                    content={(
                        <PopMenu>
                            { this.getRoleChangeOptions() }
                            <PopItem onClick={ this.onEdit }>Edit preferences</PopItem>
                            { this.user_role == 'admin' &&
                            <PopItem onClick={ this.props.onEditTasks }>Edit tasks</PopItem> }
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