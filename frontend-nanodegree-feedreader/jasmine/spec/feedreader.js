/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        /* This spec(test) loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has each feed in the allFeeds object with a URL defined and that the URL is not empty', function() {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);                
            });
        });


        /* This spec(test) loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has each feed in the allFeeds object with a name defined and that the name is not empty', function() {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);                
            });
        });
    });


    /* This is our second test named "The menu". It contains
    * a related set of tests. This suite is all about the named the side menu
    */
    describe("The menu", function() {
        let body = document.body;
        
        // This spec(test)  ensures the menu element is hidden by default. 
        it("is hidden by default", function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         /* This spec(test) ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: first, the menu display when
          * clicked and then hides when clicked again.
          */
         it("changes visibility when the menu icon is clicked", function( ) {            
            let menubar  = document.querySelector("a.menu-icon-link");
            menubar.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menubar.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* This is our third test named "Initial Entries". It contains
    * a related set of tests. This suite is all about the named 
    * initial loadfeed() function content
    */
    describe("Initial Entries", function() {

        //  This will be called before running the initial entries spec        
        beforeEach(function(done) {
            // the loadFeed function is called and completes its work
            loadFeed(1, done);
        });

        // Spec for getting the number of .entry elements within the .feed container.
        it("When the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container", function( ) {
            let container = document.querySelector("div.feed");
            
            /*The spec checks that at least there a single 
            *.entry element within the .feed container.
            */ 
            expect(container.getElementsByClassName("entry").length).toBeGreaterThanOrEqual(1);
        });
    });


    /* This is our fourth test named "New Feed Selection". 
    * This suite is all about the named the new loadfeed() function
    * content that is loaded when a link in the menu is clicked
    */
    describe("New Feed Selection", function() {
        
        // declared two local variables to compare
        let titleFeed1, titleFeed2;

        //  This will be called before running the new feed spec
        beforeEach(function(done) {
                // calling the localfeed() function the first time
                loadFeed( allFeeds[0].id, function() {
                    /* Since the header title changes on each feed load,
                    * I decided to assign it in each load feed instance
                    * to the local variables declared
                    */ 
                    titleFeed1 = document.querySelector("h1.header-title").innerHTML;
                    // calling the localfeed() function the second time                    
                    loadFeed( allFeeds[1].id , function () {
                        // storing the header title for the second instance of loadfeed()
                        titleFeed2 = document.querySelector("h1.header-title").innerHTML;                    
                        // Ending the async function
                        done();
                 });
                });
        });

        // Spec for comparing titles for each different loadfeed() call
        it("When a new feed is loaded by the loadFeed function that the content actually changes", function( ) {
            expect(titleFeed1).not.toEqual(titleFeed2);
        });
    });    
}());
