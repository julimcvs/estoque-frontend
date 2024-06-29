<template>
  <v-container>
    <v-table
      class="table">
      <thead
        class="table-header text-primary">
      <tr>
        <th>
          <p>
            ID
          </p>
        </th>
        <th>
          <p>
            Descrição
          </p>
        </th>
        <th>
          <p>
            Preço
          </p>
        </th>
        <th>
          <p>
            Quantidade
            <v-tooltip
              aria-labelledby="tooltip-quantidade-produto"
              location="top"
            >
              <span id="tooltip-quantidade-produto">Informe a quantidade de produtos da venda.</span>
              <template v-slot:activator="{ props }">
                <v-icon
                  class="pb-1"
                  color="grey"
                  v-bind="props"
                >
                  mdi-information
                </v-icon>
              </template>
            </v-tooltip>
          </p>
        </th>
        <th
          v-if="editable"
          class="text-center">
          Ações
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(produto, i) in form.produtosSelecionados"
        :key="i"
      >
        <td>
          <p>
            {{ produto.id }}
          </p>
        </td>
        <td>
          <p>
            {{ produto.description }}
          </p>
        </td>
        <td>
          <p>
            {{ getPreco(produto.price) }}
          </p>
        </td>
        <td>
          <v-text-field
            v-if="editable"
            v-model="produto.amount"
            :rules="[required, minLength, positive]"
            class="my-2"
            hide-details="auto"
            label="Quantidade"
            placeholder="Quantidade..."
            type="number"
            variant="outlined">
          </v-text-field>
          <p v-else>
            {{ produto.amount }}
          </p>
        </td>
        <td v-if="editable">
          <div class="d-flex justify-center">
            <v-btn
              aria-label="Excluir Produto"
              color="red"
              prepend-icon="mdi-delete"
              size="x-large"
              @click="deletarProduto(i)"
            >
              <p>
                Excluir
              </p>
            </v-btn>
          </div>
        </td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td
          class="text-right"
          colspan="6">
          <v-container class="mt-3">
            <strong>
              Valor Total:
            </strong>
            {{ getValorTotal }}
          </v-container>
        </td>
      </tr>
      </tfoot>
    </v-table>
    <v-container
      v-if="form.produtosSelecionados.length === 0"
      class="mt-5 text-center nenhum-produto">
      Selecione produtos para a venda!
    </v-container>
  </v-container>
</template>
<script>
import {mapWritableState} from "pinia";
import {useVendasStore} from "@/stores/vendas";

export default {
  name: 'TabelaProdutosVendas',
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    deletarProduto(i) {
      this.form.produtosSelecionados.splice(i, 1);
    },

    minLength(value) {
      return value.length > 0 || 'Informe a quantidade de produtos para a venda';
    },

    positive(value) {
      return value > 0 || 'A quantidade deve ser maior que 0.';
    },

    required(value) {
      return !!value || 'Campo obrigatório';
    },

    getPreco(preco) {
      return `R$ ${Number(preco).toFixed(2)}`;
    },
  },

  computed: {
    ...mapWritableState(useVendasStore, ['form']),

    getValorTotal() {
      const valorTotal =
        this.form.produtosSelecionados
          .filter(produto => produto.amount > 0)
          .reduce((acc, produto) => acc + (produto.price * produto.amount), 0);
      return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    },
  },
}
</script>
<style scoped>
.table {
  font-size: 22px;
}

.nenhum-produto {
  font-size: 22px;
}
</style>
