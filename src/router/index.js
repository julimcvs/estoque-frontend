import {createRouter, createWebHistory} from 'vue-router'
import TheHome from "@/pages/home.vue";
import Produtos from "@/pages/produtos.vue";
import AdicionarProduto from "@/pages/adicionar-produto.vue";
import Index from "@/pages/index.vue";
import Categorias from "@/pages/categorias.vue";
import AdicionarCategoria from "@/pages/adicionar-categoria.vue";
import Fornecedores from "@/pages/fornecedores.vue";
import AdicionarFornecedor from "@/pages/adicionar-fornecedor.vue";
import MovimentacaoEstoque from "@/pages/movimentacao-estoque.vue";
import Vendas from "@/pages/vendas.vue";
import RelatorioVendas from "@/pages/relatorio-vendas.vue";


const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/home',
    children: [
      {path: '/home', component: TheHome},
      {
        path: '/produtos',
        children: [
          {
            path: '',
            component: Produtos,
          },
          {
            path: 'adicionar',
            component: AdicionarProduto,
            meta: {
              breadcrumbs: () => (
                [
                  {
                    title: 'Adicionar Produto',
                    href: '/produtos/adicionar',
                  }
                ]
              )
            }
          }
        ],
        meta: {
          breadcrumbs: () => (
            [
              {
                title: 'Página Inicial',
                href: '/',
              },
              {
                title: 'Produtos',
                href: 'produtos',
              }
            ]
          )
        }
      },
      {
        path: '/categorias',
        children: [
          {
            path: '',
            component: Categorias,
          },
          {
            path: 'adicionar',
            component: AdicionarCategoria,
            meta: {
              breadcrumbs: () => (
                [
                  {
                    title: 'Adicionar Categoria',
                    disabled: true,
                    href: '/categorias/adicionar',
                  }
                ]
              )
            }
          }
        ],
        meta: {
          breadcrumbs: () => (
            [
              {
                title: 'Página Inicial',
                disabled: false,
                href: '/',
              },
              {
                title: 'Categorias',
                disabled: true,
                href: 'categorias',
              }
            ]
          )
        }
      },
      {
        path: '/categorias',
        children: [
          {
            path: '',
            component: Categorias,
          },
          {
            path: 'adicionar',
            component: AdicionarCategoria,
            meta: {
              breadcrumbs: () => (
                [
                  {
                    title: 'Adicionar Categoria',
                    href: '/categorias/adicionar',
                  }
                ]
              )
            }
          }
        ],
        meta: {
          breadcrumbs: () => (
            [
              {
                title: 'Página Inicial',
                href: '/',
              },
              {
                title: 'Categorias',
                href: 'categorias',
              }
            ]
          )
        }
      },

      {
        path: '/fornecedores',
        children: [
          {
            path: '',
            component: Fornecedores,
          },
          {
            path: 'adicionar',
            component: AdicionarFornecedor,
            meta: {
              breadcrumbs: () => (
                [
                  {
                    title: 'Adicionar Fornecedor',
                    href: '/fornecedores/adicionar',
                  }
                ]
              )
            }
          }
        ],
        meta: {
          breadcrumbs: () => (
            [
              {
                title: 'Página Inicial',
                href: '/',
              },
              {
                title: 'Fornecedores',
                href: 'fornecedores',
              }
            ]
          )
        }
      },

      {
        path: '/movimentacoes',
        component: MovimentacaoEstoque,
        children: [
          {
            path: '',

          },
        ],
        meta: {
          breadcrumbs: () => (
            [
              {
                title: 'Página Inicial',
                disabled: false,
                href: '/',
              },
              {
                title: 'Movimentações de Estoque',
                disabled: true,
                href: 'movimentacoes',
              }
            ]
          )
        }
      },

      {
        path: '/vendas',
        component: Vendas,
        children: [
          {
            path: '',

          },
        ],
        meta: {
          breadcrumbs: () => (
            [
              {
                title: 'Página Inicial',
                disabled: false,
                href: '/',
              },
              {
                title: 'Vendas',
                disabled: true,
                href: 'vendas',
              }
            ]
          )
        }
      },

      {
        path: '/relatorio-vendas',
        component: RelatorioVendas,
        children: [
          {
            path: '',

          },
        ],
        meta: {
          breadcrumbs: () => (
            [
              {
                title: 'Página Inicial',
                disabled: false,
                href: '/',
              },
              {
                title: 'Relatório de Vendas',
                disabled: true,
                href: 'relatorio-vendas',
              }
            ]
          )
        }
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
