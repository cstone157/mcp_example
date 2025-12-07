#!/bin/bash

# # V1 
# ## Delete the image registry
# helm delete image-registry

# ## Delete the certificate issuer
# kubectl delete -f https://github.com/jetstack/cert-manager/releases/download/v1.3.0/cert-manager.yaml
# kubectl delete -f ./dev/cert-manager/ClusterIssuer.yaml
# kubectl delete namespace cert-manager


kubectl delete -f dev/cluster-issuer.yaml
kubectl delete namespace cert-manager 
