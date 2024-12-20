import styled, { css } from 'styled-components'
import { spacings } from 'shared-styles/spacings'
import { Home as HomeSVG } from '@styled-icons/boxicons-solid/Home'
import { BackInTime as BackInTimeSVG } from '@styled-icons/entypo/BackInTime'
import { UserCircle as UserCircleSVG } from '@styled-icons/boxicons-solid/UserCircle'
import { colors } from 'shared-styles/colors'
import { CloseOutline as CloseSVG } from '@styled-icons/evaicons-outline/CloseOutline'
import { Plus as PlusSVG } from '@styled-icons/entypo/Plus'
import { DateRange as DateRangeSVG } from '@styled-icons/material-rounded/DateRange'
import { DotsVerticalRounded as DotsVerticalRoundedSVG } from '@styled-icons/boxicons-regular/DotsVerticalRounded'
import { textColors } from 'shared-styles/text-colors'
import { ClockOutline as ClockOutlineSVG } from '@styled-icons/evaicons-outline/ClockOutline'
import { Users as UsersSVG } from '@styled-icons/fa-solid/Users'
import { Settings as SettingsSVG } from '@styled-icons/material/Settings'
import { KeyboardArrowLeft as KeyboardArrowLeftSVG } from '@styled-icons/material/KeyboardArrowLeft'
import { KeyboardArrowRight as KeyboardArrowRightSVG } from '@styled-icons/material/KeyboardArrowRight'
import { Download as DownloadSVG } from '@styled-icons/boxicons-regular/Download'


export const LeftArrowIcon = styled(KeyboardArrowLeftSVG)`
    height: ${ spacings._3 };
    color: ${ colors.grey_5 };
`

export const RightArrowIcon = styled(KeyboardArrowRightSVG)`
    height: ${ spacings._3 };
    color: ${ colors.grey_5 };
`

export const HomeIcon = styled(HomeSVG)`
    height: ${ spacings._6 };
    color: ${ colors.grey_1 };
`

export const TimeIcon = styled(BackInTimeSVG)<{active?: boolean}>`
    height: ${ spacings._6 };
    color: ${ colors.grey_1 };
`

export const UserIcon = styled(UserCircleSVG)`
    height: ${ spacings._6 };
    color: ${ colors.grey_1 };
`

export const UsersIcon = styled(UsersSVG)`
    height: ${ spacings._6 };
    color: ${ colors.grey_1 };
`

export const GreyCloseIcon = styled(CloseSVG)`
    height: ${ spacings._4 };
    color: ${ colors.grey_5 };
    cursor: pointer;
`

export const AddIcon = styled(PlusSVG)`
    height: ${ spacings._4 };
    color: ${ colors.grey_1 };
`

export const DateIcon = styled(DateRangeSVG)`
    height: ${ spacings._4 };
    color: ${ colors.danger_3 };
`

export const DotsIcon = styled(DotsVerticalRoundedSVG)`
    height: ${ spacings._4 };
    color: ${ colors.grey_5 };
`

export const ClockIcon = styled(ClockOutlineSVG)`
    height: ${ spacings._4 };
    color: ${ colors.grey_5 };
`

export const SmallClockIcon = styled(ClockIcon)`
    height: ${ spacings._3 };
`

export const SmallSettingsIcon = styled(SettingsSVG)`
    color: ${ colors.grey_5 };
    height: ${ spacings._3 };
`

export const DownloadIcon = styled(DownloadSVG)`
    height: ${ spacings._5 };
    color: ${ colors.accent_6 };
    cursor: pointer;
`