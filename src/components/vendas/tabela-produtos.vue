<template>
  <v-container>
    <v-table
      class="table">
      <thead
        class="table-header text-primary">
      <tr>
        <th>
          ID
        </th>
        <th>
          Descrição
        </th>
        <th>
          Fornecedor
        </th>
        <th>
          Preço
        </th>
        <th>
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
          {{ produto.id }}
        </td>
        <td>
          {{ produto.description }}
        </td>
        <td>
          {{ produto.supplier }}
        </td>
        <td>
          {{ getPreco(produto.price) }}
        </td>
        <td>
          <v-text-field
            v-if="editable"
            v-model="produto.amount"
            :rules="[required, minLength, positive]"
            class="my-2"
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
            <v-tooltip
              :aria-labelledby="`tooltip-excluir-produto-${i}`"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  :aria-label="`tooltip-excluir-produto-${i}`"
                  color="red"
                  icon="mdi-delete"
                  v-bind="props"
                  @click="deletarProduto(i)"
                >
                </v-btn>
              </template>
              <span
                :id="`tooltip-excluir-produto-${i}`">
                Excluir Produto
              </span>
            </v-tooltip>
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
      return `R$ ${preco.toFixed(2)}`;
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
