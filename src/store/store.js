import {createStore} from 'vuex'

export const store = createStore({
  state() {
    return {
      address: null,
      count: 0,
      eventData: null, // State lưu trữ dữ liệu sự kiện
      listNFT: [],
      contractAddress: "0x1aaB50198ac653FF190eBb8A8b5d0f7DE17c5dBe"
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

