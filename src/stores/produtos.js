import {defineStore} from "pinia";
import axios from "axios";

export const useProdutosStore = defineStore('produtos', {
  state: () => ({}),
  actions: {
    async adicionarProduto(form) {
      const url = `${import.meta.env.VITE_API_URL}/product/new`;
      await axios.post(url, form);
    },

    async buscarProdutosPaginado(paginaAtual, itensPorPagina) {
      const url = `${import.meta.env.VITE_API_URL}/product/filter?page=${paginaAtual}&size=${itensPorPagina}`;
      const {data} = await axios.post(url);
      return data;
    },

    async buscarProdutoPorId(id) {
      const url = `${import.meta.env.VITE_API_URL}/product/${id}`;
      const {data} = await axios.get(url);
      return data;
    },

    async excluirProduto(id) {
      const url = `${import.meta.env.VITE_API_URL}/product/${id}`;
      await axios.delete(url);
    }
  }
})
