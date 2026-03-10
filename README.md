# Plan
    - Build an example application that has a ollama instance, that is only accessible through a custom langchain server that pushes the request to the actual ollama instance and also logs all of the data sent to/from the ollama instance into a postgres database.

- Example mcp application
    - Components
        - [ ] Component


- Plan
    - [ ] Step 1


#### ================================================================================
####                   Links
#### ================================================================================
## https://docs.securityonion.net/en/2.4/index.html
## https://surajsoni3332.medium.com/setting-up-elk-stack-on-kubernetes-a-step-by-step-guide-227690eb57f4
## https://www.kimobu.space/posts/Kubernetes-monitoring-securityonion/

## https://surajsoni3332.medium.com/setting-up-elk-stack-on-kubernetes-a-step-by-step-guide-227690eb57f4
#### ================================================================================

####                   Current
# Deploy ELK to kubernetes 
1. Add the Elastic Helm Repository (https://www.elastic.co/docs/deploy-manage/deploy/cloud-on-k8s/install-using-helm-chart)
    $ helm repo add elastic https://helm.elastic.co
    $ helm repo update
2. Cluster-wide (global) installation
    $ helm install elastic-operator elastic/eck-operator -n elastic-system --create-namespace
    $ 
    $ 
    $ 
    $ 
    $ 



#### ================================================================================
####                           Failed
#### ================================================================================
## (Currently testing) - https://medium.com/@muppedaanvesh/a-hands-on-guide-to-kubernetes-logging-using-elk-stack-filebeat-part-4-%EF%B8%8F-48e233443961
