# 🎉 BeUni Aniversários – Plataforma Frontend

> Gestão inteligente de aniversariantes e envio de brindes personalizados para empresas.

---

## 📌 Sumário

- [🎉 BeUni Aniversários – Plataforma Frontend](#-beuni-aniversários--plataforma-frontend)
  - [📌 Sumário](#-sumário)
  - [📸 Visão Geral](#-visão-geral)
  - [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
  - [📂 Estrutura de Pastas](#-estrutura-de-pastas)
  - [🧰 Funcionalidades](#-funcionalidades)
  - [🔐 Autenticação](#-autenticação)
  - [🔗 Integração com API](#-integração-com-api)
  - [🧪 Qualidade e Boas Práticas](#-qualidade-e-boas-práticas)
  - [🛠️ Scripts Disponíveis](#️-scripts-disponíveis)
  - [�‍💻 Autor](#-autor)

---

## 📸 Visão Geral

BeUni Aniversários é um sistema web responsivo para empresas organizarem aniversários de colaboradores e enviarem brindes personalizados. Ele possui autenticação, dashboard interativo, filtros inteligentes e painéis de gestão de funcionários e brindes.

---

## 🚀 Tecnologias Utilizadas

| Categoria                    | Tecnologias                               |
| ---------------------------- | ----------------------------------------- |
| **Framework**                | Next.js 15.3.4 (App Router com Turbopack) |
| **Linguagem**                | TypeScript 5.x                            |
| **UI e Estilo**              | TailwindCSS 4, animate.css, shadcn/ui     |
| **Formulários e Validações** | React Hook Form, Zod                      |
| **Autenticação**             | JWT via localStorage + interceptors       |
| **UX**                       | Framer Motion, Sonner (toasts)            |
| **API HTTP**                 | Axios                                     |
| **Code Quality**             | ESLint + Prettier + Husky + Lint-staged   |
| **Git Workflow**             | Commitizen + Conventional Commits         |

---

## 📂 Estrutura de Pastas

```bash
src/
├── app/
│   ├── (logged)/           # Áreas autenticadas
│   │   ├── dashboard/
│   │   ├── brindes/
│   │   └── funcionarios/
│   └── (public)/           # Acesso e cadastro
├── components/
│   ├── ui/
│   └── structure/
├── constants/
├── hooks/
├── instances/
├── lib/
├── models/
├── services/
│   └── internalAPI/
│       ├── Auth/
│       ├── Dashboard/
│       ├── Employee/
│       └── Gifts/
├── styles/
└── utils/
```

---

## 🧰 Funcionalidades

- 🔐 Login seguro com JWT
- 👤 Cadastro de usuários
- 🎂 Cadastro de funcionários com preenchimento automático de endereço
- 📊 Dashboard com métricas
- 🎁 Gestão de status de brindes
- 🔎 Filtros por mês, departamento, status e texto
- 📱 Layout responsivo com animações

---

## 🔐 Autenticação

- JWT persistido em localStorage
- Axios com interceptor automático para autenticação

---

## 🔗 Integração com API

```ts
internalAPIInstance.employee.getAllEmployees(token, searchTerm, filters)
```

---

## 🧪 Qualidade e Boas Práticas

- ESLint v9 com regras modernas
- Prettier com Tailwind plugin
- Husky + Lint-Staged + Commitizen
- Plugins para ordenação e limpeza de imports

---

## 🛠️ Scripts Disponíveis

```bash
pnpm dev       # Desenvolvimento com Turbopack
pnpm build     # Build de produção
pnpm start     # Servidor
pnpm lint      # Lint do projeto
pnpm commit    # Commit semântico
```

---

## 👨‍💻 Autor

**Igor Sasaki**
Desenvolvedor Full Stack | Tech Lead | Mentor
[LinkedIn](https://www.linkedin.com/in/igorsasaki) • [GitHub](https://github.com/IgorSasaki)
