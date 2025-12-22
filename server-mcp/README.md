## Local development

### Install / Build the server
$ npm install
$ npm run build

### Starting the server
$ node dist/index.js

## Kubernetes

### Build using nerdctl
$ nerdctl build --tag mcp-example-server:v0.1 --namespace=k8s.io --file Dockerfile .