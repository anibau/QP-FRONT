# Checklist de Producción — Quickshop App V2

## Pre-build

- [ ] Credenciales Firebase en `.env` y EAS Secrets
- [ ] `google-services.json` (Android) configurado en EAS
- [ ] `GoogleService-Info.plist` (iOS) configurado en EAS
- [ ] OAuth Google/Facebook/Apple con bundle IDs `com.quickshop.app`
- [ ] API backend en **HTTPS** (actualmente HTTP en desarrollo)
- [ ] Iconos y splash finales en `assets/images/` (reemplazar placeholders)
- [ ] Política de privacidad y términos accesibles

## Build

```bash
npm run build:production:android
npm run build:production:ios
```

## Post-build

- [ ] Probar AAB/IPA en dispositivos reales
- [ ] Verificar ProGuard/R8 si hay crashes en release Android
- [ ] Validar Remote Config y push en producción
- [ ] Configurar `expo-updates` channel `production`

## Store submission

```bash
npm run submit:android
npm run submit:ios
```

## Web (opcional)

```bash
npx expo export --platform web
# Deploy estático a hosting
```

## Notas de seguridad

- Rotar `GOOGLE_MAP_KEY` y OAuth client IDs expuestos en el repo legacy
- No commitear `.env` con credenciales reales
- Usar EAS Secrets para builds en CI
