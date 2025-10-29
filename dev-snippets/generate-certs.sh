#!/usr/bin/env bash
set -e

# ------------------------------
# Configuration
# ------------------------------
CERT_DIR="dev-snippets/nginx/certs"
CERT_KEY="$CERT_DIR/nginx.key"
CERT_FILE="$CERT_DIR/nginx.crt"
DAYS_VALID=365

# ------------------------------
# Certificate Generation
# ------------------------------
if [ -f "$CERT_KEY" ] && [ -f "$CERT_FILE" ]; then
    echo "Certificates already exist. Skipping generation."
else
    echo "Generating self-signed certificates..."
    mkdir -p "$CERT_DIR"
    openssl req -x509 -nodes -days "$DAYS_VALID" -newkey rsa:2048 \
        -keyout "$CERT_KEY" \
        -out "$CERT_FILE" \
        -subj "/C=US/ST=California/L=San Francisco/O=MyProject/OU=Dev/CN=localhost"
    echo "Certificates generated successfully."
fi
