import React, { Component } from 'react';
import { Row, Column, Separator, Grow } from 'components/common';
import styled from 'styled-components';
import { spacings } from 'shared-styles/spacings';
import { SText } from 'components/SText';
import { colors } from 'shared-styles/colors';
import { AddIcon, DateIcon } from 'components/icons';
import { PrimaryButton } from 'components/buttons';
import { DatePicker } from 'components/DatePicker';
import { SimplePaginator } from 'components/SimplePaginator';
import { UserRow } from './UserRow'; 
import { openModal } from 'views/ModalView';
import { AddUser } from 'views/AddUser';
import { Dictionary, Profile } from 'types';
import { notify } from 'components/Notifications';
import { api } from 'services/api';
import { page_size } from 'values/defaults';
import { ShadeSpinner } from 'components/spinners';
import { paginationSlice } from 'utils/paginationSlice';
import { confirm } from 'components/ConfirmDialog'
import { Tasks } from 'pages/Tasks';


const HeaderRow = styled(Row)`
    padding: ${ spacings._4 } ${ spacings._7 };
    background-color: ${ colors.grey_1 };
`

const SecondaryRow = styled(HeaderRow)`
    padding-top: ${ spacings._3 };
    padding-bottom: ${ spacings._3 };
`

const UsersWrap = styled(Column)`
    align-items: center;
`

type State = {
    loading: boolean,
    user_ids: string[],
    page: number,
    editing_tasks_id?: string
}

export class Users extends Component<{}, State> {

    state: State = {
        loading: true,
        user_ids: [],
        page: 1
    }

    profilesMap: Dictionary<Profile> = {}

    componentDidMount () {
        this.updateList()
    }

    componentWillUnmount () {
        this.setState = () => {}
    }

    updateList = async () => {
        this.setState({ loading: true })
        try {
            const profiles = await api.users()
            this.profilesMap = {}
            profiles.forEach(p => {
                this.profilesMap[p.user.id] = p
            })
            this.setState({
                user_ids: profiles.map(p => p.user.id),
                page: 1
            })
        } catch (error) {
            notify.error('Could not update users list')
        }
        this.setState({ loading: false })
    }

    addUser = () => {
        openModal( p => <AddUser onClose={ p.onClose }/> )
    }

    onDelete = (id: string) => async () => {
        const confirmation = await confirm({
            text: `Are you sure you want to delete user ${ this.profilesMap[id].user.username }?`,
            type: 'danger',
            confirm_text: 'Delete'
        })
        if ( confirmation ) {
            this.setState({ loading: true })
            try {
                await api.deleteUser(id)
                this.updateList()
            } catch (error) {
                this.setState({ loading: false })
                notify.error('Could not delete user')
            }
        }
    }
    
    onEdit = (id: string) => (profile: Profile) => {
        this.profilesMap[id] = profile
        this.forceUpdate()
    }

    onEditTasks = (id?: string) => () => {
        this.setState({ editing_tasks_id: id })
    }

    onBack = this.onEditTasks()

    render () {
        const { user_ids, page, loading, editing_tasks_id } = this.state
        if ( editing_tasks_id ) {
            return (
                <Tasks onBack={ this.onBack } profile={ this.profilesMap[editing_tasks_id] }/>
            )
        }
        const total = user_ids.length
        return (
            <Column relative grow>
                { loading &&
                <ShadeSpinner/> }
                <HeaderRow>
                    <SText right={ spacings._3 } h2 dark bold>Users</SText>
                    <PrimaryButton onClick={ this.addUser } icon> <AddIcon/> </PrimaryButton>
                </HeaderRow>
                <Separator/>
                <SecondaryRow end_content center_align>
                    <SimplePaginator 
                        toPage={ page => this.setState({ page }) } 
                        page_size={ page_size } 
                        page={ page } 
                        total={ total }/>
                </SecondaryRow>
                <Separator/>
                <UsersWrap top={ spacings._7 }>
                    { paginationSlice(user_ids, page, page_size).map(id => (
                        <UserRow 
                            onEdit={ this.onEdit(id) }
                            onDelete={ this.onDelete(id) } 
                            onEditTasks={ this.onEditTasks(id) }
                            key={ id } 
                            profile={ this.profilesMap[id] }/>
                    )) } 
                </UsersWrap>                
            </Column>
        )
    }
}