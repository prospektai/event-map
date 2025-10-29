#!/usr/bin/env bash
set -e

# ------------------------------
# Configuration
# ------------------------------
NETWORK_NAME="proxy-network"
DEFAULT_PROFILE="prod"

# ------------------------------
# Determine profile
# ------------------------------
PROFILE=${1:-$DEFAULT_PROFILE}

if [[ "$PROFILE" != "dev" && "$PROFILE" != "prod" ]]; then
    echo "Invalid profile: $PROFILE"
    echo "Usage: $0 [dev|prod]"
    exit 1
fi

echo "Using Docker Compose profile: $PROFILE"

# ------------------------------
# Generate certs for dev profile
# ------------------------------
# if [ "$PROFILE" = "dev" ]; then
#     ./dev-snippets/generate-certs.sh
# fi

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
docker compose --profile "$PROFILE" up -d --build

echo "Done! Containers are running with profile: $PROFILE"
