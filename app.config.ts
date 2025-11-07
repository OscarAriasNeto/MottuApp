import { ConfigContext, ExpoConfig } from '@expo/config';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ID_PLACEHOLDER = 'REPLACE_WITH_YOUR_EAS_PROJECT_ID';

const loadLocalEnvFile = () => {
  const envPath = path.resolve(__dirname, '.env');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const content = fs.readFileSync(envPath, 'utf-8');

  for (const line of content.split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
};

loadLocalEnvFile();

const normalizeProjectId = (value: string | undefined | null) => {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === PROJECT_ID_PLACEHOLDER) {
    return undefined;
  }

  return trimmed;
};

const loadProjectIdFromFile = () => {
  const filePath = path.resolve(__dirname, 'eas.project.json');

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  try {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(rawContent) as { projectId?: string };
    return normalizeProjectId(parsed.projectId);
  } catch (error) {
    console.warn(
      '⚠️  Não foi possível ler o arquivo eas.project.json. Verifique se o JSON está válido.',
      error
    );
    return undefined;
  }
};

const requireProjectId = () => {
  const envProjectId = normalizeProjectId(
    process.env.EAS_PROJECT_ID ||
      process.env.EXPO_PUBLIC_EAS_PROJECT_ID ||
      process.env.EAS_BUILD_PROJECT_ID
  );

  if (envProjectId) {
    return envProjectId;
  }

  const fileProjectId = loadProjectIdFromFile();

  if (fileProjectId) {
    return fileProjectId;
  }

  const helpMessage =
    "O identificador do projeto EAS não foi definido. Configure a variável de ambiente 'EAS_PROJECT_ID' (ou 'EXPO_PUBLIC_EAS_PROJECT_ID') ou preencha o campo 'projectId' em 'eas.project.json' antes de iniciar um build. Em builds remotos, a Expo injeta automaticamente 'EAS_BUILD_PROJECT_ID' depois que o projeto está vinculado à sua conta.";

  if (process.env.EAS_BUILD) {
    throw new Error(helpMessage);
  }

  console.warn(`⚠️  ${helpMessage}`);

  return PROJECT_ID_PLACEHOLDER;
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'MottuApp',
  slug: 'MottuApp',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: 'mottuapp',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.mottuapp.mobile',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    package: 'com.mottuapp.mobile',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    ...config.extra,
    eas: {
      projectId: requireProjectId(),
    },
  },
  cli: {
    ...config.cli,
    appVersionSource: 'remote',
  },
});
