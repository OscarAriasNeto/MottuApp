# Mottu Fleet

## Escopo do Aplicativo
O Mottu Fleet é um app mobile construído com React Native + Expo para gestão de frotas de motos. Ele permite autenticação segura, cadastro/edição/remoção de motos, visualização de métricas em dashboard, sincronização offline-first com API remota e persistência local com AsyncStorage.

## Integrantes
- Nome do Integrante 1 — RM 000000
- Nome do Integrante 2 — RM 000000

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

