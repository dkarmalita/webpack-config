import { getStyle } from './utils'

import './test_data/justCSS.css';
console.log( 'Global CSS:', (getStyle('.justcss') !== undefined)?'loaded':'failed' )

import mcss from './test_data/ls_css.module.css';
console.log('CSS Modules:', mcss.mycss !== undefined ?'loaded':'failed')

import './test_data/just_scss.scss';
console.log( 'Global SCSS:', (getStyle('.justscss') !== undefined)?'loaded':'failed' )

import  mscss from './test_data/just_scss.module.scss';
console.log('SCSS Modules:', mscss.justscss !== undefined ?'loaded':'failed')
