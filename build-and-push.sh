#!/usr/bin/env bash

# Build and push MCP server and webservice Docker images
set -e

# Configuration
REGISTRY="${REGISTRY:-your-registry}"
MCP_VERSION="${MCP_VERSION:-latest}"
WEBSERVICE_VERSION="${WEBSERVICE_VERSION:-latest}"

echo "Building and pushing Docker images..."

# Build MCP server
MCP_IMAGE="${REGISTRY}/inventory-mcp-server:${MCP_VERSION}"
echo "Building MCP server: ${MCP_IMAGE}"
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t "${MCP_IMAGE}" \
  -f mcp-server/Dockerfile \
  --push \
  mcp-server/

# Build webservice
WEBSERVICE_IMAGE="${REGISTRY}/inventory-webservice:${WEBSERVICE_VERSION}"
echo "Building webservice: ${WEBSERVICE_IMAGE}"
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t "${WEBSERVICE_IMAGE}" \
  -f webservice/Dockerfile \
  --push \
  webservice/

echo "Images built and pushed successfully!"
echo ""
echo "Images:"
echo "  - ${MCP_IMAGE}"
echo "  - ${WEBSERVICE_IMAGE}"
echo ""
echo "Update k8s-deployment.yaml with these image names and deploy:"
echo "  kubectl apply -f mcp-server/k8s-deployment.yaml"
