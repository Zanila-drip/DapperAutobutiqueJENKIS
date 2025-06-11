pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: jnlp
      image: zaniladrip/jenkins-agent-kubectl:latest
      args: ['$(JENKINS_SECRET)', '$(JENKINS_NAME)']
'''
        }
    }
    stages {
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl version --client' // Prueba que kubectl está disponible
                sh 'kubectl apply -f backend-deployment.yaml'
            }
        }
    }
} 
