# Relatório da Atividade 4 - Desenvolvimento Front-End II

**Disciplina:** Desenvolvimento Front-End II
**Unidade:** Unidade 4
**Aluno:** Kellvyson Gomes Pimentel
**RA:** 45593308837

---

## Como Desenvolvi a Atividade

Comecei assistindo a vídeo-aula do professor Victor Caetano sobre autenticação com Clerk e roteamento protegido. Ele explicou bem como funciona o sistema de autenticação usando Clerk e como proteger rotas com React Router.

Segui o repositório de referência disponibilizado (https://github.com/dunamis-movement/ads-faith-letters) para entender como implementar a autenticação, mas adaptei para criar uma landing page pública mais elaborada.

Criei uma conta no Clerk.com seguindo as instruções da aula, configurei um novo projeto lá e peguei a chave pública. Depois fui implementando passo a passo: instalação das dependências, configuração do ClerkProvider, criação das páginas e por fim o roteamento protegido.

Quando cheguei num resultado praticamente idêntico ao feito nas aulas e no repositório disponibilizado, usei a IA para dar um toque final no projeto, pedindo que ela transformasse os cards dos missionários em "flipáveis". Fui analisando o que ela fazia e notei que ela criou uma estrutura de container com perspectiva CSS para o efeito 3D, implementou gerenciamento de estado com useState para controlar o flip e a navegação entre cartas, e adicionou componentes de navegação (setas e botão de fechar). Achei interessante como ela resolveu o problema de altura dos cards usando position absolute com backface-visibility para esconder o lado que não está visível durante a animação.

---

## O Que Aprendi e Implementei

Segui a estrutura da aula que usava o Clerk para autenticação, que simplifica bastante porque já vem com componentes prontos como SignInButton, UserButton e os controles de SignedIn/SignedOut. Não precisei me preocupar com toda a parte de segurança, hash de senhas e gerenciamento de sessão que o Clerk já resolve.

Adicionei o React Router seguindo o exemplo do repositório de referência, criando um sistema de rotas que permite navegar entre as páginas sem recarregar tudo. Configurei as rotas usando os componentes do Clerk para proteger a HomePage - se o usuário não estiver autenticado, ele é automaticamente redirecionado para fazer login.

Criei o arquivo `.env.local` para guardar a chave do Clerk como foi mostrado na aula, mantendo essa informação fora do código fonte. Também separei as páginas em HomePage (protegida, só acessível após login) e OpenPage (pública, que serve como landing page).

A parte dos flip cards foi algo que pedi para a IA implementar como um diferencial. Ela criou toda a estrutura com CSS 3D transforms, gerenciamento de estado para controlar qual carta está sendo exibida, e adicionou navegação entre múltiplas cartas com as setas. Foi interessante ver como usou position absolute com backface-visibility para criar o efeito de virar o card.

---

## Tecnologias Utilizadas

- React 19
- TypeScript
- Vite
- Clerk (Autenticação)
- React Router DOM (Roteamento)
- Lucide React (Ícones)
- CSS Modules

---

## Estrutura de Rotas

```
/ (raiz)          -> Protegida - Redireciona para login se não autenticado
/open            -> Pública - Landing page acessível sem login
* (catch-all)    -> Protegida - Qualquer rota desconhecida redireciona para login
```

---

## Como Executar o Projeto

```bash
# Instalar dependências
npm install

# Configurar variável de ambiente
# Criar arquivo .env.local na raiz com:
VITE_CLERK_PUBLISHABLE_KEY=sua_chave_aqui

# Iniciar servidor JSON (API mock)
npm run server

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5174`

**Primeira vez:** Você será redirecionado para fazer login. Clique em "Sign up" para criar uma conta.

**Página pública:** Acesse `http://localhost:5174/open` para ver a landing page sem precisar de login.

---

## Considerações Finais

Esta foi a última unidade da disciplina e consolidou tudo que aprendi ao longo do semestre. O projeto agora está completo com componentização, otimizações de performance, formulários validados e autenticação profissional. A combinação de todas essas técnicas resultou numa aplicação funcional e bem estruturada que pode servir de base para projetos futuros.
