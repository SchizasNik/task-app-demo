import React from 'react';
import styled from 'styled-components';
import { colors } from 'shared-styles/colors';
import { spacings } from 'shared-styles/spacings';
import { shadowLevels, shadowColors } from 'shared-styles/shadows';
import { zIndex } from 'shared-styles/zIndex';
import { fade_in_css } from 'shared-styles/animations';
import { AppHistory } from 'services/history';

type ModalRenderProps = {
    onClose(): void
}
type ModalRender = (props: ModalRenderProps) => JSX.Element;
let onOpen = (modalRender: ModalRender) => {};

export const openModal = (modalRender: ModalRender) => {
    onOpen(modalRender)
}

const Shade = styled.div`
    position: fixed;
    background-color: #00000036;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: ${ zIndex.modal };
    animation: ${ fade_in_css } 180ms;
`

const Wrap = styled.div`
    width: fit-content;
    margin: auto;
    background-color: ${colors.grey_1};
    border-radius: ${ spacings._1 };
    box-shadow: ${shadowLevels.shadow_4} ${shadowColors.medium};
`

type State = {
    modalRender: ModalRender | null
}

export class ModalView extends React.Component {
    state: State = {
        modalRender: null
    }

    componentDidMount() {
        onOpen = this.onOpen;
        AppHistory.listen( () => {
            this.setState({ modalRender: null })
        })
    }

    onOpen = (modalRender: ModalRender) => {
        this.setState({modalRender});
    }

    onClose = () => {
        this.setState({modalRender: null});
    }

    render() {
        
        const { modalRender } = this.state;
        if ( !modalRender ) {
            return null;
        }

        return (
            <Shade>
                <Wrap>
                    { modalRender({onClose: this.onClose}) }
                </Wrap>
            </Shade>
        );
    }
}