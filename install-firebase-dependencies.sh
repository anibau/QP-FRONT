#!/bin/bash

# Script de instalación de dependencias para migración Firebase Auth
# Este script verifica e instala todas las dependencias necesarias

set -e

echo "🚀 Firebase Auth Web SDK - Script de Instalación"
echo "=================================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar Node.js
echo "📋 Verificando versión de Node.js..."
node_version=$(node -v)
echo "✅ Node.js $node_version"
echo ""

# Verificar npm
echo "📋 Verificando npm..."
npm_version=$(npm -v)
echo "✅ npm $npm_version"
echo ""

# Instalación de dependencias
echo "📦 Instalando dependencias de Firebase..."
npm install firebase@^10.11.1

# Verificar dependencias instaladas
echo ""
echo "📋 Verificando dependencias instaladas..."
echo ""

# Firebase
if npm list firebase > /dev/null 2>&1; then
    echo "✅ firebase instalado"
else
    echo "❌ firebase NO instalado"
    exit 1
fi

# Google Sign-In
if npm list @react-native-google-signin/google-signin > /dev/null 2>&1; then
    echo "✅ @react-native-google-signin/google-signin instalado"
else
    echo "⚠️  @react-native-google-signin/google-signin NO instalado"
fi

# Facebook SDK
if npm list react-native-fbsdk-next > /dev/null 2>&1; then
    echo "✅ react-native-fbsdk-next instalado"
else
    echo "⚠️  react-native-fbsdk-next NO instalado"
fi

# Apple Auth
# if npm list @invertase/react-native-apple-authentication > /dev/null 2>&1; then
#     echo "✅ @invertase/react-native-apple-authentication instalado"
# else
#     echo "⚠️  @invertase/react-native-apple-authentication NO instalado (requerido para iOS)"
# fi

# Async Storage
if npm list @react-native-async-storage/async-storage > /dev/null 2>&1; then
    echo "✅ @react-native-async-storage/async-storage instalado"
else
    echo "❌ @react-native-async-storage/async-storage NO instalado"
    exit 1
fi

echo ""
echo "=========================================="
echo "✅ Instalación completada con éxito"
echo "=========================================="
echo ""
echo "📝 Próximos pasos:"
echo "1. Copiar .env.example a .env.local"
echo "2. Rellenar credenciales de Firebase en .env.local"
echo "3. Ejecutar: npm run android  # para Android"
echo "             npm run ios      # para iOS"
echo "             npm run web      # para Web"
echo ""
echo "📖 Ver: MIGRACION_FIREBASE_AUTH_WEBSDK.md para más detalles"
