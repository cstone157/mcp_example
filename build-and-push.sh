#!/usr/bin/env bash

## Build the elastic stack (TO-DO: not actually implemented yet, just a placeholder)
# helm install monitoring helm/base-stack/elasstic

## Build the postgres database with timescaledb and elastic agent
nerdctl build --tag mcp-postgres:v0.1 --file ./postgres/Dockerfile -namespace=k8s.io ./postgres/.

# Build MCP example server and service using nerdctl
nerdctl build --tag mcp-example-server:v0.1 --file ./server-mcp/Dockerfile -namespace=k8s.io ./server-mcp/.
nerdctl build --tag mcp-example-service:v0.1 --file ./server-api/Dockerfile -namespace=k8s.io ./server-api/.
# nerdctl build --tag langchain:v0.1 --file ./langchain/Dockerfile -namespace=k8s.io ./langchain/.

# Deploy the master helm chart
helm install mcp-example ./helm/dev-stack

# Push MCP example server and service using helm
#helm install mcp-server ./server-mcp/helm/
#helm install mcp-webservice ./server-api/helm/
# helm install langchain ./langchain/helm/

