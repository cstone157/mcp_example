# Plan
    - Build an example application that has a ollama instance, that is only accessible through a custom langchain server that pushes the request to the actual ollama instance and also logs all of the data sent to/from the ollama instance into a postgres database.


# ELK
1. Add the Elastic Helm Repository 
    - https://www.elastic.co/docs/deploy-manage/deploy/cloud-on-k8s/install-using-helm-chart
    $ helm repo add elastic https://helm.elastic.co
    $ helm repo update

    ## $ helm install elastic-operator elastic/eck-operator -n elastic-system --create-namespace
2. Create a Kubernetes Namespace 
    $ kubectl create namespace logging
3. Deploy Elasticsearch
    $ helm install elasticsearch elastic/elasticsearch --namespace logging --set replicas=1 --set esJavaOpts="-Xmx512m -Xms512m"
        NOTES:
            1. Watch all cluster members come up.
                $ kubectl get pods --namespace=logging -l app=elasticsearch-master -w
            2. Retrieve elastic user's password.
                $ kubectl get secrets --namespace=logging elasticsearch-master-credentials -ojsonpath='{.data.password}' | base64 -d
            3. Test cluster health using Helm test.
                $ helm --namespace=logging test elasticsearch
4. Deploy Kibana
    $ helm install kibana elastic/kibana --namespace logging
        NOTES:
            1. Watch all containers come up.
                $ kubectl get pods --namespace=logging -l release=kibana -w
            2. Retrieve the elastic user's password.
                $ kubectl get secrets --namespace=logging elasticsearch-master-credentials -ojsonpath='{.data.password}' | base64 -d
            3. Retrieve the kibana service account token.
                $ kubectl get secrets --namespace=logging kibana-kibana-es-token -ojsonpath='{.data.token}' | base64 -d
5. Deploy Logstash and Filebeat (Optional, but Recommended) 
    $ # To deploy Filebeat
    $ helm install filebeat elastic/filebeat --namespace logging
    $ # To deploy Logstash
    $ helm install logstash elastic/logstash --namespace logging


# Grafana K8 Dashboard
$ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
$ helm show values prometheus-community/kube-prometheus-stack
$ kubectl create ns monitoring
$ helm install monitoring prometheus-community/kube-prometheus-stack -n monitoring --values ./helm/base-stack/grafana/monitoring-values.yaml
