pipeline {
    agent any

    tools {
        nodejs 'node-lts'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }

        // NEW CD STAGE BELOW
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t cicd-lab-app .'
            }
        }

        stage('Run Container & Health Check') {
            steps {
                sh 'docker run -d -p 8081:8081 --name cicd-app cicd-lab-app'
                sh 'sleep 3'
                sh 'curl -f http://localhost:8081/health'
            }
            post {
                always {
                    sh 'docker stop cicd-app || true'
                    sh 'docker rm cicd-app || true'
                }
            }
        }
    }
}
