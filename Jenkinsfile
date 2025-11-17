@Library('jenkins-shared-lib') _
pipeline {
    agent any

    environment {
        BACKEND_IMG = "anushsingla/asha-saathi:backend"
        FRONTEND_IMG = "anushsingla/asha-saathi:frontend"
    }

    stages {

        stage('Skip CI Check') {
            steps {
                script {
                    def skip = false
                    for (changeSet in currentBuild.changeSets) {
                        for (entry in changeSet.items) {
                            if (entry.msg.contains('[ci skip]')) {
                                skip = true
                                break
                            }
                        }
                        if (skip) break
                    }
                    if (skip) {
                        echo "Build skipped due to [ci skip] commit."
                        currentBuild.result = 'SUCCESS'
                        return
                    }
                }
            }
        }

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
                    // This will bump version and commit [ci skip]
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
                    deployDocker("${BACKEND_IMG}", "asha-backend-staging", "8001:8000",[
                    env: [
                    "OPENAI_API_KEY=${OPENAI_API_KEY_CRED}",
                    "MONGO_URL=${MONGO_URL_CRED}",
                    "JWT_SECRET=${JWT_SECRET_CRED}",
                    "GROQ_KEY=${GROQ_KEY_CRED}"
                ]

                    ])
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
                    deployDocker("${BACKEND_IMG}", "asha-backend", "8000:8000",[                
                    env: [
                    "OPENAI_API_KEY=${OPENAI_API_KEY_CRED}",
                    "MONGO_URL=${MONGO_URL_CRED}",
                    "JWT_SECRET=${JWT_SECRET_CRED}",
                    "GROQ_KEY=${GROQ_KEY_CRED}"
                ]
])
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
