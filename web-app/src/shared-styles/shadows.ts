import { colors } from './colors'
import { spacings } from './spacings'

export const shadowColors =  {
    light: colors.grey_3,
    medium: colors.grey_5 + '80',
    dark: colors.grey_10 + '4d'
}

export const shadowLevels = {
    shadow_1: `0 ${spacings._0} ${spacings._1} 0`,
    shadow_2: `0 ${spacings._1} ${spacings._2} 0`,
    shadow_3: `0 ${spacings._2} ${spacings._3} 0`,
    shadow_4: `0 ${spacings._3} ${spacings._4} 0`,
    shadow_5: `0 ${spacings._4} ${spacings._5} 0`,
}