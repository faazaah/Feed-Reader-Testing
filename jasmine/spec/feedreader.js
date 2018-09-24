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
        /* This test makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('url is defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name is defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });

    /* New test suite named "The menu" */
    describe('The menu', function() {
        /* This test ensures that the menu element is
         * hidden by default.
         */
        it('element hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked. It has
          * two expectations: menu is displayed when
          * clicked and hides when clicked again.
          */
        it('changes visibility on click', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* New test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * The loadFeed() is asynchronous so this test
         * uses Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0, function() {
                done();
            });
        });

        it('entry present when loadFeed function is called', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
    });

    /* New test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function, the content actually changes.
         * loadFeed() is asynchronous.
         */
        let feed = document.querySelector('.feed');
        let text;
        beforeEach(function(done) {
            loadFeed(0, function() {
                text = feed.innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('content changes when new feed is loaded by loadFeed function', function(done) {
            const newText = feed.innerHTML;
            expect(text !== newText).toBe(true);
            done();
        });
    });
}());
