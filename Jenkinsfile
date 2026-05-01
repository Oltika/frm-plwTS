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
            agent none
            stages {
                // One install before parallel work — avoids races where `npm ci` in one
                // branch deletes node_modules while Playwright runs in another (MODULE_NOT_FOUND for playwright-core).
                stage('Install dependencies') {
                    agent {
                        docker {
                            image 'node:22-alpine'
                            reuseNode true
                        }
                    }
                    steps {
                        sh 'npm ci'
                    }
                }
                stage('Run unit tests') {
                    parallel {
                        stage('unit tests') {
                            agent {
                                docker {
                                    image 'node:22-alpine'
                                    reuseNode true
                                }
                            }
                            steps {
                                // Avoid bare `npx vitest`: use lockfile-pinned Vitest from node_modules.
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
                                sh 'npm run test:e2e'
                            }
                        }
                    }
                }
            }
        }

        stage('deploy') {
            agent {
                docker {
                    image 'alpine'
                }
            }
            steps {
                // Mock deployment which does nothing
                echo 'Mock deployment was successful!'
            }
        }
        stage('e2e') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.59.1-jammy'
                    reuseNode true
                }
            }
            environment {
                E2E_BASE_URL = 'https://spanish-cards.netlify.app/'
            }
            steps {
                sh 'npm ci'
                sh 'npm run test:e2e'
            }
            post {
                always {
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        icon: '',
                        keepAll: false,
                        reportDir: 'reports-e2e/html',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Test Report',
                        useWrapperFileDirectly: true
                    ])
                    junit stdioRetention: 'ALL', testResults: 'reports-e2e/junit.xml'
                }
            }
        }
    }
}
