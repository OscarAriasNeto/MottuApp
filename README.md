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
   Caso já tenha o arquivo versionado (como neste repositório), confirme que o `projectId` foi atribuído automaticamente após o login.

6. **Defina identificadores exclusivos**
   - Ajuste `expo.ios.bundleIdentifier` e `expo.android.package` em `app.json` para valores únicos da sua organização.
   - Atualize também o campo `expo.name` e `expo.slug`, se necessário, antes do build de produção.

7. **Execute um build de desenvolvimento ou preview**
   ```bash
   npx eas build --platform android --profile preview
   # ou
   npx eas build --platform ios --profile preview
   ```
   Utilize o perfil `development` se precisar do cliente de desenvolvimento com Debugger.

8. **Execute o build de produção**
   ```bash
   npx eas build --platform android --profile production
   npx eas build --platform ios --profile production
   ```
   Durante o processo, a CLI solicitará as credenciais necessárias (keystore Android ou certificados Apple).

9. **Acompanhe o progresso no painel da Expo**
   - Acesse [https://expo.dev/accounts](https://expo.dev/accounts)
   - Abra o projeto e acompanhe o status do build.

10. **Publique atualizações (opcional)**
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
