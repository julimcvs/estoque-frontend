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
            aria-labelledby="tooltip-quantidade"
            location="top"
          >
            <p id="tooltip-quantidade">
              Informe a quantidade dos produtos que serão movimentados.
            </p>
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
              :aria-labelledby="`tooltip-deletar-${i}`"
              location="top"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  aria-label="Excluir Produto"
                  color="red"
                  icon="mdi-delete"
                  v-bind="props"
                  @click="deletarProduto(i)"
                >
                </v-btn>
              </template>
              <span :id="`tooltip-deletar-${i}`">
                Excluir Produto
              </span>
            </v-tooltip>
          </div>
        </td>
      </tr>
      </tbody>
    </v-table>
    <v-container
      v-if="form.produtosSelecionados.length === 0"
      class="mt-5 text-center nenhum-produto">
      Selecione produtos para movimentar!
    </v-container>
  </v-container>
</template>
<script>
import {mapWritableState} from "pinia";
import {useMovimentacaoEstoqueStore} from "@/stores/movimentacao-estoque";

export default {
  name: 'TabelaProdutosMovimentacao',
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
      return value.length > 0 || 'Informe a quantidade de produtos para a movimentação';
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
    ...mapWritableState(useMovimentacaoEstoqueStore, ['form']),
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
