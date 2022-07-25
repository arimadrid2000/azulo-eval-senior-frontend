<template>
     <q-chat-message
        size="8"
        sent
        text-color="white"
        bg-color="primary"
      >
      <div v-for="msg in selectedBook.notes" :key="msg" class="cursor-pointer">
        <q-btn-dropdown
      color="primay"
    >
      <q-list>
        <q-item clickable v-close-popup @click="editar(msg)">
          <q-item-section>
            <q-item-label>Editar</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Videos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section>
            <q-item-label>Articles</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <div :innerHTML="msg.value"></div>
      </div>
     </q-chat-message>

    <div class="q-pa-md q-gutter-sm">
      <div class="col-2">

      </div>
      <q-editor
        v-model="editor"
        :definitions="{
          save: {
            tip: 'Save your work',
            icon: 'save',
            label: 'Save',
            handler: saveWork
          },
          upload: {
            tip: 'Upload to cloud',
            icon: 'cloud_upload',
            label: 'Upload',
            handler: uploadIt
          }
        }"
        :toolbar="[
          ['bold', 'italic', 'strike', 'underline'],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
          ['upload']
        ]"
      >
      <!-- <template v-slot:image>
          <q-uploader
          style="max-width: 300px"
          url="http://localhost:4444/upload"
          label="Restricted to images"
          multiple
          accept=".jpg, image/*"
        />
      </template> -->
      </q-editor>
      <q-btn color="primary" label="Guardar" @click="enviar"/>
  </div>
</template>

<script lang="ts">
import useNotes from '../composables/useNotes'


    export default {
        setup() {

          const { selectedBook, message, editor, openModal, enviar, editar, saveWork, uploadIt } = useNotes()
            return {
                selectedBook,
                message,
                editor,

                openModal,
                enviar,
                editar,
                saveWork,
                uploadIt
            }
        }
    }
</script>

<style lang="scss" scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>