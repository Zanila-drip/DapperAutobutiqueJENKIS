pipeline {
    agent any
    stages {
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f backend-deployment.yaml'
                sh 'kubectl apply -f backend-service.yaml'
                // etc...
            }
        }
    }
}