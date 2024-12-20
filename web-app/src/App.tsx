import React, { FC, Component } from 'react';
import styled from 'styled-components';
import { Row } from 'components/common';
import { RouterView, NoLoginRouterView, AdminRouterView } from 'views/RouterView';
import { Sidebar } from 'views/Sidebar.tsx';
import {
    Router, 
} from "react-router-dom";
import { colors } from 'shared-styles/colors';
import { Notifications } from 'components/Notifications';
import { AppHistory } from 'services/history';
import { ModalView } from 'views/ModalView';
import { ConfirmDialogView } from 'components/ConfirmDialog';
import { accessStore, storeProfile } from 'services/store';
import { ShadeSpinner } from 'components/spinners';
import { getToken } from 'services/auth'; 
import { api } from 'services/api';
// import {} from 'mocks/mock-api' // TODO

const Wrap = styled(Row)`
    background-color: ${ colors.grey_2 };
`

type State = {
    loading: boolean
}

export class App extends Component<{}, State> {
    store_access = accessStore()
    state: State = {
        loading: true
    }

    async componentDidMount () {
        this.store_access.user.subscribe( () => {
            this.forceUpdate()
        })
        if ( getToken() ) {
            try {
                const profile = await api.profile()
                storeProfile(profile)
            } catch (error) {
                
            }
        }
        this.setState({ loading: false })
    }

    getRouterView () {
        const { loading } = this.state
        if ( loading ) {
            return null
        }
        const user = this.store_access.user.get()
        if ( !user ) {
            return <NoLoginRouterView/>
        }
        const role = this.store_access.role.get()
        if ( role == 'manager' || role == 'admin' ) {
            return <AdminRouterView/>
        }
        return <RouterView/>
    }

    render () {
        const { loading } = this.state
        return (
            <Router history={ AppHistory }>
                <Wrap grow>
                    { loading && <ShadeSpinner/> }
                    <Sidebar/>
                    { this.getRouterView() }
                    <Notifications/>
                    <ModalView/>
                    <ConfirmDialogView/>
                </Wrap>
            </Router>
        );
    }
}
