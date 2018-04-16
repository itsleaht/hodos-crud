import Vuex from 'vuex'

const state = {
  status: 0,
  message: ''
}

export const NotificationStore = new Vuex.Store ({

  state: state,
  mutations: {
    ADD_NOTIFICATION: (notification) => {
      let notifState = 0
      switch(notification.state) {
        case 'success':
        notifState = 1
          break
        case 'error':
        notifState = 2
          break
      }

      state.status = notifState
      state.message = notification.message
    }
  },
  getters: {
    message: state => state.message,
    status: state => state.status
  },
  actions: {

  }
})
