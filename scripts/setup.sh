#!/bin/bash

# 🚀 HELPER SCRIPTS - Automatizar tareas comunes
# Guardar como: scripts/setup.sh

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
  echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║ $1${NC}"
  echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
}

print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

# ============================================
# SETUP INICIAL
# ============================================

setup_initial() {
  print_header "1️⃣ SETUP INICIAL"

  # Verificar Node
  if ! command -v node &> /dev/null; then
    print_error "Node.js no instalado"
    exit 1
  fi
  print_success "Node.js $(node --version)"

  # Verificar npm
  if ! command -v npm &> /dev/null; then
    print_error "npm no instalado"
    exit 1
  fi
  print_success "npm $(npm --version)"

  # Verificar expo
  if ! npm list expo &> /dev/null; then
    print_warning "Expo no instalado, instalando globalmente..."
    npm install -g expo-cli
  fi
  print_success "Expo CLI instalado"
}

# ============================================
# INSTALAR DEPENDENCIAS
# ============================================

install_dependencies() {
  print_header "2️⃣ INSTALAR DEPENDENCIAS"

  print_warning "Instalando dependencias (esto puede tomar 2-3 minutos)..."
  npm install

  print_success "Dependencias instaladas"
}

# ============================================
# CREAR ESTRUCTURA DE CARPETAS
# ============================================

create_structure() {
  print_header "3️⃣ CREAR ESTRUCTURA DE CARPETAS"

  # src/services
  mkdir -p src/services/firebase
  mkdir -p src/services/barcode
  mkdir -p src/services/device
  print_success "src/services/ creada"

  # src/business logic
  mkdir -p src/controllers
  mkdir -p src/hooks
  mkdir -p src/types
  mkdir -p src/utils
  print_success "src/controllers/, hooks/, types/, utils/ creada"

  # src/redux
  mkdir -p src/redux/store
  mkdir -p src/redux/slices
  print_success "src/redux/ creada"

  # components
  mkdir -p components/ui
  mkdir -p components/forms
  mkdir -p components/sheets
  print_success "components/ creada"

  # app routes
  mkdir -p "app/(auth)/login"
  mkdir -p "app/(auth)/register"
  mkdir -p "app/(app)/(tabs)"
  mkdir -p "app/(app)/categories"
  mkdir -p "app/(app)/history"
  mkdir -p "app/(app)/incidents"
  mkdir -p "app/(app)/payment"
  mkdir -p "app/(app)/profile"
  print_success "app/routes creadas"
}

# ============================================
# CREAR ARCHIVO .ENV
# ============================================

create_env_file() {
  print_header "4️⃣ CREAR ARCHIVO .ENV"

  if [ -f ".env" ]; then
    print_warning ".env ya existe, saltando..."
    return
  fi

  cat > .env << 'EOF'
# ⚠️ INSTRUCCIONES:
# 1. Ir a: https://console.firebase.google.com
# 2. Crear proyecto (o usar existente)
# 3. Obtener credenciales en Configuración del proyecto
# 4. Reemplazar valores aquí

# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY="AIzaSyD_REPLACE_ME_"
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN="quickshop-app-develop.firebaseapp.com"
EXPO_PUBLIC_FIREBASE_PROJECT_ID="quickshop-app-develop"
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET="quickshop-app-develop.appspot.com"
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
EXPO_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef123456"

# Google Sign-In OAuth Client IDs
# Obtener de: https://console.cloud.google.com/apis/credentials
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID="123456789-abcdef.apps.googleusercontent.com"
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID="123456789-android.apps.googleusercontent.com"
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID="123456789-ios.apps.googleusercontent.com"

# Facebook App (opcional)
EXPO_PUBLIC_FACEBOOK_APP_ID="123456789"
EOF

  print_success ".env creado"
  print_warning "IMPORTANTE: Editar .env con tus credenciales de Firebase"
}

# ============================================
# VERIFICAR INSTALACIÓN
# ============================================

verify_installation() {
  print_header "5️⃣ VERIFICAR INSTALACIÓN"

  # TypeScript
  if npx tsc --noEmit 2>/dev/null; then
    print_success "TypeScript compila correctamente"
  else
    print_warning "TypeScript tiene errores (esperado si no completaste servicios)"
  fi

  # Estructura
  if [ -d "src/services/firebase" ] && [ -d "app/(auth)" ]; then
    print_success "Estructura de carpetas correcta"
  else
    print_error "Estructura de carpetas incompleta"
  fi

  # Dependencias clave
  for pkg in "expo" "expo-router" "firebase" "@react-native-google-signin/google-signin"; do
    if npm list "$pkg" &>/dev/null; then
      print_success "$pkg instalado"
    else
      print_error "$pkg NO instalado"
    fi
  done
}

# ============================================
# COMANDOS DE DESARROLLO
# ============================================

run_web() {
  print_header "🌐 EJECUTAR EN WEB"
  print_warning "Iniciando servidor web..."
  npm run web
}

run_android() {
  print_header "📱 EJECUTAR EN ANDROID"

  if ! command -v adb &> /dev/null; then
    print_error "Android SDK no instalado"
    print_warning "Descarga Android Studio: https://developer.android.com/studio"
    return
  fi

  print_warning "Asegúrate que:"
  print_warning "1. Android emulator está corriendo (o device conectado)"
  print_warning "2. Has ejecutado: eas build --platform android --profile development"
  read -p "¿Listo para continuar? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx expo start --dev-client --android
  fi
}

run_ios() {
  print_header "🍎 EJECUTAR EN IOS"

  if ! command -v xcode-select &> /dev/null; then
    print_error "Xcode no instalado (solo disponible en macOS)"
    return
  fi

  print_warning "Asegúrate que:"
  print_warning "1. iOS simulator está corriendo"
  print_warning "2. Has ejecutado: eas build --platform ios --profile development"
  read -p "¿Listo para continuar? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx expo start --dev-client --ios
  fi
}

build_android() {
  print_header "🔨 BUILD ANDROID (Development)"

  print_warning "Esto tomará 5-10 minutos..."
  print_warning "El build se hará en servidores de Expo"

  eas build --platform android --profile development

  print_success "Build completado!"
  print_warning "Ve a: https://expo.dev/builds para descargar el APK"
}

build_ios() {
  print_header "🔨 BUILD IOS (Development)"

  print_warning "Esto tomará 10-15 minutos..."
  print_warning "El build se hará en servidores de Expo"

  eas build --platform ios --profile development

  print_success "Build completado!"
  print_warning "Ve a: https://expo.dev/builds para descargar el build"
}

# ============================================
# LIMPIAR PROYECTO
# ============================================

clean_project() {
  print_header "🧹 LIMPIAR PROYECTO"

  print_warning "Esto eliminará: node_modules, .expo, dist, build"
  read -p "¿Estás seguro? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf node_modules .expo dist build .next
    print_success "Proyecto limpiado"
    print_warning "Ejecuta: npm install"
  fi
}

# ============================================
# MENU INTERACTIVO
# ============================================

show_menu() {
  echo ""
  echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║   QUICKSHOP APP V2 - SETUP MENU       ║${NC}"
  echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
  echo ""
  echo "SETUP INICIAL:"
  echo "  1️⃣  - Setup inicial (verificar Node/npm/expo)"
  echo "  2️⃣  - Instalar dependencias (npm install)"
  echo "  3️⃣  - Crear estructura de carpetas"
  echo "  4️⃣  - Crear archivo .env"
  echo "  5️⃣  - Verificar instalación"
  echo ""
  echo "DESARROLLO:"
  echo "  web  - Ejecutar en web (npm run web)"
  echo "  a    - Ejecutar en Android (eas build + dev-client)"
  echo "  i    - Ejecutar en iOS (eas build + dev-client)"
  echo ""
  echo "BUILD:"
  echo "  ba   - Build Android (Development)"
  echo "  bi   - Build iOS (Development)"
  echo ""
  echo "MANTENIMIENTO:"
  echo "  clean - Limpiar proyecto (rm node_modules, etc)"
  echo "  help  - Mostrar esta ayuda"
  echo "  exit  - Salir"
  echo ""
}

# ============================================
# MAIN
# ============================================

if [ $# -eq 0 ]; then
  show_menu
  read -p "Selecciona opción (1-5, web, a, i, ba, bi, clean, help, exit): " choice

  case $choice in
    1)
      setup_initial
      ;;
    2)
      install_dependencies
      ;;
    3)
      create_structure
      ;;
    4)
      create_env_file
      ;;
    5)
      verify_installation
      ;;
    web)
      run_web
      ;;
    a|android)
      run_android
      ;;
    i|ios)
      run_ios
      ;;
    ba|build-android)
      build_android
      ;;
    bi|build-ios)
      build_ios
      ;;
    clean)
      clean_project
      ;;
    help)
      show_menu
      ;;
    exit)
      print_success "Adiós!"
      exit 0
      ;;
    *)
      print_error "Opción inválida"
      show_menu
      ;;
  esac
else
  # Ejecutar comando pasado como argumento
  case $1 in
    setup) setup_initial ;;
    install) install_dependencies ;;
    structure) create_structure ;;
    env) create_env_file ;;
    verify) verify_installation ;;
    web) run_web ;;
    android) run_android ;;
    ios) run_ios ;;
    build-android) build_android ;;
    build-ios) build_ios ;;
    clean) clean_project ;;
    all) setup_initial && install_dependencies && create_structure && create_env_file && verify_installation ;;
    *) 
      echo "Uso: ./setup.sh [setup|install|structure|env|verify|web|android|ios|build-android|build-ios|clean|all]"
      ;;
  esac
fi
