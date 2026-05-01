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

        // stage('test') {
        //     agent {
        //         docker {
        //             image 'node:22-alpine'
        //             reuseNode true
        //         }
        //     }
        //     steps {
        //         sh 'npm ci'
        //         sh 'npm run test:unit -- --reporter=verbose'
        //     }
        // }

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
                        // Playwright’s report is a JS app with inline CSS. Jenkins HTML Publisher uses a
                        // sandboxed iframe + CSP, so the in-Jenkins page often stays blank. Use the archived
                        // .tgz: Build → Artifacts → download → extract → open index.html locally.
                        sh '''if [ -d reports-e2e/html ]; then
                            tar czf playwright-html-report.tgz -C reports-e2e/html .
                        fi'''
                        archiveArtifacts artifacts: 'playwright-html-report.tgz', allowEmptyArchive: true
                        echo 'If Playwright HTML Report is blank in Jenkins: download playwright-html-report.tgz from Artifacts, extract, open index.html in your browser.'
                        publishHTML([
                            allowMissing: true,
                            alwaysLinkToLastBuild: true,
                            icon: '',
                            keepAll: false,
                            reportDir: 'reports-e2e/html',
                            reportFiles: 'index.html',
                            reportName: 'Playwright HTML Report',
                            useWrapperFileDirectly: true
                        ])
                        junit allowEmptyResults: true, stdioRetention: 'ALL', testResults: 'reports-e2e/junit.xml'
                    }
                }
            }
        }
    }
}
