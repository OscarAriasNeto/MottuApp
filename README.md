# MottuApp 🚀

## Escopo do aplicativo

MottuApp é um aplicativo desenvolvido em **React Native** com **Expo**, que permite aos usuários contratar serviços de transporte ou entrega com interface prática e intuitiva.
As principais funcionalidades incluem:

- Cadastro e login de usuários
- Consulta de rotas ou destinos
- Solicitação de corrida ou entrega
- Acompanhamento do trajeto (mapa em tempo real)
- Histórico de viagens ou entregas
- Interface responsiva para diferentes tamanhos de tela

---

## Integrantes

| Nome                     | RM     |
| ------------------------ | ------ |
| Oscar Arias Neto         | 556936 |
| Nicolas Souza dos Santos | 555571 |
| Julia Martis Rebelles    | 554516 |

---

## Instruções de instalação e execução

Siga os passos abaixo para executar o projeto localmente:

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- npm ou yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado globalmente
- Emulador Android/iOS ou dispositivo físico com o aplicativo Expo Go

### Clonando o repositório

```bash
git clone https://github.com/OscarAriasNeto/MottuApp.git
cd MottuApp
```

### Instalando dependências

Com npm:

```bash
npm install
```

Ou com yarn:

```bash
yarn install
```

### Executando o aplicativo

```bash
npm run start
```

Isso abrirá o Metro Bundler no navegador. Você pode:

- Escanear o QR Code com o app Expo Go no seu celular
- Rodar em um emulador Android/iOS (se configurado)
- Abrir no navegador, caso o projeto suporte modo web

---

## Preparando para builds na Expo (expo.dev)

1. **Verifique as dependências**
   ```bash
   npm install
   npx expo install --check
   ```
   O segundo comando garante que todas as bibliotecas estejam alinhadas à versão do SDK.

2. **Cheque a saúde do projeto**
   ```bash
   npx expo-doctor
   ```
   Resolva qualquer aviso ou erro listado antes de prosseguir.

3. **Instale a CLI do EAS** (se ainda não estiver instalada)
   ```bash
   npm install -g eas-cli
   ```

4. **Autentique-se na Expo**
   ```bash
   npx expo login
   ```

5. **Inicialize o EAS no projeto** (gera o `eas.json` se for a primeira vez e associa o app à sua conta)
   ```bash
   npx eas init
   ```
   Após a inicialização, copie o `projectId` exibido no terminal ou no painel da Expo.

6. **Informe o `projectId` do EAS**
   - Você pode optar por manter o identificador em arquivo ou via variável de ambiente:
     - **Arquivo:** edite `eas.project.json` e substitua `REPLACE_WITH_YOUR_EAS_PROJECT_ID` pelo identificador copiado no passo anterior. O arquivo é versionado e mantém o projeto pronto para builds sem configuração adicional.
     - **Variável de ambiente:** se preferir não versionar o ID, duplique o arquivo `.env.example`, renomeie para `.env` e preencha `EAS_PROJECT_ID=<seu_project_id>`. Para builds remotos, registre o valor como segredo com `eas secret:create --name EAS_PROJECT_ID --scope project --type string`.
   - Quando você roda um build remoto na Expo, a plataforma já injeta a variável `EAS_BUILD_PROJECT_ID` após o projeto estar associado à sua conta (`eas init`). A checagem no `app.config.ts` reconhece esse valor automaticamente, então basta garantir o vínculo do app com o projeto certo.

7. **Garanta que o slug corresponde ao projeto Expo**
   - O slug precisa ser exatamente o mesmo exibido no painel da Expo (Project page → Settings → Project slug). Caso haja divergência, o EAS aborta o build com a mensagem:
     > `Slug for project identified by "extra.eas.projectId" (...) does not match the "slug" field (...)`
   - Há duas formas de definir o slug:
     - **Arquivo:** preencha o campo `slug` em `eas.project.json` (mesmo arquivo onde você pode guardar o `projectId`).
     - **Variável de ambiente:** configure `EXPO_APP_SLUG=<seu_slug>` no `.env` local e, para builds remotos, crie o segredo correspondente com `eas secret:create --name EXPO_APP_SLUG --scope project --type string`.
   - Caso o slug não esteja definido ao iniciar um build remoto, o `app.config.ts` interrompe o processo com uma mensagem orientando como preencher o valor correto.
   - Se a mensagem de erro mostrar o placeholder `REPLACE_WITH_YOUR_EXPO_SLUG`, significa que o valor ainda não foi substituído pelo slug real — ajuste o arquivo ou a variável de ambiente antes do próximo build.

8. **Confirme o campo `cli.appVersionSource`**
   - O EAS exige (ou em breve exigirá) que esse campo esteja definido para saber como calcular o versionamento do app.
   - O `app.config.ts` já força `cli.appVersionSource` para `remote`. Caso veja o aviso `The field "cli.appVersionSource" is not set`, garanta que está usando este arquivo de configuração e que não existe outro `app.json` ou `app.config.js` em paralelo sobrescrevendo o valor.

9. **Defina identificadores exclusivos**
   - Ajuste `expo.ios.bundleIdentifier` e `expo.android.package` em `app.config.ts` para valores únicos da sua organização.
   - Atualize também o campo `expo.name`, se necessário, antes do build de produção.

10. **Execute um build de desenvolvimento ou preview**
   ```bash
   npx eas build --platform android --profile preview
   # ou
   npx eas build --platform ios --profile preview
   ```
   Utilize o perfil `development` se precisar do cliente de desenvolvimento com Debugger.

11. **Execute o build de produção**
   ```bash
   npx eas build --platform android --profile production
   npx eas build --platform ios --profile production
   ```
   Durante o processo, a CLI solicitará as credenciais necessárias (keystore Android ou certificados Apple).

12. **Acompanhe o progresso no painel da Expo**
   - Acesse [https://expo.dev/accounts](https://expo.dev/accounts)
   - Abra o projeto e acompanhe o status do build.

13. **Publique atualizações (opcional)**
    ```bash
    npx expo upload:android
    npx expo upload:ios
    # ou use EAS Submit após configurar as credenciais
    npx eas submit --platform android --profile production
    npx eas submit --platform ios --profile production
    ```

### Dicas adicionais

- Mantenha o Node.js na versão LTS para evitar problemas com dependências nativas.
- Sempre execute `npx expo-doctor` antes de iniciar um novo ciclo de builds.
- Configure variáveis de ambiente sensíveis usando arquivos `.env` e bibliotecas como [`expo-constants`](https://docs.expo.dev/versions/latest/sdk/constants/).

---

## Links importantes

- Protótipo no Figma: [https://www.figma.com/design/0tnyRniZ0kMNrR2AwWbh1l/SolutionsNote?node-id=10-23&p=f&t=1ijc4ascnALWc3qK-0](https://www.figma.com/design/0tnyRniZ0kMNrR2AwWbh1l/SolutionsNote?node-id=10-23&p=f&t=1ijc4ascnALWc3qK-0)
- Versão publicada no Expo: [https://expo.dev/accounts/oscar.arias.neto/projects/marcacaoDeConsultasMedicas/builds/b0135c69-0485-4381-a2a8-b4bc009d5200](https://expo.dev/accounts/oscar.arias.neto/projects/marcacaoDeConsultasMedicas/builds/b0135c69-0485-4381-a2a8-b4bc009d5200)

---

## Contribuições

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça seus commits:
   ```bash
   git commit -m "Minha feature"
   ```
4. Envie para sua branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request no GitHub.
