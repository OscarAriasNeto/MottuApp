import { ConfigContext, ExpoConfig } from '@expo/config';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ID_PLACEHOLDER = 'REPLACE_WITH_YOUR_EAS_PROJECT_ID';
const SLUG_PLACEHOLDER = 'REPLACE_WITH_YOUR_EXPO_SLUG';
const DEFAULT_APP_NAME = 'MottuApp';
const DEFAULT_APP_SLUG = 'mottuapp';

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

const normalizeValue = (
  value: string | undefined | null,
  placeholders: string[]
) => {
  const trimmed = value?.trim();
  if (!trimmed || placeholders.includes(trimmed)) {
    return undefined;
  }

  return trimmed;
};

type StoredProjectSettings = {
  projectId?: string;
  slug?: string;
};

const loadProjectSettingsFromFile = (): StoredProjectSettings => {
  const filePath = path.resolve(__dirname, 'eas.project.json');

  if (!fs.existsSync(filePath)) {
    return {};
  }

  try {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(rawContent) as StoredProjectSettings;
    return {
      projectId: normalizeValue(parsed.projectId, [PROJECT_ID_PLACEHOLDER]),
      slug: normalizeValue(parsed.slug, [PROJECT_ID_PLACEHOLDER, SLUG_PLACEHOLDER]),
    };
  } catch (error) {
    console.warn(
      '⚠️  Não foi possível ler o arquivo eas.project.json. Verifique se o JSON está válido.',
      error
    );
    return {};
  }
};

const requireProjectId = (storedProjectId?: string) => {
  const envProjectId = normalizeValue(
    process.env.EAS_PROJECT_ID ||
      process.env.EXPO_PUBLIC_EAS_PROJECT_ID ||
      process.env.EAS_BUILD_PROJECT_ID,
    [PROJECT_ID_PLACEHOLDER]
  );

  if (envProjectId) {
    return envProjectId;
  }

  if (storedProjectId) {
    return storedProjectId;
  }

  const helpMessage =
    "O identificador do projeto EAS não foi definido. Configure a variável de ambiente 'EAS_PROJECT_ID' (ou 'EXPO_PUBLIC_EAS_PROJECT_ID') ou preencha o campo 'projectId' em 'eas.project.json' antes de iniciar um build. Em builds remotos, a Expo injeta automaticamente 'EAS_BUILD_PROJECT_ID' depois que o projeto está vinculado à sua conta.";

  if (process.env.EAS_BUILD) {
    throw new Error(helpMessage);
  }

  console.warn(`⚠️  ${helpMessage}`);

  return PROJECT_ID_PLACEHOLDER;
};

const looksLikeUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

const inferSlugFromProjectId = (value: string | undefined) => {
  const normalized = normalizeValue(value, [PROJECT_ID_PLACEHOLDER]);

  if (!normalized) {
    return undefined;
  }

  if (normalized.includes('/')) {
    const segments = normalized.split('/').filter(Boolean);
    const slugCandidate = segments.at(-1);
    return normalizeValue(slugCandidate ?? undefined, [PROJECT_ID_PLACEHOLDER, SLUG_PLACEHOLDER]);
  }

  if (!looksLikeUuid(normalized)) {
    return normalized;
  }

  return undefined;
};

const requireProjectSlug = (
  storedSlug: string | undefined,
  configSlug: string | undefined,
  projectIdForInference: string | undefined
) => {
  const normalizeSlug = (value: string | undefined | null) =>
    normalizeValue(value, [PROJECT_ID_PLACEHOLDER, SLUG_PLACEHOLDER, DEFAULT_APP_SLUG]);

  const envSlug = normalizeSlug(
    process.env.EXPO_APP_SLUG ||
      process.env.EXPO_SLUG ||
      process.env.APP_SLUG ||
      process.env.EXPO_PUBLIC_APP_SLUG
  );

  if (envSlug) {
    return envSlug;
  }

  if (storedSlug) {
    return storedSlug;
  }

  const normalizedConfigSlug = normalizeSlug(configSlug);

  if (normalizedConfigSlug) {
    return normalizedConfigSlug;
  }

  const inferredSlug = inferSlugFromProjectId(projectIdForInference);

  if (inferredSlug) {
    return inferredSlug;
  }

  const helpMessage =
    "O 'slug' do projeto Expo não foi definido. Defina a variável de ambiente 'EXPO_APP_SLUG' (ou 'EXPO_SLUG'/'APP_SLUG') ou preencha o campo 'slug' em 'eas.project.json' para corresponder ao slug cadastrado no painel da Expo.";

  if (process.env.EAS_BUILD) {
    throw new Error(helpMessage);
  }

  console.warn(`⚠️  ${helpMessage}`);

  return DEFAULT_APP_SLUG;
};

const { projectId: storedProjectId, slug: storedSlug } = loadProjectSettingsFromFile();

const projectId = requireProjectId(storedProjectId);

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name ?? DEFAULT_APP_NAME,
  slug: requireProjectSlug(storedSlug, config.slug, projectId),
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
    buildNumber: '1.0.0',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    package: 'com.mottuapp.mobile',
    versionCode: 1,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    ...config.extra,
    eas: {
      projectId,
    },
  },
  cli: {
    ...config.cli,
    appVersionSource: 'remote',
  },
});
