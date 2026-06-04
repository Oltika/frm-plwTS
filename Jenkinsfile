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
                            cat > reports-e2e/jenkins-report-tab/jenkins-report.css << 'CSSEOF'
body { font-family: system-ui, sans-serif; max-width: 44rem; margin: 2rem; line-height: 1.5; }
code { font-size: 0.95em; }
CSSEOF
                            cat > reports-e2e/jenkins-report-tab/index.html << EOF
<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>Playwright report</title>
<link rel="stylesheet" href="jenkins-report.css"></head><body>
<h1>Playwright HTML report</h1>
<p>The interactive Playwright report is JavaScript-heavy. Jenkins HTML Publisher serves it in a sandboxed frame without <code>allow-scripts</code>, so that report stays blank here. Your tests may have run; open the artifact to see results.</p>
${SUMMARY}
<p><strong>Full report with all tests:</strong> on this build open <strong>Artifacts</strong>, download <code>playwright-html-report.tgz</code>, extract, open <code>index.html</code> locally (or run <code>npx playwright show-report path/to/extracted/folder</code>).</p>
<p><strong>Summary in Jenkins:</strong> use the JUnit test report on the same build job page.</p>
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
