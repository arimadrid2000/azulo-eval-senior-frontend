<template>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn color="cyan-9" glossy icon-right="add" label="Agregar" @click="prompt = true"/>
    </q-page-sticky>
    <q-drawer
        side="right"
        v-model="prompt"
        show-if-above
        bordered
        :breakpoint="500"
        class="bg-grey-1 q-pa-lg"
      >
        <div class="text-h6">Ingrese su destino</div>
        <input autofocus class="address-input" @keyup.enter="prompt = false" v-model="address" @focus="searchFunction" ref="streetRef" />
        <q-btn-group spread class="q-mt-lg">
            <q-btn dense size="md" glossy color="cyan-10" rounded label="Guardar" @click="addBook"/>
            <q-btn dense size="md" glossy color="cyan-10" rounded label="Cancelar" @click="prompt = false"/>
        </q-btn-group>
    </q-drawer>
</template>

<script>
import usePlaces from '../composables/usePlaces'

    export default {
        setup() {
           
           const { addBook, searchFunction, prompt, address, streetRef } = usePlaces()

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
        border-radius: 4px;
        border: 2px solid  $cyan-9;
        &:focus-visible {
            outline: $cyan-4 auto 2px;
        }
    }
</style>