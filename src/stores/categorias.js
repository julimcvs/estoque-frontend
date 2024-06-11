import {defineStore} from "pinia";
import axios from "axios";

export const useCategoriasStore = defineStore('categorias', {
  state: () => ({}),
  actions: {
    async adicionarCategoria(form) {
      const url = `${import.meta.env.VITE_API_URL}/category/new`;
      await axios.post(url, form);
    },

    async buscarCategoriaPorId(id) {
      const url = `${import.meta.env.VITE_API_URL}/category/${id}`;
      const {data} = await axios.get(url);
      return data;
    },

    async buscarCategoriasPaginado(paginaAtual, itensPorPagina) {
      const url = `${import.meta.env.VITE_API_URL}/category/filter?page=${paginaAtual}&size=${itensPorPagina}`;
      const {data} = await axios.post(url);
      return data;
    },

    async buscarTodasCategorias() {
      const url = `${import.meta.env.VITE_API_URL}/category`;
      const {data} = await axios.get(url);
      return data;
    },

    async excluirCategoria(id) {
      const url = `${import.meta.env.VITE_API_URL}/category/${id}`;
      await axios.delete(url);
    }
  }
})
