# Matriz QA — Quickshop App V2

Completar antes de release preview/production.

## Verificación automatizada (refactor Web + ESLint — 2026-07-03)

| Check | Resultado |
|-------|-----------|
| `npm run lint` | 0 errores (255 warnings legacy) |
| `npm run typecheck` | OK |
| `npx expo export --platform web` | OK — bundle sin `react-native-otp-auto-fill` |
| Crash web `InputTokenSheet` / OTP | Corregido — wrapper `.native`/`.web` |

## Android (dev build / preview)

| Módulo | Caso | Estado |
|--------|------|--------|
| Auth | Login email/password | [ ] |
| Auth | Google Sign-In | [ ] |
| Auth | Facebook Login | [ ] |
| Auth | Apple Sign-In (iOS) | [ ] |
| Auth | Recuperar contraseña | [ ] |
| Categories | Listado categorías | [ ] |
| Categories | Escaneo barcode | [ ] |
| Categories | GPS / permisos ubicación | [ ] |
| Payment | Registrar tarjeta | [ ] |
| Payment | Pago flujo principal | [ ] |
| History | Listado y detalle | [ ] |
| Incidents | Registro con adjunto | [ ] |
| Profile | Ver/editar perfil | [ ] |
| Push | Token expo-notifications | [ ] |
| Remote Config | Modal actualización versión | [ ] |
| Security | Bloqueo jailbreak/root | [ ] |

## iOS (dev build / preview)

| Módulo | Caso | Estado |
|--------|------|--------|
| Auth | Login email/password | [ ] |
| Auth | Google Sign-In | [ ] |
| Auth | Apple Sign-In | [ ] |
| Categories | Escaneo barcode / cámara | [ ] |
| Payment | WebView pagos | [ ] |
| Push | Permisos y token | [ ] |

## Web

| Módulo | Caso | Estado | Notas |
|--------|------|--------|-------|
| Boot | App carga sin crash OTP | [x] | `OtpAutoFill.web.jsx` no-op |
| Boot | NavigationContainer / BottomSheet | [x] | `NavigationIndependentTree` + `BottomSheetModalProvider` |
| Auth | SignIn UI (teclado, icono ojo, layout) | [x] | Fix P0 `CustomTextInput` + `maxWidth` web — ver `docs/WEB_SIGNIN_AUDIT.md` |
| Auth | Login email/password (API) | [ ] | Requiere `.env` + backend alcanzable |
| Auth | Registro con CheckBox términos | [ ] | Componente `CheckBox.jsx` nuevo |
| UI | Navegación principal | [ ] | |
| UI | i18n ES/EN | [x] | `getLocales()` Expo 54 |
| Categories | Checkout / InputTokenSheet | [ ] | CodeField + autocomplete web |
| Categories | Scanner manual (web fallback) | [ ] | `ScannerManualEntry` |
| Incidents | Adjuntar archivo | [ ] | `FileSelector.web` input file |
| Incidents | Descargar adjunto | [ ] | `download.web.js` blob |
| History | Descarga PDF factura | [ ] | `download.web.js` |
| Remote Config | Fetch Firebase web | [x] | Implementado en `remote-config.web.ts` |

Documentación: `docs/PRD.md`, `docs/MOBILE_TESTING.md`, `docs/WEB_SIGNIN_AUDIT.md`.

## Comandos de build QA

```bash
npm run build:preview:android
npm run build:preview:ios
```

Tras instalar el build, ejecutar Metro:

```bash
npm run start:dev-client
```

Smoke test web local:

```bash
npm run web
```
