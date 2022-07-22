<template>
    <q-input v-model="search" color="yellow-2" outlined dense type="search">
        <template v-slot:prepend>
            <q-icon name="search" />
        </template>
        <template v-slot:after>
            <q-btn round dense flat icon="close" />
        </template>
    </q-input>
</template>

<script lang="ts">
import { ref } from 'vue'

    export default {
        setup() {
            search: ref('')
        }
    }
</script>

<style lang="scss" scoped>

</style>