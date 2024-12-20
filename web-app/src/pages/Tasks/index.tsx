import React, { Component } from 'react';
import { Row, Column, Separator, Grow } from 'components/common';
import styled from 'styled-components';
import { spacings } from 'shared-styles/spacings';
import { SText } from 'components/SText';
import { colors } from 'shared-styles/colors';
import { AddIcon, DateIcon, LeftArrowIcon, DownloadIcon } from 'components/icons';
import { PrimaryButton, DefaultButton } from 'components/buttons';
import { DatePicker, formatDate } from 'components/DatePicker';
import { SimplePaginator } from 'components/SimplePaginator';
import { TaskRow } from './TaskRow';
import { Dictionary, Task, UserPrefs, User, Profile } from 'types';
import { ShadeSpinner } from 'components/spinners';
import { api } from 'services/api';
import { Store } from 'services/store/StoreCreator';
import { AppStore, accessStore, getUserId } from 'services/store';
import { tryGet } from 'utils/tryGet';
import { subDays } from 'date-fns'
import { paginationSlice } from 'utils/paginationSlice';
import { confirm } from 'components/ConfirmDialog'
import { notify } from 'components/Notifications';
import { page_size, default_user_prefs } from 'values/defaults';
import { openModal } from 'views/ModalView';
import { EditTask } from 'views/EditTask';
import { tasksToHTML } from 'utils/tasksToHTML';
import { getToken } from 'services/auth';


const HeaderRow = styled(Row)`
    padding: ${ spacings._4 } ${ spacings._7 };
    background-color: ${ colors.grey_1 };
`

const SecondaryRow = styled(HeaderRow)`
    padding-top: ${ spacings._3 };
    padding-bottom: ${ spacings._3 };
`

const StyledDatePicker = styled(DatePicker)`
    margin-left: ${ spacings._3 };
`

const TasksWrap = styled(Column)`
    align-items: center;
`

const BackButton = styled(DefaultButton)`
    height: fit-content;
    margin-right: ${ spacings._3 };
`

type Props = {
    profile?: Profile
    onBack?()
}

type State = {
    loading: boolean,
    task_ids: string[],
    startDate: Date | null,
    endDate: Date | null,
    page: number
}

export class Tasks extends Component<Props, State> {

    user_id: string
    store_access = accessStore()
    constructor (props) {
        super(props)
        if ( props.profile ) {
            this.user_id = props.profile.user.id
        } else {
            this.user_id = getUserId()
            this.store_access.prefs.subscribe( () => {
                this.updateColors()
                this.forceUpdate()
            })
        }
    }

    tasksMap: Dictionary<Task> = {}
    colorsMap: Dictionary<'success' | 'danger'> = {}
    startDate = subDays(new Date, 1) 
    endDate = new Date

    state: State = {
        loading: true,
        task_ids: [],
        startDate: this.startDate,
        endDate: this.endDate,
        page: 1
    }

    onNew = () => {
        openModal(p => <EditTask onAdd={ this.updateList } onClose={ p.onClose }/>)
    }

    updateList = async () => {
        this.setState({ loading: true })
        try {
            const tasks = await api.tasks( this.user_id )({
                start_date: formatDate(this.startDate),
                end_date: formatDate(this.endDate)
            })
            this.tasksMap = {}
            tasks.forEach(t => {
                this.tasksMap[t.id] = t
            })
            this.updateColors()
            this.setState({
                task_ids: tasks.map(t => t.id),
                page: 1
            })
        } catch (error) {
            notify.error('Could not update tasks list')
        }
        this.setState({ loading: false })
    }

    getUsersPrefs () {
        return this.props.profile ? 
                this.props.profile.preferences : 
                AppStore.prefs.get()
    }

    updateColors () {
        this.colorsMap = {}
        const prefs = this.getUsersPrefs()
        if ( !prefs.working_hours_enabled ) {
            return
        }
        const { preferred_working_hours } = prefs
        const totalsMap: Dictionary<number> = {}
        for (let id in this.tasksMap) {
            const key = this.tasksMap[id].date
            totalsMap[key] = totalsMap[key] || 0
            totalsMap[key] += this.tasksMap[id].duration
        }
        for (let d in totalsMap) {
            this.colorsMap[d] = totalsMap[d] >= preferred_working_hours ? 'success' : 'danger'
        }
    }

    applyDates = async () => {
        const { startDate, endDate } = this.state
        if ( !startDate || ! endDate ) {
            console.error('Called apply dates while dates where null')
            return
        }
        this.startDate = startDate
        this.endDate = endDate
        this.updateList()
    }

    componentDidMount () {
        this.updateList()
    }

    componentWillUnmount () {
        this.store_access.leave()
        this.setState = () => {}
    }

    onDelete = (id: string) => async () => {
        const confirmation = await confirm({
            text: `Are you sure you want to delete task ${ this.tasksMap[id].note }?`,
            type: 'danger',
            confirm_text: 'Delete'
        })
        if ( confirmation ) {
            this.setState({ loading: true })
            try {
                await api.deleteTask(id)
                this.updateList()
            } catch (error) {
                this.setState({ loading: false })
                notify.error('Could not delete task')
            }
        }
    }

    onDownload = () => {
        api.downloadTasks( this.user_id )({
            start_date: formatDate(this.startDate),
            end_date: formatDate(this.endDate),
            token: getToken()
        })
    }

    onEdit = (id: string) => (task: Task) => {
        this.tasksMap[id] = task
        this.forceUpdate()
    }

    render () {
        const { profile, onBack } = this.props
        let { task_ids, loading, startDate, endDate, page } = this.state
        const total = task_ids.length
        const has_dates = startDate && endDate
        
        return (
            <Column relative grow>
                { loading &&
                <ShadeSpinner/> }
                <HeaderRow center_align>
                    { onBack &&
                    <BackButton mini onClick={ onBack }>
                        <LeftArrowIcon/>
                    </BackButton> }
                    { profile ?
                    <SText right={ spacings._3 } h2 dark bold>
                        Tasks - { profile.user.username }
                    </SText> :
                    <SText right={ spacings._3 } h2 dark bold>Tasks</SText>
                     }
                    <PrimaryButton onClick={ this.onNew } icon> <AddIcon/> </PrimaryButton>
                </HeaderRow>
                <Separator/>
                <SecondaryRow center_align>
                    <DateIcon/>
                    <StyledDatePicker selected={ startDate } onChange={ startDate => this.setState({ startDate }) }/>
                    <StyledDatePicker selected={ endDate } onChange={ endDate => this.setState({ endDate }) }/>
                    { has_dates ?
                    <SText onClick={ this.applyDates } left={ spacings._3 } link bold>Apply dates</SText> :
                    <SText left={ spacings._3 } light bold>Apply dates</SText> }
                    <Row left={ spacings._3 }/>
                    <DownloadIcon onClick={ this.onDownload }/>
                    <Grow/>
                    <SimplePaginator 
                        toPage={page => this.setState({ page })} 
                        page_size={page_size} 
                        page={ page } 
                        total={ total }/>
                </SecondaryRow>
                <Separator/>
                <TasksWrap top={ spacings._7 }>
                    { paginationSlice(task_ids, page, page_size).map(id => (
                        <TaskRow 
                            color={ this.colorsMap[this.tasksMap[id].date] }
                            onEdit={ this.onEdit(id) } 
                            onDelete={ this.onDelete(id) } 
                            key={ id } 
                            task={ this.tasksMap[id] }/>
                    )) } 
                </TasksWrap>                
            </Column>
        )
    }
}