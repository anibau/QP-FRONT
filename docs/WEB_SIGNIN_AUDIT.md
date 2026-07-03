# Auditoría SignIn web — Quickshop App V2

Fecha: 2026-07-03  
URL revisada: `http://localhost:8081/`  
Código: `src/screens/login/SignInPage.jsx`, `src/ui/general/CustomTextInput.jsx`, `src/ui/general/FixedButton.jsx`

## Resumen

La pantalla de login **carga en web** tras la migración (Expo Router shell + React Navigation + BottomSheet provider). La captura mostraba problemas de **layout desktop** y un bug de teclado en inputs, no un fallo de arquitectura de navegación.

## Qué funciona (refactor OK)

| Elemento | Estado |
|----------|--------|
| Boot web sin crash Expo Router / NavigationContainer / BottomSheet | OK |
| Logo `logo.png`, títulos i18n ES | OK |
| Botón **Ingresar** (`#C22525`) → `signInUser` + Redux `ActionUserSaveData` | Lógica presente |
| Botón **Ingresar con redes sociales** → abre `LoginSocialSheet` | Lógica presente |
| Link recuperar contraseña → `RecoverPasswordStep1` | Lógica presente |
| CTA **Crea una cuenta** (`FixedButton`) → `SignUpPage` | Lógica presente |
| CheckBanner “Recordar mi cuenta” | Lógica presente |
| Stack público vía `NotAuthenticatedRoutes` | OK |
| `BottomSheetModalProvider` en `app/_layout.tsx` | OK |

## Defectos detectados en captura

| Severidad | Problema | Causa | Fix aplicado |
|-----------|----------|-------|-------------|
| **P0** | Icono ojo de contraseña enorme en desktop | `MaterialIcons` size = `sw * 0.07` (ancho ventana web ~1200px) | `RFValue(22)` fijo |
| **P0** | Inputs bloqueaban teclas no numéricas | `onKeyPress` con `preventDefault` si no es `[0-9]` | Solo si `digitsOnly={true}` |
| **P1** | Texto email recortado | `TextInput` sin `minWidth: 0` / `width: 100%` | Corregido en `CustomTextInput` |
| **P1** | Formulario estirado en desktop | Layout pensado para móvil | `maxWidth: 420` en web en `SignInPage` |
| **P1** | Elementos fuera de viewport | Scroll + `FixedButton` absolute | `paddingBottom: 100` en scroll |
| **P2** | Color texto input `#0F4482` | Estilo legacy | Sin cambio (cosmético) |
| **P2** | Social login limitado en web | `auth_social.web` | Documentado; requiere nativo o popup Firebase |

El fondo azul claro del email en la captura es **autofill del navegador**, no un estilo de la app.

## Mapa de acciones

```
SignInPage
  ├─ Ingresar → signInUser → ActionUserSaveData
  │     ├─ role_id !== 4 → AuthenticatedRoutes (MainTab)
  │     └─ role_id === 4 → GuardRoutes (MainTabGuard)
  ├─ Redes sociales → LoginSocialSheet → signInSocialUser | SignUpPage
  ├─ Recuperar contraseña → RecoverPasswordStep1
  └─ Crea una cuenta → SignUpPage
```

## Checklist de verificación post-fix

- [ ] Escribir email/password con teclado (no solo autofill)
- [ ] Icono ojo tamaño razonable en desktop
- [ ] Email completo visible sin recorte
- [ ] Scroll hasta “Recordar mi cuenta”, recuperar contraseña y “Crea una cuenta”
- [ ] Ingresar con credenciales válidas (requiere API en `.env`)
- [ ] Abrir sheet de redes sociales sin crash de BottomSheet

## Archivos tocados

- `src/ui/general/CustomTextInput.jsx`
- `src/screens/login/SignInPage.jsx`
