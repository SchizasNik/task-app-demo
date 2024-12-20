import React, { Component } from 'react';
import { Column, Row, Separator } from 'components/common';
import styled from 'styled-components';
import { colors } from 'shared-styles/colors';
import { spacings } from 'shared-styles/spacings';
import { SText } from 'components/SText';
import { card_css } from 'shared-styles/common';
import { Input } from 'components/input';
import { PrimaryButton } from 'components/buttons';
import { HeaderRow } from 'components/HeaderRow';
import { Link } from 'react-router-dom';
import { LoginCard, Form } from './Login';
import { notify } from 'components/Notifications';
import { validateCreds } from 'utils/validateCreds';
import { api } from 'services/api';
import { storeProfile } from 'services/store';
import { setToken } from 'services/auth';

type Props = {
    history: any
}

type State = {
    username: string
    password: string
    confirm: string
}

export class Signup extends Component<Props, State> {

    state: State = {
        username: '',
        password: '',
        confirm: '',
    }

    componentWillUnmount () {
        this.setState = () => {}
    }

    getInvitationToken () {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('ref_id')
    }

    onSignup = async () => {
        const { username, password, confirm } = this.state
        const validation = validateCreds(username, password)
        if ( validation ) {
            notify.error(validation)
            return
        }
        if ( password != confirm ) {
            notify.error('password and password confirmation does not match')
            return
        }
        try {
            const invitation_token = this.getInvitationToken()
            const profile = await api.createUser({ 
                username, 
                password,
                invitation_token: invitation_token || undefined
             })
            setToken(profile.token)
            storeProfile(profile)
            notify.success('Account created successfully')
        } catch (error) {
            notify.error('Account could not be created')
        }
        this.props.history.replace('/')
    }

    render () {
        const { username, password, confirm } = this.state
        const can_login = username && password && confirm
        return (
            <Column grow>
                <HeaderRow>
                    Create account
                </HeaderRow> 
                <Separator/>
                <LoginCard>
                    <Form onSubmit={ e => e.preventDefault() }>
                        <SText bottom={ spacings._2 } bold medium>Username</SText>
                        <Input onChange={ e => this.setState({ username: e.target.value }) } value={ username } width='20rem'/>
                        <SText top={ spacings._3 } bottom={ spacings._2 } bold medium>Password</SText>
                        <Input type="password" onChange={ e => this.setState({ password: e.target.value }) } value={ password }/>
                        <SText top={ spacings._3 } bottom={ spacings._2 } bold medium>Confirm Password</SText>
                        <Input type="password" onChange={ e => this.setState({ confirm: e.target.value }) } value={ confirm } bottom={ spacings._4 }/>
                        <PrimaryButton onClick={ this.onSignup } disabled={ !can_login }>Login</PrimaryButton>
                    </Form>
                    <SText top={ spacings._2 } secondary light>Already have an account?&nbsp;
                        <Link to='/login'><SText secondary link>Register</SText></Link>
                    </SText>
                </LoginCard>
            </Column>
        )
    }
}