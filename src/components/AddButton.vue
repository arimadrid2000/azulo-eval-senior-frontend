<template>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn color="light-green-10" icon-right="add" label="Agregar" @click="prompt = true"/>
    </q-page-sticky>
    <q-drawer
        side="right"
        v-model="prompt"
        show-if-above
        bordered
        :breakpoint="500"
        class="bg-grey-3"
      >
        <q-card style="min-width: 350px">
            <q-card-section>
            <div class="text-h6">Ingrese su destino</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
            <input autofocus class="address-input" @keyup.enter="prompt = false" v-model="address" @focus="searchFunction" ref="streetRef" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup @click="prompt = false" />
            <q-btn flat label="Guardar" @click="addBook" v-close-popup />
            </q-card-actions>
        </q-card>
      </q-drawer>
</template>

<script>
import { ref, onUnmounted } from 'vue'
import { useTravelBookStore } from '../stores/travel-book-store'

    export default {
        setup() {
            const streetRef = ref(null)

            const src = process.env.MAP_URL

            const bookStore = useTravelBookStore()

            const prompt = ref(false)

            const address = ref('')

            const addBook = () => {
                console.log(streetRef.value, address.value)
                const newBook = {
                    name: `${address.value}`,
                    notes: []
                }
                bookStore.createNewBook(newBook)
                prompt.value = false
            }

            const searchFunction = () => {
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
                    const place = new google.maps.places.Autocomplete(streetRef.value)
                    place.addEventListener("place_changed", () => {
                        address.value = place.getPlace()
                    })
                })
            }

            return {
                addBook,
                searchFunction,
                prompt,
                address,
                streetRef
            }
        }
    }
</script>

<style lang="scss" scoped>
    .address-input {
        width: 100%;
        height: 40px;
        padding: 5px;
        border-radius: 8px;
        border: 2px solid  $secondary;
        &:focus {
            border-color: 2px solid $positive;
        }
    }
</style>