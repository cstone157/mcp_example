#!/bin/bash

# Setup the certificate-manager (https://www.slingacademy.com/article/how-to-set-up-ssl-with-lets-encrypt-in-kubernetes/)
kubectl create namespace cert-manager
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.3.0/cert-manager.yaml
kubectl apply -f ./dev/cert-manager/ClusterIssuer.yaml

# Add the certificate manager
helm install image-registry ./dev/image-registry/
