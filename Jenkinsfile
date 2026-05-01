pipeline {
    agent any

    options {
        ansiColor('xterm')
    }

    stages {
        stage('build') {
            agent {
                docker {
                    image 'node:22-alpine'
                }
            }
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }

        stage('test') {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'npm ci'
                sh 'npm run test:unit -- --reporter=verbose'
            }
        }

        stage('integration tests') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.59.1-jammy'
                    reuseNode true
                }
            }
            steps {
                sh 'npm ci'
                sh 'npm run test:e2e'
            }
            post {
                always {
                    script {
                        publishHTML([
                            allowMissing: true,
                            alwaysLinkToLastBuild: true,
                            icon: '',
                            keepAll: false,
                            reportDir: 'reports-e2e/html',
                            reportFiles: 'index.html',
                            reportName: 'Playwright Test Report',
                            useWrapperFileDirectly: true
                        ])
                        junit allowEmptyResults: true, stdioRetention: 'ALL', testResults: 'reports-e2e/junit.xml'
                    }
                }
            }
        }
    }
}
