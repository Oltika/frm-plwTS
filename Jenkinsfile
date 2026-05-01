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
                        // Playwright’s report is a client-side app (JS). Jenkins HTML Publisher wraps it in a
                        // sandboxed iframe and applies CSP, so pointing reportDir at reports-e2e/html usually
                        // shows a blank page — not missing tests. Full UI: download playwright-html-report.tgz.
                        sh '''
                            set -e
                            if [ -d reports-e2e/html ]; then
                              tar czf playwright-html-report.tgz -C reports-e2e/html .
                            fi
                            mkdir -p reports-e2e/jenkins-report-tab
                            if [ -f reports-e2e/junit.xml ]; then
                              TC=$(grep -oE 'tests="[0-9]+"' reports-e2e/junit.xml | head -1 | grep -oE '[0-9]+' || echo "?")
                              SUMMARY="<p>JUnit summary: <strong>${TC}</strong> tests (see JUnit report on this build).</p>"
                            else
                              SUMMARY="<p>No junit.xml yet (run may have failed before report generation).</p>"
                            fi
                            cat > reports-e2e/jenkins-report-tab/index.html << EOF
<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>Playwright report</title>
<style>body{font-family:system-ui,sans-serif;max-width:44rem;margin:2rem;line-height:1.5}</style></head><body>
<h1>Playwright HTML report</h1>
<p>The interactive report does not render inside Jenkins (CSP / sandbox). That is expected.</p>
${SUMMARY}
<p><strong>Use the full report:</strong> open <strong>Artifacts</strong>, download <code>playwright-html-report.tgz</code>, extract it, then open <code>index.html</code> in a browser.</p>
<p>To view the interactive report inside Jenkins, an admin must relax <code>DirectoryBrowserSupport</code> CSP (weaker XSS protections on the controller).</p>
</body></html>
EOF
                            '''
                        archiveArtifacts artifacts: 'playwright-html-report.tgz', allowEmptyArchive: true
                        echo 'Full Playwright UI: Artifacts → playwright-html-report.tgz → extract → open index.html locally.'
                        publishHTML([
                            allowMissing: true,
                            alwaysLinkToLastBuild: true,
                            icon: '',
                            keepAll: false,
                            reportDir: 'reports-e2e/jenkins-report-tab',
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
