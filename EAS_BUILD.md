# EAS Build — Quickshop App V2

## Prerrequisitos

```bash
npm i -g eas-cli
eas login
eas build:configure
```

## Development builds (QA interna)

```bash
# Android APK con dev client
npm run build:dev:android

# iOS debug (requiere cuenta Apple Developer)
npm run build:dev:ios
```

Tras instalar el build en dispositivo:

```bash
npm run start:dev-client
```

## Preview builds (QA pre-producción)

```bash
npm run build:preview:android
npm run build:preview:ios
```

Distribución interna vía enlace de expo.dev.

## Production builds

```bash
npm run build:production:android   # AAB para Play Store
npm run build:production:ios       # IPA para App Store
```

## Secrets recomendados en EAS

```bash
eas secret:create --name EXPO_PUBLIC_FIREBASE_API_KEY --value "..."
eas secret:create --name EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID --value "..."
```

Configurar el resto de variables `EXPO_PUBLIC_*` igual que en `.env`.

## Submit a stores

```bash
npm run submit:android
npm run submit:ios
```

## Canales OTA (expo-updates)

| Perfil | Canal |
|--------|-------|
| development | development |
| preview | preview |
| production | production |
