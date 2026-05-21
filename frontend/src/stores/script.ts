import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Script {
  id: string;
  title: string;
  theme: string;
  keywords: string[];
  length: string;
  price: number;
  creatorId: string;
  views: number;
  sales: number;
  createdAt: string;
  updatedAt: string;
}

export const useScriptStore = defineStore('script', () => {
  const scripts = ref<Script[]>([]);
  const currentScript = ref<Script | null>(null);
  const loading = ref(false);

  const setScripts = (newScripts: Script[]) => {
    scripts.value = newScripts;
  };

  const setCurrentScript = (script: Script | null) => {
    currentScript.value = script;
  };

  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  return {
    scripts,
    currentScript,
    loading,
    setScripts,
    setCurrentScript,
    setLoading,
  };
});
