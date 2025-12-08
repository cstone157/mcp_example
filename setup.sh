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
helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --version v1.13.3 --set installCRDs=true
kubectl apply -f dev/cluster-issuer.yaml


# Create a secret
# sudo apt install apache2-utils
# htpasswd -c -B -b auth myuser mypassword
htpasswd -Bc auth admin
kubectl create secret generic registry-auth-secret --from-file=htpasswd=auth --namespace default


## == Setup the Certificate Manager ==
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm install private-registry bitnami/docker-registry -f bitnami-values.yaml --namespace default