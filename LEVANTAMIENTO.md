# Guía de Levantamiento — Quickshop App V2 (Expo 54)

## Prerrequisitos

| Herramienta | Versión recomendada |
|-------------|---------------------|
| Node.js | 20.x LTS |
| npm | 9+ |
| EAS CLI | `npm i -g eas-cli` |
| Android Studio | Emulador o dispositivo físico |
| Xcode | Solo macOS, para iOS |

## Setup inicial (Windows)

```powershell
cd quickshop-app-v2

# Instalar dependencias (genera assets placeholder automáticamente)
npm install

# Configurar variables de entorno
copy .env.example .env
# Editar .env con credenciales de Firebase Console y Google Cloud

# Verificar tipos y lint
npm run typecheck
npm run lint
```

## Variables de entorno (`.env`)

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=
EXPO_PUBLIC_API_BASE_URL=http://164.92.85.164/api
EXPO_PUBLIC_TERMS_BASE_URL=http://164.92.89.250/
EXPO_PUBLIC_PAYMENT_BASE_URL=http://164.92.85.164
EXPO_PUBLIC_GOOGLE_MAP_KEY=
```

## Desarrollo por plataforma

### Web (validación rápida de UI)

```powershell
npm run web
```

Limitaciones: sin Google Sign-In nativo, sin jailbreak check, sin barcode nativo.

### Android (Development Build — NO usar Expo Go)

```powershell
eas login
npm run build:dev:android
# Instalar APK en dispositivo/emulador
npm run android
```

### iOS (Mac + cuenta Apple Developer)

```powershell
npm run build:dev:ios
npm run ios
```

## Arquitectura de navegación

- **Entrada:** `expo-router/entry` → `app/_layout.tsx` e `app/index.tsx` (solo shell Expo Router)
- **Navegación real:** `ActiveRoutes` (React Navigation v7) montado en el root layout
- **Pantallas:** `src/screens/` (32 pantallas de negocio)
- **UI legacy:** `src/ui/` (componentes de pantalla)
- **Estado:** Redux en `src/redux/`
- **Regla:** `app/` solo contiene `_layout.tsx` e `index.tsx`; el código de negocio vive en `src/`
- **Firebase:** `src/services/firebase/` (capa unificada platform-aware)
- **Controllers:** `src/controllers/` (fuera de `app/` para compatibilidad web)

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run web` | Desarrollo web |
| `npm run start:dev-client` | Metro con dev client |
| `npm run android` | Android con dev client |
| `npm run ios` | iOS con dev client |
| `npm run build:dev:android` | EAS development APK |
| `npm run build:preview:android` | EAS preview APK |
| `npm run build:production:android` | EAS production AAB |
| `npm run submit:android` | Envío a Play Store |

## Troubleshooting

| Error | Solución |
|-------|----------|
| Pantalla "Welcome" de Expo | Verificar que `_layout.tsx` monta `<ActiveRoutes />` |
| Nested NavigationContainer | `ActiveRoutes` usa `NavigationIndependentTree` porque Expo Router ya provee el container raíz |
| `RNGoogleSignin could not be found` | Usar dev build, no Expo Go |
| `requireNativeComponent is not a function` (web) | Usar wrapper OTP en `src/components/otp/`; no importar `react-native-otp-auto-fill` directo |
| Firebase config incomplete | Completar `.env` |
| Assets not found | `npm run setup:assets` |

## Documentación de producto y QA

| Documento | Contenido |
|-----------|-----------|
| [docs/PRD.md](./docs/PRD.md) | PRD, rutas públicas/privadas (usuario y guardia) |
| [docs/MOBILE_TESTING.md](./docs/MOBILE_TESTING.md) | Guía técnica de pruebas en dispositivo |
| [docs/WEB_SIGNIN_AUDIT.md](./docs/WEB_SIGNIN_AUDIT.md) | Auditoría UX SignIn web |

## Producción

Ver [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) y [QA_MATRIX.md](./QA_MATRIX.md).
