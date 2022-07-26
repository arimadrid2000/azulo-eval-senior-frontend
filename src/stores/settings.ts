import { defineStore } from 'pinia';

export type settings = {
  title: string,
  logo: string,
  buttons: any[],
  texts: any[]
};

export const useSettingsStore = defineStore('settingsStore', {
  state: () => ({
    title: '',
    logo: '',
    buttons: [],
    texts: [],
  } as settings),

  getters: {
    
  },

  actions: {

    setSettings(settings: any) {
        this.title = settings.app_name;
        this.logo = `${process.env.API_URL}assets/${settings.app_logo}/?fit=cover&width=40&height=40&quality=80`
    },
    
  }
});
