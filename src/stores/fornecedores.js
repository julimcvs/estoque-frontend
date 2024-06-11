import {defineStore} from "pinia";
import axios from "axios";

export const useFornecedoresStore = defineStore('fornecedores', {
  state: () => ({}),
  actions: {
    async adicionarFornecedor(form) {
      const url = `${import.meta.env.VITE_API_URL}/supplier/new`;
      await axios.post(url, form);
    },

    async buscarFornecedorPorId(id) {
      const url = `${import.meta.env.VITE_API_URL}/supplier/${id}`;
      const {data} = await axios.get(url);
      return data;
    },

    async buscarFornecedoresPaginado(paginaAtual, itensPorPagina) {
      const url = `${import.meta.env.VITE_API_URL}/supplier/filter?page=${paginaAtual}&size=${itensPorPagina}`;
      const {data} = await axios.post(url);
      return data;
    },

    async buscarTodosFornecedores() {
      const url = `${import.meta.env.VITE_API_URL}/supplier`;
      const {data} = await axios.get(url);
      return data;
    },

    async excluirFornecedor(id) {
      const url = `${import.meta.env.VITE_API_URL}/supplier/${id}`;
      await axios.delete(url);
    }
  }
})
