# Project Overview

This is a test-driven development (TDD) web-based application that reads RSS feeds. 

## Table Of Contents

    1. [Prerequiste] (## Prerequiste)
    2. [Dependencies] (## Dependencies)
    3. [Project folder srtucure] (## Project folder srtucure)
    4. [How to Run] (## How to Run)
    5. [Test Suites and their Specs] (## Test Suites and their Specs(tests))

## Prerequiste

    * An installed web browser preferably up to date
    * A sucessful test requires internet connectivity.
    * (Optional) An IDE to read and modify as it suits you

## Dependencies

    * [Google fonts Roboto family](https://fonts.googleapis.com/css?family=Roboto:400,100,300,700)
    * [Normalize CSS](https://necolas.github.io/normalize.css/)
    * [Icomoon icon library](https://icomoon.io/)
    * [Jasmine](http://jasmine.github.io/)
    * [Jquery](https://jquery.com/)
    * [Handlebars](https://handlebarsjs.com/)
    * [Google JSAPI](http://google.com/jsapi)

## Project folder srtucure

    1. css/
        1. icomoon.css
        2. normalize.css
        3. style.css
    2. fonts/
        1. icomoon.eot
        2. icomoon.svg
        3. icomoon.ttf
        4. icomoon.woff
    3. jasmine/
        1. spec/
            1.feedreader.js
    4. js/
        1. app.js
    5. index.html
    6. README.md

## How to Run

1. Get the applicationn up and running by opening up `index.html` in the project folder within your favorite browser
    * At the bottom of the page you will see the Jasmine Portion detailing the test suites and their subsequent specs.

2. Explore the Jasmine spec file in `feedreader.js`
    * This is the file which contains the tests
    * Code comments are here as well to explain what is going on
    * Review the [Jasmine documentation](http://jasmine.github.io) if needed

## Test Suites and their Specs(tests)

    1. `"RSS Feeds"` test suite
        - This is the first test.
            * Spec1: It tests to make sure that the `allFeeds` variable has been defined and that it is not empty.
            * Spec2: It also loops through each feed in the `allFeeds` object and ensures it has a URL defined _and_ that the URL is not empty.
            * Spec3: It also loops through each feed in the `allFeeds` object and ensures it has a name defined and that the name is not empty

    2. `"The menu"` test suite
        - This the second suite is all about the named the side menu
            * Spec1: test ensures the menu element is hidden by default
            * Spec2: test ensures the menu changes visibility when the menu icon is clicked. 
                This test should have two expectations: does the menu display itself when clicked, and does it hide when clicked again?

    3. `"Initial Entries"` test suite
        - This the third suite is all about the named the side `loadFeed()` function
            * Spec1: test ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container
            __Since `loadFeed()` function is asynchronous, Jasmine's `beforeEach()`function is used to simulatethis with the help of the `done()` function__

    4. `"New Feed Selection"` test suite
        - This the fourth suite is all about the named the side menu
            * Spec1: test ensures when a new feed is loaded by the `loadFeed` function that the content actually changes
