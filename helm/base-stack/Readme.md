## Installation
- Step 1
    - Install kubernetes
- Step 2
    - "Deploy an orchestrator" (Install ECK using a Helm chart) - https://www.elastic.co/docs/deploy-manage/deploy/cloud-on-k8s/install-using-helm-chart
    - $ helm repo add elastic https://helm.elastic.co && helm repo update
- Step 3
    - "Deploy an Elasticsearch cluster" - https://www.elastic.co/docs/deploy-manage/deploy/cloud-on-k8s/elasticsearch-deployment-quickstart
    - (Skipped) $ # kubectl create namespace logging
    - (Skipped) $ # helm install elasticsearch elastic/elasticsearch -f elasticsearch-values.yaml --namespace=logging
    - $ helm install monitor .
- Step 4
    -  (Skipped, Included in the script)"Deploy a Kibana instance" - https://www.elastic.co/docs/deploy-manage/deploy/cloud-on-k8s/kibana-instance-quickstart
    - port forwarding:
        - $ kubectl port-forward service/quickstart-kb-http -n monitoring 5601
    - get password
        - $ kubectl get secret quickstart-es-elastic-user -o=jsonpath='{.data.elastic}' -n monitoring | base64 --decode; echo
    - login using 'elastic' and password from previous command

- Step 5
    - "Deploy filebeats-rbac and filebeats" - 
- Setp 6
    - Deploy apm
- get apm token
    - $ kubectl get secret quickstart-apm-token -n monitoring -o jsonpath='{.data.secret-token}' | base64

