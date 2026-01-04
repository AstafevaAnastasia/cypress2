pipeline {
    agent any
    
    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chrome', 'firefox', 'edge'],
            description: 'Выберите браузер для запуска тестов'
        )
        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'ui', 'admin', 'parallel_folders'],
            description: 'Выберите набор тестов для запуска'
        )
        booleanParam(
            name: 'PARALLEL_RUN',
            defaultValue: false,
            description: 'Запускать тесты параллельно в разных браузерах'
        )
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Chrome Tests') {
                    when {
                        expression { params.PARALLEL_RUN || params.BROWSER == 'chrome' }
                    }
                    steps {
                        sh "npx cypress run --browser chrome --spec 'cypress/e2e/${params.TEST_SUITE == 'all' ? '**/*' : params.TEST_SUITE == 'parallel_folders' ? 'ui/**/*' : params.TEST_SUITE + '/**/*'}'"
                    }
                }
                
                stage('Firefox Tests') {
                    when {
                        expression { params.PARALLEL_RUN || params.BROWSER == 'firefox' }
                    }
                    steps {
                        sh "npx cypress run --browser firefox --spec 'cypress/e2e/${params.TEST_SUITE == 'all' ? '**/*' : params.TEST_SUITE == 'parallel_folders' ? 'admin/**/*' : params.TEST_SUITE + '/**/*'}'"
                    }
                }
                
                stage('UI Folder Tests') {
                    when {
                        expression { params.TEST_SUITE == 'parallel_folders' && !params.PARALLEL_RUN }
                    }
                    steps {
                        sh 'npx cypress run --spec "cypress/e2e/ui/**/*"'
                    }
                }
                
                stage('Admin Folder Tests') {
                    when {
                        expression { params.TEST_SUITE == 'parallel_folders' && !params.PARALLEL_RUN }
                    }
                    steps {
                        sh 'npx cypress run --spec "cypress/e2e/admin/**/*"'
                    }
                }
            }
        }
    }
    
    post {
        always {
            publishTestResults testResultsPattern: '**/TEST-*.xml'
            archiveArtifacts artifacts: 'cypress/screenshots/**/*, cypress/videos/**/*', allowEmptyArchive: true
        }
        success {
            echo 'Tests completed successfully!'
        }
        failure {
            echo 'Tests failed!'
        }
    }
}