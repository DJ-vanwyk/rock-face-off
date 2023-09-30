// You can also use the generator at https://skeleton.dev/docs/generator to create these values for you
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';
export const rock: CustomThemeConfig = {
	name: 'rock',
	properties: {
		'--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '12px',
		'--theme-rounded-container': '12px',
		'--theme-border-base': '2px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '255 255 255',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '0 0 0',
		// =~= Theme Colors  =~=
		// primary | #d81313
		'--color-primary-50': '249 220 220', // #f9dcdc
		'--color-primary-100': '247 208 208', // #f7d0d0
		'--color-primary-200': '245 196 196', // #f5c4c4
		'--color-primary-300': '239 161 161', // #efa1a1
		'--color-primary-400': '228 90 90', // #e45a5a
		'--color-primary-500': '216 19 19', // #d81313
		'--color-primary-600': '194 17 17', // #c21111
		'--color-primary-700': '162 14 14', // #a20e0e
		'--color-primary-800': '130 11 11', // #820b0b
		'--color-primary-900': '106 9 9', // #6a0909
		// secondary | #000000
		'--color-secondary-50': '217 217 217', // #d9d9d9
		'--color-secondary-100': '204 204 204', // #cccccc
		'--color-secondary-200': '191 191 191', // #bfbfbf
		'--color-secondary-300': '153 153 153', // #999999
		'--color-secondary-400': '77 77 77', // #4d4d4d
		'--color-secondary-500': '0 0 0', // #000000
		'--color-secondary-600': '0 0 0', // #000000
		'--color-secondary-700': '0 0 0', // #000000
		'--color-secondary-800': '0 0 0', // #000000
		'--color-secondary-900': '0 0 0', // #000000
		// tertiary | #2154ca
		'--color-tertiary-50': '222 229 247', // #dee5f7
		'--color-tertiary-100': '211 221 244', // #d3ddf4
		'--color-tertiary-200': '200 212 242', // #c8d4f2
		'--color-tertiary-300': '166 187 234', // #a6bbea
		'--color-tertiary-400': '100 135 218', // #6487da
		'--color-tertiary-500': '33 84 202', // #2154ca
		'--color-tertiary-600': '30 76 182', // #1e4cb6
		'--color-tertiary-700': '25 63 152', // #193f98
		'--color-tertiary-800': '20 50 121', // #143279
		'--color-tertiary-900': '16 41 99', // #102963
		// success | #3dcb15
		'--color-success-50': '226 247 220', // #e2f7dc
		'--color-success-100': '216 245 208', // #d8f5d0
		'--color-success-200': '207 242 197', // #cff2c5
		'--color-success-300': '177 234 161', // #b1eaa1
		'--color-success-400': '119 219 91', // #77db5b
		'--color-success-500': '61 203 21', // #3dcb15
		'--color-success-600': '55 183 19', // #37b713
		'--color-success-700': '46 152 16', // #2e9810
		'--color-success-800': '37 122 13', // #257a0d
		'--color-success-900': '30 99 10', // #1e630a
		// warning | #EAB308
		'--color-warning-50': '252 244 218', // #fcf4da
		'--color-warning-100': '251 240 206', // #fbf0ce
		'--color-warning-200': '250 236 193', // #faecc1
		'--color-warning-300': '247 225 156', // #f7e19c
		'--color-warning-400': '240 202 82', // #f0ca52
		'--color-warning-500': '234 179 8', // #EAB308
		'--color-warning-600': '211 161 7', // #d3a107
		'--color-warning-700': '176 134 6', // #b08606
		'--color-warning-800': '140 107 5', // #8c6b05
		'--color-warning-900': '115 88 4', // #735804
		// error | #d93636
		'--color-error-50': '249 225 225', // #f9e1e1
		'--color-error-100': '247 215 215', // #f7d7d7
		'--color-error-200': '246 205 205', // #f6cdcd
		'--color-error-300': '240 175 175', // #f0afaf
		'--color-error-400': '228 114 114', // #e47272
		'--color-error-500': '217 54 54', // #d93636
		'--color-error-600': '195 49 49', // #c33131
		'--color-error-700': '163 41 41', // #a32929
		'--color-error-800': '130 32 32', // #822020
		'--color-error-900': '106 26 26', // #6a1a1a
		// surface | #bbbbbb
		'--color-surface-50': '245 245 245', // #f5f5f5
		'--color-surface-100': '241 241 241', // #f1f1f1
		'--color-surface-200': '238 238 238', // #eeeeee
		'--color-surface-300': '228 228 228', // #e4e4e4
		'--color-surface-400': '207 207 207', // #cfcfcf
		'--color-surface-500': '187 187 187', // #bbbbbb
		'--color-surface-600': '168 168 168', // #a8a8a8
		'--color-surface-700': '140 140 140', // #8c8c8c
		'--color-surface-800': '112 112 112', // #707070
		'--color-surface-900': '92 92 92' // #5c5c5c
	}
};
