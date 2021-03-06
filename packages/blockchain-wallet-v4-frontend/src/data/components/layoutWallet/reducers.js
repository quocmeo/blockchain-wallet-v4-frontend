import * as AT from './actionTypes'
import { assoc, merge, path } from 'ramda'

const INITIAL_STATE = {
  balancesTable: 'total',
  menuOpened: true,
  settingsOpened: false,
  lockboxOpened: false
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case AT.SET_BALANCES_CHART_TAB: {
      return assoc('balancesTable', payload, state)
    }
    case '@@router/LOCATION_CHANGE': {
      const pathname = path(['location', 'pathname'], payload)
      const settingsOpened = pathname && pathname.split('/')[1] === 'settings'
      const lockboxOpened = pathname && pathname.split('/')[1] === 'lockbox'
      const shouldOpenSettings = !state.settingsOpened && settingsOpened
      return merge(state, {
        trayOpened: false,
        trayContent: '',
        menuOpened: shouldOpenSettings,
        settingsOpened,
        lockboxOpened
      })
    }
    case AT.LAYOUT_WALLET_MENU_TOGGLE_CLICKED: {
      return merge(state, { menuOpened: !state.menuOpened })
    }
    case AT.LAYOUT_WALLET_MENU_CLOSE_CLICKED: {
      return merge(state, { trayOpened: false })
    }
    default:
      return state
  }
}
