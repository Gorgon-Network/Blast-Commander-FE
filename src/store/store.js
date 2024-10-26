import {createStore} from 'vuex'

export const store = createStore({
  state() {
    return {
      address: null,
      count: 0,
      eventData: null, // State lưu trữ dữ liệu sự kiện
      listNFT: [],
    }
  },
  mutations: {
    setWallet(state, data) {
      state.address = data;
    },
    setEventData(state, payload) {
      console.log('setEventData');
      state.eventData = payload;
    },
    setListNFT(state, data) {
      state.listNFT = data;
    }
  },
  actions: {
    updateEventData({commit}, data) {
      commit('setEventData', data);
    },
  },
})

