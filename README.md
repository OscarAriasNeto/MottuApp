# Mottu Fleet

Aplicativo mobile (React Native + Expo) para controle simples da frota de motos. A entrega da Sprint 3 cobre:

- autenticação local (cadastro/login com AsyncStorage);
- dashboard com contadores da frota;
- CRUD de motos integrado a uma API MockAPI com cache offline básico;
- tema global com suporte automático a dark mode;
- formulários com validação e feedback ao usuário;
- documentação e checklist de publicação.

## Integrantes
- Nome do Integrante 1 — RM 000000
- Nome do Integrante 2 — RM 000000

> Substitua pelos dados corretos antes da entrega oficial.

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
