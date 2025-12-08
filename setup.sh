#!/bin/bash

# Create a certificate manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.0/cert-manager.yaml
sleep 10 # We need to wait a few seconds to ensure that that certificate-manager has actually deployed
kubectl apply -f dev/cert/letsencrypt-issuer.yaml

# Create a namespace for a local registry
kubectl create namespace registry
kubectl apply -f dev/registry/registry-certificate.yaml
kubectl apply -f dev/registry/registry-pvc.yaml
kubectl apply -f dev/registry/registry-deployment.yaml
kubectl apply -f dev/registry/registry-service.yaml
kubectl apply -f dev/registry/registry-ingress.yaml
