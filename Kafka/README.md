## Kafka Monitoring with Grafana and Prometheus

We customize ```Prometheus``` define rules to scrape AMQ Streams (Kafka) metrics and create customized dashboards in ```Grafana``` for displaying.

## Pre-requisites and Dependencies

### Cluster Admin Roles
- Monitoring for ```user-defined projects``` is enabled 
- Your cluster admin has created a ```cluster-monitoring-config``` config map in your OpenShift cluster
- Your cluster admin has assigned you a ```monitoring-rules-edit``` or ```monitoring-edit``` role
- Details for setting up OpenShift monitoring and user-defined-workload monitoring can be found here in official Red Hat documentation:  
https://access.redhat.com/documentation/en-us/openshift_container_platform/4.10/html/monitoring/monitoring-overview


### Openshift User-Workload-Monitoring
* Rules specified in JSON templates
* Full support for ```ALL``` and ```ANY``` boolean operators
* Specify ```priority levels``` and cache settings for fine tuning performance
* REST API interface
* Container Image on Docker Hub
* Can be deployed on OpenShift as Pod
* Can be part of EIP design pattern (as a Camel REST endpoint route)
* Can be exposed using OpenShift Route

## Installation

<div class="snippet-clipboard-content notranslate position-relative overflow-auto" data-snippet-clipboard-copy-content="oc apply -f yaml/rulesapi-v1.yaml -n {your namespace}"><pre class="notranslate"><code>oc apply -f yaml/rulesapi-v1.yaml -n {your namespace}</code></pre></div>
