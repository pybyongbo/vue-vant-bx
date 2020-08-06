import { Validator } from 'vee-validate'
import { trimStr } from '@/utils/tools'

export const userName = value => /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,20}$/.test(trimStr(value))
export const isMobile = value => /^1[3456789]\d{9}$/.test(value)
export const checker = value => !!value

Validator.extend('username', userName);
Validator.extend('mobile', isMobile)
Validator.extend('checkbox', checker)