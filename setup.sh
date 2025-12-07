#!/bin/bash

# # V1 Setup
# # Setup the certificate-manager (https://www.slingacademy.com/article/how-to-set-up-ssl-with-lets-encrypt-in-kubernetes/)
# kubectl create namespace cert-manager
# kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.3.0/cert-manager.yaml
# kubectl apply -f ./dev/cert-manager/ClusterIssuer.yaml

# # Add the certificate manager
# helm install image-registry ./dev/image-registry/
# # ===================================================



## == Setup the Image Registry ==
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --set installCRDs=true
# Alternatively install using the yaml
# kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.4/cert-manager.yaml

kubectl apply -f dev/cluster-issuer.yaml


## == Setup the Certificate Manager ==
# sudo apt install apache2-utils

