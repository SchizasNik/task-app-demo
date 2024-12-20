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
import { UserRoleEnum } from "types";
import { OptionButton } from "components/OptionButton";
import { AppStore } from "services/store";
import { ShadeSpinner } from "components/spinners";
import { api } from "services/api";
import { notify } from "components/Notifications";

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

const StyledOptionButton = styled(OptionButton)`
    & + & {
        margin-left: ${ spacings._2 };
    }
`

const InviteLinkRow = styled(Row)`
    ${ light_card_css }
    overflow: auto;
`

const roleName = {
    'user': 'User',
    'manager': 'Manager',
    'admin': 'Admin',
}

type State = {
    loading: boolean,
    invitation_link: string,
    role: UserRoleEnum
}

export class AddUser extends Component<{onClose()}, State> {

    state: State = {
        loading: false,
        invitation_link: '',
        role: 'user'
    }

    componentWillUnmount () {
        this.setState = () => {}
    }

    optionProps = (role: UserRoleEnum) => ({
        selected: this.state.role == role,
        onClick: () => this.setState({ role })
    })

    onAdd = async () => {
        const { role } = this.state
        this.setState({ loading: true })
        try {
            const invitation = await api.createInvitation({ role })
            this.setState({ 
                invitation_link: document.location.origin + `/signup?ref_id=${ invitation.invitation_token }`
             })
        } catch (error) {
            notify.error('Could not create invitation')
        }
        this.setState({ loading: false })
    }

    render () {
        const { onClose } = this.props
        const { role, invitation_link, loading } = this.state
        const is_admin = AppStore.role.get() == 'admin'
        return (
            <Wrap>
                { loading &&
                <ShadeSpinner/> }
                <Header space_between center_align>
                    <SText h3 dark bold>Add user</SText>
                    <GreyCloseIcon onClick={ onClose }/>
                </Header>
                <Separator/>
                { !invitation_link &&
                <>
                <SText top={ spacings._6 } bottom={ spacings._1 }  medium bold>User role</SText>
                <SText bottom={ spacings._3 } light secondary>
                    An invitation will be created for an account with the selected role.
                </SText>
                <Row>
                    <StyledOptionButton {...this.optionProps('user')} >User</StyledOptionButton>
                    <StyledOptionButton disabled={ !is_admin } {...this.optionProps('manager')}>Manager</StyledOptionButton>
                    <StyledOptionButton disabled={ !is_admin } {...this.optionProps('admin')}>Admin</StyledOptionButton>
                </Row>
                </> }
                { invitation_link &&
                <>
                <SText top={ spacings._6 } bottom={ spacings._1 }  medium bold>Invitation link</SText>
                <SText bottom={ spacings._3 } light secondary>
                    Copy and send the invitation link for a { roleName[role] }'s account
                </SText>
                <InviteLinkRow>
                    <SText medium bold secondary> { invitation_link } </SText>
                </InviteLinkRow>
                </> }
                <Grow/>
                <Separator/>
                <Footer space_between center_align>
                    { !invitation_link &&
                    <>
                    <StrippedButton onClick={ onClose }>cancel</StrippedButton>
                    <PrimaryButton onClick={ this.onAdd }>Add</PrimaryButton> 
                    </>}
                    { invitation_link &&
                    <>
                    <Row/>
                    <PrimaryButton onClick={ onClose }>Done</PrimaryButton> 
                    </>}
                </Footer>
            </Wrap>
        )
    }
}