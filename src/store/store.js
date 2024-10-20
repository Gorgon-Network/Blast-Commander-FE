import { reactive } from 'vue'

export const store = reactive({
  address: null,
  logGameEvent(e) {
    console.log(222222, e)
  }
})
