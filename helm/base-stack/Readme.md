## ===========================================================================================
# helm repo add elastic https://helm.elastic.co
# helm repo update
# 
# kubectl create namespace logging
# helm install elasticsearch elastic/elasticsearch -f elasticsearch-values.yaml --namespace=logging
## ===========================================================================================


# Installation
- Step 1
    - Install kubernetes
- Step 2
    - "Deploy an orchestrator" (Install ECK using a Helm chart) - https://www.elastic.co/docs/deploy-manage/deploy/cloud-on-k8s/install-using-helm-chart
- Step 3
    - "Deploy an Elasticsearch cluster" - https://www.elastic.co/docs/deploy-manage/deploy/cloud-on-k8s/elasticsearch-deployment-quickstart
- Step 4
    - "Deploy a Kibana instance" - https://www.elastic.co/docs/deploy-manage/deploy/cloud-on-k8s/kibana-instance-quickstart
- Step 5
    - "Deploy filebeats-rbac and filebeats" - 


- port forwarding:
    - $ kubectl port-forward service/quickstart-kb-http -n monitoring 5601
- get password
    - $ kubectl get secret quickstart-es-elastic-user -n monitoring -o go-template='{{.data.elastic | base64decode}}'


- Setp 6
    - Deploy apm

- get apm token
    - $ kubectl get secret quickstart-apm-token -n monitoring -o jsonpath='{.data.secret-token}' | base64



== Adding Postgresql monitoring 

Add Postgresql integration (use UI - under integrations)
  - Add aggent

