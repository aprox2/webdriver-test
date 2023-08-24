# WebdriverIO tests

## About
WebdriverIO tests. Run with either docker for fast and simple, or install and configure the Repo.
A lot of things can also be automated with CI/CD, but I took the liberty not to x(.

## With Docker
### TL;DR Just let me run it
1. Run either ``start_n_rebuild_docker.bat`` or ``start_n_rebuild_docker.sh`` based on your OS. This will run
Selenium-hub container, A Chrome Node container and Build your WebdriverIO image.
2. Then run ``docker run -v "$(pwd)/allure-results:/app/webdriver-test/allure-results" --net selenium-grid -it webdriverio``.
This will run the tests and save results in ``./allure-results/``

### Docker setup
stuff

## Without Docker
### Installation guide