@Library('jenkins-shared-lib') _
pipeline {
    agent any

    environment {
        BACKEND_IMG = "anushsingla/asha-saathi:backend"
        FRONTEND_IMG = "anushsingla/asha-saathi:frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Prepare Workspace') {
            steps {
                
                sh 'git checkout main'
               
                sh 'git fetch origin' 
                
               
                sh 'git reset --hard origin/main' 
                
               
                sh 'git clean -fd'
            }
        }


        stage('Version Bump') {
            steps {
                script {
                    buildVersion('server')
                }
            }
        }

        stage('Backend - Docker Build') {
            steps {
                script {
                    buildDocker("${BACKEND_IMG}", "server")
                }
            }
        }
        stage('Docker Login') {
           steps {
                  withCredentials([usernamePassword(credentialsId: 'dockerhub-jenkins', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                  sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
               }
            }
       }


        stage('Backend - Docker Push') {
            steps {
                script {
                    pushDocker("${BACKEND_IMG}")
                }
            }
        }

        stage('Frontend - Docker Build') {
            steps {
                script {
                    buildDocker("${FRONTEND_IMG}", "client")
                }
            }
        }

        stage('Frontend - Docker Push') {
            steps {
                script {
                    pushDocker("${FRONTEND_IMG}")
                }
            }
        }

       
        stage('Deploy to Staging') {
            steps {
                script {
                    deployDocker("${BACKEND_IMG}", "asha-backend-staging", "8001:8000")
                }
            }
        }

       
        stage('Approval for Production') {
            steps {
                timeout(time: 2, unit: 'HOURS') {
                    input message: "Deploy to Production?"
                }
            }
        }

        
        stage('Deploy to Production') {
            steps {
                script {
                    deployDocker("${BACKEND_IMG}", "asha-backend", "8000:8000")
                    deployDocker("${FRONTEND_IMG}", "asha-frontend", "3000:80")
                }
            }
        }
    }

    post {
        success {
            echo "Deployment pipeline completed successfully!"
        }
    }
}
