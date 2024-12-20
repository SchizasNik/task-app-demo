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
import { notify } from 'components/Notifications';
import { validateCreds } from 'utils/validateCreds';
import { ShadeSpinner } from 'components/spinners';
import { api } from 'services/api';
import { setToken } from 'services/auth';
import { AppStore, storeProfile } from 'services/store';

export const LoginCard = styled(Column)`
    ${ card_css }
    align-self: center;
    margin-top: ${ spacings._8 };
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`

type Props = {
    history: any
}

type State = {
    username: string
    password: string
    loading: boolean
}

export class Login extends Component<Props, State> {

    state: State = {
        username: '',
        password: '',
        loading: false
    }

    componentWillUnmount () {
        this.setState = () => {}
    }

    onLogin = async () => {
        const { username, password } = this.state
        const validation = validateCreds(username, password)
        if ( validation ) {
            notify.error(validation)
            return
        }
        this.setState({ loading: true })
        try {
            const profile = await api.login({ username, password })
            setToken(profile.token)
            storeProfile(profile)
            notify.success('You have Logged in successfully')
            this.props.history.replace('/')
        } catch (error) {
            notify.error('Could not login')
            this.setState({ loading: false })
        }
    }

    render () {
        const { username, password, loading } = this.state
        const can_login = username && password
        return (
            <Column grow relative>
                { loading &&
                <ShadeSpinner/> }
                <HeaderRow>
                    Login
                </HeaderRow>
                <Separator/>
                <LoginCard>
                    <Form onSubmit={ e => e.preventDefault() }>
                        <SText bottom={ spacings._2 } bold medium>Username</SText>
                        <Input onChange={ e => this.setState({ username: e.target.value }) } value={ username } width='20rem'/>
                        <SText top={ spacings._3 } bottom={ spacings._2 } bold medium>Password</SText>
                        <Input type="password" onChange={ e => this.setState({ password: e.target.value }) } value={ password } bottom={ spacings._4 }/>
                        <PrimaryButton onClick={ this.onLogin } disabled={ !can_login }>Login</PrimaryButton>
                    </Form>
                    <SText top={ spacings._2 } secondary light>Don't have an account?&nbsp;
                        <Link to='/signup'><SText secondary link>Create one</SText></Link>
                    </SText>
                </LoginCard>
            </Column>
        )
    }
}