import { ref, watch } from "vue"

const dynamicTitle = ref<string>("")

const setTitle = (title?: string) => {
  dynamicTitle.value = "快乐上工"
}

watch(dynamicTitle, (value, oldValue) => {
  if (document && value !== oldValue) {
    document.title = value
  }
})

export function useTitle() {
  return { setTitle }
}
