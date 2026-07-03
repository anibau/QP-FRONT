# PRD — Quick Pay / Quickshop App V2

## 1. Producto

| Campo | Valor |
|-------|--------|
| **Nombre** | Quick Pay (Quickshop App V2) |
| **Código** | `quickshop-app-v2` |
| **Origen** | Migración Expo 43 (`quickshop-app-development`) → Expo 54 |
| **Propósito** | App móvil (y web parcial) para comprar en tiendas asociadas: tiendas, parking, servicios, pagos con tarjeta, historial e incidencias. Soporta rol **usuario** y rol **guardia** (`role_id === 4`). |

## 2. Objetivos de la migración

1. Modernizar runtime a Expo SDK 54 / React Native actual.
2. Mantener navegación de negocio en React Navigation (híbrido con Expo Router solo como shell).
3. Paridad web parcial (login, flujos UI, fallbacks de cámara/OTP/archivos).
4. Capa platform-aware (`src/services/`, wrappers `.native` / `.web`).

## 3. Arquitectura

```
expo-router/entry
  └── app/_layout.tsx          # GestureHandler, BottomSheetModalProvider, Redux, splash
        └── ActiveRoutes       # NavigationIndependentTree + NavigationContainer
              ├── NotAuthenticatedRoutes   # público
              ├── AuthenticatedRoutes      # usuario
              └── GuardRoutes              # guardia (role_id === 4)
```

| Capa | Ubicación |
|------|-----------|
| Shell Expo Router | `app/_layout.tsx`, `app/index.tsx` |
| Navegación | `src/navigation/routes/` |
| Pantallas | `src/screens/` |
| UI legacy | `src/ui/` |
| Componentes platform | `src/components/` (otp, file) |
| Estado | `src/redux/` |
| API / auth | `src/controllers/` |
| Firebase / device / barcode | `src/services/` |
| Config / i18n | `src/config/`, `src/locales/` |

**Regla:** `app/` solo contiene entry de Expo Router. El código de negocio vive en `src/`.

## 4. Gate de autenticación

Definido en `ActiveRoutes.jsx`:

| Condición | Árbol de rutas |
|-----------|----------------|
| `!auth.ready` | Vista vacía (carga sesión) |
| `auth.ready && !auth.isLogged` | **Público** — `NotAuthenticatedRoutes` |
| `auth.isLogged && user.role_id !== 4` | **Privado usuario** — `AuthenticatedRoutes` |
| `auth.isLogged && user.role_id === 4` | **Privado guardia** — `GuardRoutes` |

Sesión: `AsyncStorage` (`AUTH_ASYNCSTORAGE_KEY`) + Redux (`ActionUserSaveData` / `ActionInitApp`).

---

## 5. Rutas públicas (no autenticado)

Stack: `NotAuthenticatedRoutes` — nombres en `src/config/navigation.js` → `initialStack`.

| Route name | Pantalla | Función |
|------------|----------|---------|
| `SignInPage` | Login email/password + sheet social | Entrada principal |
| `SignUpPage` | Registro (también desde social) | Alta de usuario |
| `RecoverPasswordStep1` | Recuperar contraseña | Recuperación |
| `TermsPage` | Términos y condiciones | Legal |
| `PrivacyPage` | Política de privacidad | Legal |

### Flujos públicos

- **Login email:** validación `SignInValidator` → `signInUser` → persistencia token/usuario → Redux → gate privado.
- **Login social:** `LoginSocialSheet` → `signInSocialUser`; si usuario nuevo (p. ej. status 405) → `SignUpPage` con datos prellenados.
- **Registro:** términos/privacidad enlazados a `TermsPage` / `PrivacyPage`.

---

## 6. Rutas privadas — usuario (`role_id !== 4`)

Stack raíz: `AuthenticatedRoutes` (`authenticatedStack.main` = `MainTab`).

### Tabs (`MainTab`)

| Tab | Stack inicial |
|-----|----------------|
| Categorías | `CategoriesStack` |
| Historial | `HistoryStack` |
| Pagos | `PaymentStack` |
| Perfil | `ProfileStack` |

### Pantallas por área

Nombres de ruta según `src/config/navigation.js`.

#### Categorías (`authenticatedCategoriesStack`)

| Route name | Función |
|------------|---------|
| `CategoriesMainPage` | Home categorías |
| `TendsPage` | Listado tiendas |
| `TendsBuyPage` | Compra / barcode |
| `ProductScannPage` | Escaneo producto |
| `TendsBuyCheckout` | Checkout + token OTP |
| `TendsBuyReceiptPage` | Recibo |
| `ParkingPage` / `ParkingSelect` / `ParkingPayPage` | Parking |
| `ServicesPage` / `ServicesPayPage` | Servicios |

#### Historial (`authenticatedHistoryStack`)

| Route name | Función |
|------------|---------|
| `HistoryMainPage` | Listado |
| `HistoryDetailsPage` | Detalle / factura |

#### Pagos (`authenticatedPaymentStack`)

| Route name | Función |
|------------|---------|
| `PaymentMainPage` | Métodos de pago |
| `PaymentRegisterPage` | Alta método |
| `PaymentRegisterCardScreen` | Formulario tarjeta |

#### Perfil (`authenticatedProfileStack`)

| Route name | Función |
|------------|---------|
| `ProfileMainPage` | Ver/editar perfil, password, token |

#### General (`authenticatedGeneralStack`, montado en stack autenticado)

| Route name | Función |
|------------|---------|
| `SuggestionsPage` | Sugerencias |
| `IncidentsListPage` | Listado incidencias |
| `IncidentRegisterPage` | Alta incidencia + adjuntos |
| `IncidentDetailsPage` | Detalle incidencia |

---

## 7. Rutas privadas — guardia (`role_id === 4`)

Stack raíz: `GuardRoutes` (`guardStack.main` = `MainTabGuard`).

### Tabs guardia (`MainTabGuard`)

| Tab | Stack |
|-----|--------|
| Home | `CategoriesGuardStack` |
| Historial | `HistoryGuardStack` |
| Perfil | `ProfileGuardStack` |

### Pantallas guardia

| Route name | Función |
|------------|---------|
| `CategoriesGuardPage` | Home guardia |
| `GuardScannPage` | Escaneo factura |
| `InvoiceGuardPage` | Detalle factura validada |
| `ReportGuardPage` | Reporte |
| `HistoryGuardPage` | Historial validaciones |
| `ProfileGuardPage` | Perfil guardia |
| Incidencias / sugerencias | Mismas pantallas de incidencias en stack guardia |

---

## 8. Requisitos funcionales (alto nivel)

| ID | Requisito |
|----|-----------|
| RF-01 | Login email/password con validación y mensajes de error |
| RF-02 | Login social (Google/Facebook nativo; Apple iOS) |
| RF-03 | Registro con aceptación de términos |
| RF-04 | Recuperación de contraseña |
| RF-05 | Compra en tienda con barcode/scan y checkout OTP |
| RF-06 | Parking y servicios con pago |
| RF-07 | Gestión de tarjetas / método favorito |
| RF-08 | Historial de compras y descarga de comprobantes |
| RF-09 | Incidencias con adjuntos |
| RF-10 | Perfil y cambio de contraseña / estado de token |
| RF-11 | Flujo guardia: scan y validación de facturas |
| RF-12 | Permisos GPS y sheets de configuración |
| RF-13 | Push notifications (nativo) |
| RF-14 | Remote Config: modal de actualización de versión |

## 9. Requisitos no funcionales

| Área | Detalle |
|------|---------|
| Plataformas | Android, iOS (dev client EAS); Web (paridad parcial) |
| Auth storage | AsyncStorage + Redux |
| Seguridad nativa | Jailbreak/root check (skip en web) |
| Backend | `EXPO_PUBLIC_API_BASE_URL` (HTTP en dev; **HTTPS obligatorio en prod**) |
| i18n | ES/EN (`src/locales/`, `expo-localization`) |
| Builds | EAS profiles: development, preview, production |

## 10. Limitaciones web conocidas

- Social login incompleto vs nativo.
- Scanner: fallback entrada manual (`ScannerManualEntry`).
- OTP SMS autofill: no-op; `CodeField` + autocomplete.
- Sin push / jailbreak / Remote Config forzado de store.

## 11. Criterios de aceptación (migración)

- [x] Web arranca sin crash de rutas Expo / NavigationContainer / BottomSheet / OTP.
- [ ] Login web usable (teclado, iconos, formularios) — ver `docs/WEB_SIGNIN_AUDIT.md`.
- [ ] Flujos smoke web: registro, checkout token, incidencias archivo.
- [ ] Dev build Android/iOS: matriz en `QA_MATRIX.md` y `docs/MOBILE_TESTING.md`.

## 12. Referencias

- Levantamiento: `LEVANTAMIENTO.md`
- QA: `QA_MATRIX.md`
- Producción: `PRODUCTION_CHECKLIST.md`
- Pruebas móvil: `docs/MOBILE_TESTING.md`
- Auditoría SignIn web: `docs/WEB_SIGNIN_AUDIT.md`
