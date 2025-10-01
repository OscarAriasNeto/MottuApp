# Mottu Fleet

Aplicativo mobile (React Native + Expo) para controle simples da frota de motos. A entrega da Sprint 3 cobre:

- autenticação local (cadastro/login com AsyncStorage);
- dashboard com contadores da frota;
- CRUD de motos integrado a uma API MockAPI com cache offline básico;
- tema global com suporte automático a dark mode;
- formulários com validação e feedback ao usuário;
- documentação e checklist de publicação.

## Escopo do Aplicativo
O Mottu Fleet é um app mobile construído com React Native + Expo para gestão de frotas de motos. Ele permite autenticação segura, cadastro/edição/remoção de motos, visualização de métricas em dashboard, sincronização offline-first com API remota e persistência local com AsyncStorage.

## Integrantes
Oscar Arias Neto - RM556936
Julia Martins Rebelles - RM554516
Nicolas Souza dos Santos - RM555571
-

## Arquitetura resumida
```
src/
├── components/      # Button, Input, Screen, EmptyState, Loading
├── hooks/           # AuthProvider/useAuth, useMotos (estado + cache)
├── navigation/      # Stacks/Tabs do React Navigation tipados
├── screens/         # Telas (Auth, Welcome, Dashboard, Moto, Settings)
├── services/        # API (axios) centralizada
├── storage/         # Helpers de AsyncStorage (auth, motos)
├── theme/           # Tokens e ThemeProvider
├── types/           # Tipos compartilhados (Moto, User)
└── utils/           # Funções auxiliares (formatters, testes)
```
A separação mantém as telas enxutas e facilita reutilização de componentes/serviços.

## Requisitos
- Node.js 20+
- npm 10+
- Expo CLI (`npx expo`) instalado globalmente ou uso via `npx`
- Emulador Android/iOS ou dispositivo físico com Expo Go

## Instalação
```bash
npm install
```
> Caso a rede corporativa bloqueie o registry, ajuste o proxy/DNS antes de prosseguir.

## Execução
```bash
npm run start      # abre o Expo Dev Tools
npm run android    # roda no emulador/dispositivo Android
npm run ios        # roda no simulador iOS
```

## Configuração da API
O app usa por padrão a API pública em `https://64f3a464932537a40579d928.mockapi.io/api/v1`.
Se desejar apontar para outro endpoint, altere `extra.expoPublicApiUrl` em `app.json` ou defina a variável `EXPO_PUBLIC_API_URL`.

## Links (atualize após a publicação)
- Figma: https://www.figma.com/file/xxxxxxxx/mottu-fleet
- Expo Publish: https://expo.dev/@seu-usuario/mottu-fleet

## Fluxos principais
1. **Cadastro/Login** – cadastre-se com nome, e-mail e senha; as credenciais ficam salvas no AsyncStorage.
2. **Listagem de motos** – consome a API e salva cache local; ao puxar para atualizar, força nova sincronização.
3. **Cadastro/Edição** – formulário validado com React Hook Form + Zod, feedback de sucesso/erro e máscara de placa Mercosul.
4. **Remoção** – confirmação via `Alert` com fallback de erro em caso de falha de rede.

## Boas práticas adotadas
- Tema global com tokens de cores, espaçamentos e tipografia + dark mode automático.
- Componentes reutilizáveis (Button, Input, Screen) com foco em acessibilidade (`accessibilityRole`, estados, contraste).
- Persistência combinada (AsyncStorage + API) com fallback offline simples para a listagem de motos.
- Validação declarativa com Zod + React Hook Form.
- Código tipado com TypeScript estrito.

## Scripts úteis
- `npm run start` – inicia o Metro/Expo.
- `npm run lint` – roda ESLint.
- `npm run format` – executa Prettier em modo check.
- `npm run type-check` – valida tipos (`tsc --noEmit`).
- `npm test` – executa Jest (ex. testes de utilitários).

## Publicação com Expo
1. `npx expo login`
2. Ajuste nome/ícones em `app.json` se necessário.
3. Garanta que `extra.expoPublicApiUrl` aponta para o endpoint correto.
4. Rode `npm run lint`, `npm run type-check` e `npm test`.
5. Execute `npx expo publish`.
6. Atualize o link público no README.

Referência: Aula 15/05/2025 – Publicação com Expo.

## FAQ rápido
- **Erro de rede ao instalar**: confira conexão, proxy ou DNS (use `8.8.8.8`).
- **Login falhou**: confirme e-mail/senha cadastrados; caso esqueça, registre novamente para sobrescrever.
- **Placa rejeitada**: use o formato Mercosul `AAA1A23`.
- **Sem internet**: a lista usa o último cache salvo; ao recuperar a conexão, use o pull-to-refresh para sincronizar.
=======
> Substitua pelos dados corretos do time antes da entrega final.

## Arquitetura
```
src/
├── app/              # Telas e rotas agrupadas por domínio (auth, motos, dashboard, settings, welcome)
├── components/       # UI Kit reutilizável (Button, Input, Card, Screen, etc.)
├── contexts/         # Providers de estado global (AuthContext)
├── hooks/            # Hooks customizados (useAuth, useMotos)
├── navigation/       # Configuração central do React Navigation + tipagens
├── providers/        # Providers globais (ThemeProvider, QueryClient, Auth)
├── services/         # Camada de API e integrações (axios + offline queue)
├── stores/           # Zustand stores (motos)
├── theme/            # Tokens de design e tipagem do tema
├── types/            # Tipos TypeScript compartilhados (Moto, User)
├── utils/            # Helpers de storage, fila offline, formatadores
```
Justificativa: a separação por responsabilidades facilita reuso, testes e evolução incremental das features. A camada de serviços encapsula a estratégia offline-first e a pasta `app` mantém as telas próximas de seus domínios de negócio.

## Requisitos
- Node.js 20+
- npm 10+ ou yarn 1.22+
- Expo CLI (`npm install -g expo-cli`) ou uso do `npx expo`
- Emulador Android/iOS configurado ou dispositivo físico com Expo Go

## Instalação & Execução
```bash
# instalar dependências principais
npm install

# instalar dependências Expo com versão compatível
npx expo install @react-native-async-storage/async-storage @react-native-community/netinfo @react-native-picker/picker @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens @react-native-vector-icons

# libs JS adicionais
npm install axios react-hook-form @hookform/resolvers zod styled-components zustand @shopify/flash-list @tanstack/react-query uuid

# tipagens e ferramentas de DX
npm install -D @types/styled-components @types/styled-components-react-native @types/uuid @testing-library/react-native @testing-library/jest-native jest jest-expo eslint prettier husky lint-staged

# rodar aplicação
npm run start
```

### Variáveis de Ambiente
Configure um arquivo `.env` ou use `app.json` para definir o endpoint da API:
```
EXPO_PUBLIC_API_URL=https://64f3a464932537a40579d928.mockapi.io/api/v1
```
Se não definido, o app usa o valor acima como padrão.

## Links
- Figma atualizado: https://www.figma.com/file/xxxxxxxx/Mottu-Fleet (substituir pelo link real)
- Expo Publish: https://expo.dev/@mottu/mottu-fleet (atualizar após `expo publish`)

## Exemplos de Uso
1. **Login**: use `eve.holt@reqres.in` / `cityslicka` para autenticar rapidamente no ambiente de testes.
2. **Cadastro de moto**: acesse *Motos > Adicionar moto*, preencha placa no formato `ABC1D23`, informe status e quilometragem. Ao salvar offline, a moto é adicionada ao cache e sincronizada automaticamente quando a conexão retornar.
3. **Sincronização manual**: em *Configurações* toque em “Sincronizar agora” para disparar a fila offline e atualizar o cache.

## Estrutura de Pastas
```
src/
  app/
    auth/
    dashboard/
    motos/
    settings/
    welcome/
  components/
  contexts/
  hooks/
  navigation/
  providers/
  services/
  stores/
  theme/
  types/
  utils/
```

## Boas Práticas Adotadas
- **Tema global** com tokens de cor, tipografia, espaçamento e suporte a dark mode automático.
- **Validação com Zod + React Hook Form** para garantir UX consistente nos formulários.
- **Offline-first**: cache em AsyncStorage, fila de mutações e retry automático via NetInfo.
- **Acessibilidade**: uso de `accessibilityLabel`, roles semânticas e botões com área de toque ≥48px.
- **Arquitetura modular** separando UI, domínio e infraestrutura.

## Scripts Disponíveis
- `npm run start` – inicia o Metro bundler.
- `npm run android` / `npm run ios` / `npm run web` – executa o app nos respectivos ambientes.
- `npm run lint` – roda ESLint com as regras configuradas.
- `npm run format` – aplica Prettier.
- `npm run type-check` – valida tipos com TypeScript (`tsc --noEmit`).
- `npm test` – executa Jest + React Native Testing Library.
- `npm run prepare` – instala hooks do Husky.

## Publicação no Expo
1. Faça login: `npx expo login`.
2. Atualize os ícones/splash em `assets/` se necessário.
3. Garanta que `app.json` contém `slug`, `scheme`, `extra.expoPublicApiUrl` e ícones corretos.
4. Execute `npm run lint` e `npm run type-check` para evitar falhas.
5. Rode `npx expo publish` para gerar o link público (ex: `https://expo.dev/@mottu/mottu-fleet`).
6. Compartilhe o link no README e no formulário de entrega.

> Referência: Aula 15/05/2025 – Publicação com Expo (login, build profile, gerenciamento de versões e uso do Expo Go).

## FAQ (Problemas Comuns)
- **Erro 403 ao instalar dependências**: verifique proxies/regras corporativas. Use uma rede aberta ou configure o `.npmrc` com credenciais corretas.
- **Falha de login**: apenas emails cadastrados (ex.: `eve.holt@reqres.in`) são aceitos pela API ReqRes usada no MVP.
- **Placa inválida**: o formato aceito é `AAA1A23` (Mercosul). Ajuste o input antes de salvar.
- **Sem internet**: os dados exibidos são do cache local. Assim que a conexão voltar, a fila offline sincroniza automaticamente ou via botão em Configurações.
