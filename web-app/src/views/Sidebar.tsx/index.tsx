import React, { Component } from "react";
import { Column, Separator, Grow } from "components/common";
import styled from "styled-components";
import { spacings } from "shared-styles/spacings";
import { Link } from "react-router-dom";
import { colors } from "shared-styles/colors";
import { HomeIcon, TimeIcon, UserIcon, UsersIcon } from "components/icons";
import Popover from 'react-tiny-popover'
import { PopMenu, PopItem } from "components/popmenu";
import { SText } from "components/SText";
import { AppHistory } from "services/history";
import { openModal } from "views/ModalView";
import { EditPrefs } from "views/EditPrefs";
import { accessStore } from "services/store";
import { api } from "services/api";

const Wrap = styled(Column)`
    background-color: ${ colors.accent_4 };
    padding: ${ spacings._3 };
`

const Menu = styled(Column)`
    > * {
        margin-top: ${ spacings._3 };
    }
`

const StyledLink = styled(Link)`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${ spacings._8 };
    width: ${ spacings._8 };
    border-radius: ${ spacings._8 };
    transition: background-color 120ms linear;
    :hover {
        background-color: ${ colors.accent_3 };
    }
`

const SelectionBar = styled.div`
    position: absolute;
    background-color: ${ colors.grey_1 };
    right: -${ spacings._2 }; 
    bottom: ${ spacings._1 };
    top: ${ spacings._1 };
    width: ${ spacings._1 };
    border-radius: ${ spacings._1 };
`

const ProfileWrap = styled(Column)`
    cursor: pointer;
`

const formatUrl = (url: string) => {
    if ( url.length > 1 && url[url.length - 1] == '/' ) {
        return url.slice(0, -1)
    }
    return url
}

type State = {
    url: string
    popopen: boolean
}


export class Sidebar extends Component<{}, State> {
    store_access = accessStore()
    state: State = {
        url: '/',
        popopen: false
    }

    setUrl = (url: string) => () => {
        this.setState({ url })
    }

    onPreferences = () => {
        this.setState({popopen: false})
        openModal(p => <EditPrefs onClose={ p.onClose }/>)
    }

    onLogout = () => {
        this.setState({popopen: false})
        api.logOut()
    }

    componentDidMount () {
        this.store_access.user.subscribe( () => {
            this.forceUpdate()
        })
        this.setState({ url: formatUrl(AppHistory.location.pathname) })
        AppHistory.listen(location => {
            this.setState({ url: formatUrl(location.pathname) })
        })
    }

    render () {
        const { url, popopen } = this.state
        const user = this.store_access.user.get()
        const role = this.store_access.role.get()
        if ( !user ) {
            return <Wrap></Wrap>
        }
        return (
            <Wrap>
                <StyledLink to='/'>
                    <HomeIcon/>
                    { url == '/' && <SelectionBar/> }
                </StyledLink>
                <Separator top={ spacings._3 }/>
                <Menu>
                    <StyledLink to='/tasks'>
                        <TimeIcon/>
                        { url == '/tasks' && <SelectionBar/> }
                    </StyledLink>
                    { ( role == 'manager' || role == 'admin' ) &&  
                    <StyledLink to='/users'>
                        <UsersIcon/>
                        { url == '/users' && <SelectionBar/> }
                    </StyledLink> }
                </Menu>
                <Grow/>
                <Popover
                    isOpen={popopen}
                    position='right'
                    onClickOutside={() => this.setState({ popopen: false })}
                    content={(
                        <PopMenu>
                            <PopItem onClick={ this.onPreferences }>Preferences</PopItem>
                            <PopItem onClick={ this.onLogout }>Log out</PopItem>
                        </PopMenu>
                    )}>
                    <ProfileWrap  onClick={() => this.setState({popopen: !popopen})} bottom={ spacings._3 }>
                        <UserIcon/>
                    </ProfileWrap>
                </Popover>
            </Wrap>
        )
    }
}