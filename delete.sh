#!/bin/bash

# Delete Registry
kubectl delete namespace registry

# Delete cert-manager
kubectl delete -f dev/cert/letsencrypt-issuer.yaml
kubectl delete -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.0/cert-manager.yaml

