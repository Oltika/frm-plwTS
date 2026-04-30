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
            parallel {
                stage('unit tests') {
                    agent {
                        docker {
                            image 'node:22-alpine'
                            reuseNode true
                        }
                    }
                    steps {
                        // Install deps in this container’s workspace (same as build stage pattern).
                        // Avoid bare `npx vitest`: without node_modules it pulls a random Vitest
                        // version and config loading fails (ERR_MODULE_NOT_FOUND for vitest/config).
                        sh 'npm ci'
                        sh 'npm run test:unit -- --reporter=verbose'
                    }
                }
                stage('integration tests') {
                    agent {
                        doocker {
                            image: 'mcr.microsoft.com/playwright:v1.54.2-jammy'
                            reuseNode true
                        }
                    }
                    steps {
                        sh 'npx playwright test'
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
                    image: 'mcr.microsoft.com/playwright:v1.54.2-jammy'
                    reuseNode true
                }
            }
            environment {
                E2E_BASE_URL = 'https://spanish-cards.netlify.app/'
            }
            steps {
                sh 'npx playwright test'
            }
        }
    }
}