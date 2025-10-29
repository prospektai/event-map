#!/usr/bin/env bash
set -e

# ------------------------------
# Configuration
# ------------------------------
NETWORK_NAME="proxy-network"
DEFAULT_PROFILE="prod"

# ------------------------------
# Determine profile and options
# ------------------------------
PROFILE="prod"
STANDALONE=false

for arg in "$@"; do
  case $arg in
    dev)
      PROFILE="dev"
      shift
      ;;
    prod)
      PROFILE="prod"
      shift
      ;;
    --standalone)
      STANDALONE=true
      shift
      ;;
    *)
      # unknown option
      ;;
  esac
done

echo "Using Docker Compose profile: $PROFILE"
if [ "$PROFILE" = "prod" ] && [ "$STANDALONE" = "true" ]; then
  echo "Running in standalone mode with SSL"
  export USE_SSL=true
else
  export USE_SSL=false
fi

# ------------------------------
# Generate certs for dev profile or standalone prod
# ------------------------------
if [ "$PROFILE" = "dev" ] || { [ "$PROFILE" = "prod" ] && [ "$STANDALONE" = "true" ]; }; then
    ./dev-snippets/generate-certs.sh
fi

# ------------------------------
# Ensure external network exists
# ------------------------------
if ! docker network ls --format '{{.Name}}' | grep -wq "$NETWORK_NAME"; then
    echo "Creating external Docker network: $NETWORK_NAME"
    docker network create "$NETWORK_NAME"
else
    echo "External Docker network '$NETWORK_NAME' already exists"
fi

# ------------------------------
# Run Docker Compose
# ------------------------------
echo "Starting Docker Compose..."
if [ "$PROFILE" = "prod" ] && [ "$USE_SSL" = "true" ]; then
  docker compose --profile "$PROFILE" -f docker-compose.yml -f docker-compose.standalone.yml up -d --build
elif [ "$PROFILE" = "prod" ]; then
  docker compose --profile "$PROFILE" -f docker-compose.yml -f docker-compose.proxy.yml up -d --build
else
  docker compose --profile "$PROFILE" up -d --build
fi

echo "Done! Containers are running with profile: $PROFILE"
