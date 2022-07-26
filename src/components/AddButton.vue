<template>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn color="light-green-10" icon-right="add" label="Agregar" @click="prompt = true"/>
    </q-page-sticky>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your address</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" ref="streetRef" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Guardar" @click="addBook" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTravelBookStore } from '../stores/travel-book-store'

    export default {
        setup() {
            const streetRef = ref(null)

            const src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDsTARwYX8h8G9Bq4NEh1Rh1MQZYp2SoS8&libraries=places"

            const bookStore = useTravelBookStore()

            const books = ref(bookStore.books)

            const prompt = ref(false)

            const address = ref('')

            const addBook = () => {
                const index = books.value.length
                console.log(index, 'el index');
                const newBook = {
                    id: index,
                    name: `${address.value}`,
                    notes: []
                }
                bookStore.createNewBook(newBook)
            }

            onMounted(() => {
                new Promise((resolve, reject) => {
                    let script = document.querySelector(`script[src="${src}"]`)

                    if(!script) {
                        script = document.createElement("script")
                        script.src = src
                        script.async = true
                        script.setAttribute("data-status", "loading")
                        document.head.append(script)
                    }

                    if (script.getAttribute("data-status") === "loaded") {
                        resolve();
                    }

                    function onScriptLoad() {
                        resolve()
                        script.setAttribute("data-status", "loaded")
                    }

                    function onScriptError() {
                        reject()
                        script.setAttribute("data-status", "error")
                    }

                    script.addEventListener("load", onScriptLoad)
                    script.addEventListener("error", onScriptError)

                    onUnmounted(() => {
                        if(document.head.contains(script)) {
                            script.removeEventListener("load", onScriptLoad)
                            script.removeEventListener("error", onScriptError)
                            document.head.removeChild(script)
                        }
                    })

                }).then(()=>{
                    new google.maps.places.Autocomplete(streetRef.value)
                })
            })

            return {
                addBook,
                prompt,
                address,
                streetRef
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>