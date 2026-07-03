# Documentación técnica — Pruebas en móvil

Quickshop App V2 (Expo 54). Esta guía describe cómo levantar **development / preview builds** y ejecutar casos de prueba en dispositivo o emulador.

**Importante:** no usar **Expo Go**. La app depende de módulos nativos (Google Sign-In, Facebook SDK, jailbreak, etc.) que requieren **dev client** o build EAS.

## 1. Prerrequisitos

| Herramienta | Versión / notas |
|-------------|-----------------|
| Node.js | 20.x LTS |
| npm | 9+ |
| EAS CLI | `npm i -g eas-cli` |
| Android Studio | Emulador o dispositivo USB (debug) |
| Xcode | Solo macOS, para iOS |
| Cuenta Expo | `eas login` |

### Variables de entorno

Copiar y completar `.env` desde `.env.example`:

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
EXPO_PUBLIC_API_BASE_URL=
EXPO_PUBLIC_TERMS_BASE_URL=
EXPO_PUBLIC_PAYMENT_BASE_URL=
EXPO_PUBLIC_GOOGLE_MAP_KEY=
```

Para builds EAS, configurar los mismos valores como **EAS Secrets** y archivos `google-services.json` / `GoogleService-Info.plist` según el perfil.

### Setup local

```powershell
cd quickshop-app-v2
npm install
npm run setup:assets
npm run typecheck
npx expo lint --no-cache
```

## 2. Android — development build

```powershell
cd quickshop-app-v2
eas login
npm run build:dev:android
```

1. Descargar el APK desde el enlace de EAS.
2. Instalar en emulador o dispositivo físico.
3. Arrancar Metro con dev client:

```powershell
npm run start:dev-client
npm run android
```

Alternativa preview:

```powershell
npm run build:preview:android
```

## 3. iOS — development build (macOS)

```powershell
npm run build:dev:ios
npm run start:dev-client
npm run ios
```

Requiere cuenta Apple Developer y configuración de bundle `com.quickshop.app` (o el configurado en `app.json` / EAS).

## 4. Matriz de casos de prueba

Marcar resultados en `QA_MATRIX.md`.

### 4.1 Auth

| # | Caso | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| A1 | Login email/password | Abrir app → ingresar credenciales válidas → Ingresar | Entra a tabs usuario (o guardia si `role_id === 4`) |
| A2 | Login inválido | Credenciales incorrectas | Toast de error; permanece en SignIn |
| A3 | Recordar cuenta | Marcar checkbox, login OK, cerrar app, reabrir | Email precargado |
| A4 | Google Sign-In | Redes sociales → Google | Login o redirección a registro |
| A5 | Facebook Login | Redes sociales → Facebook | Idem |
| A6 | Apple Sign-In (iOS) | Redes sociales → Apple | Idem |
| A7 | Recuperar contraseña | Link en SignIn → flujo recover | Completa sin crash |
| A8 | Registro | Crea una cuenta → formulario + términos | Usuario creado / login |

### 4.2 Usuario — categorías y compra

| # | Caso | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| C1 | Home categorías | Login usuario → tab home | Lista de categorías |
| C2 | Tiendas | Entrar a tiendas / GPS | Listado o sheet GPS |
| C3 | Barcode / scan | Flujo compra → cámara o input | Producto agregado |
| C4 | Checkout + OTP | Checkout → InputTokenSheet | Token validado / pago |
| C5 | Recibo | Tras pago | Pantalla recibo |
| C6 | Parking | Parking → select → pay | Flujo completo |
| C7 | Servicios | Servicios → pay | Flujo completo |

### 4.3 Pagos, historial, incidencias, perfil

| # | Caso | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| P1 | Listar tarjetas | Tab pagos | Métodos visibles |
| P2 | Registrar tarjeta | Alta tarjeta | Tarjeta guardada |
| H1 | Historial | Tab historial | Listado |
| H2 | Detalle / descarga | Abrir item | Detalle; descarga si aplica |
| I1 | Incidencia + adjunto | Registrar incidencia + foto | Creada con archivo |
| PR1 | Editar perfil | Perfil → guardar | Datos actualizados |
| PR2 | Cambio password | Sheet password | OK / error controlado |

### 4.4 Guardia (`role_id === 4`)

| # | Caso | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| G1 | Home guardia | Login guardia | `MainTabGuard` |
| G2 | Scan factura | GuardScannPage | Lectura / validación |
| G3 | Detalle factura | InvoiceGuardPage | Datos factura |
| G4 | Report | ReportGuardPage | Envío reporte |
| G5 | Historial guardia | HistoryGuardPage | Listado validaciones |

### 4.5 Sistema / permisos

| # | Caso | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| S1 | GPS denegado | Denegar ubicación | Sheets Request / Settings |
| S2 | Push token | Primer arranque nativo | Token en AsyncStorage / backend |
| S3 | Remote Config | Versión app &lt; remote | Modal UpdateVersion |
| S4 | Jailbreak/root | Dispositivo rooteado (lab) | InvalidSessionSheet |

## 5. Evidencia y registro

1. Completar checkboxes en `QA_MATRIX.md` (Android / iOS).
2. Adjuntar capturas o video por flujo crítico (auth, checkout, guardia).
3. Anotar build ID de EAS y commit/hash probado.
4. Antes de release: `PRODUCTION_CHECKLIST.md`.

## 6. Comandos de referencia

| Acción | Comando |
|--------|---------|
| Metro dev client | `npm run start:dev-client` |
| Android | `npm run android` |
| iOS | `npm run ios` |
| Build dev Android | `npm run build:dev:android` |
| Build preview Android | `npm run build:preview:android` |
| Build production Android | `npm run build:production:android` |
| Build production iOS | `npm run build:production:ios` |
| Typecheck | `npm run typecheck` |
| Lint | `npx expo lint --no-cache` |
| Smoke web (no sustituye móvil) | `npm run web` |

## 7. Troubleshooting

| Error / síntoma | Solución |
|-----------------|----------|
| `RNGoogleSignin could not be found` | Usar dev build, no Expo Go |
| Assets / imágenes rotas | `npm run setup:assets` |
| Nested NavigationContainer | Ya mitigado con `NavigationIndependentTree` en `ActiveRoutes` |
| BottomSheet crash | Verificar `BottomSheetModalProvider` en `app/_layout.tsx` |
| Firebase incomplete | Completar `.env` / EAS Secrets |
| Login falla en red | Verificar `EXPO_PUBLIC_API_BASE_URL` alcanzable desde el dispositivo (no `localhost` en físico) |
| OAuth Google falla | Client IDs y SHA-1 Android / bundle iOS alineados con Firebase Console |

## 8. Diferencias web vs móvil (no bloquear QA móvil)

| Feature | Móvil | Web |
|---------|-------|-----|
| Google / Facebook / Apple | Nativo | Limitado / mensaje |
| Barcode cámara | `expo-barcode-scanner` / servicio | Entrada manual |
| OTP SMS autofill | `react-native-otp-auto-fill` | CodeField autocomplete |
| Push | expo-notifications | N/A |
| Jailbreak | Check nativo | Skip |

La validación de release **debe** hacerse en builds nativos; web solo acelera UI y flujos no nativos.
