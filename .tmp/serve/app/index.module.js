/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	module.exports = __webpack_require__(16);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//<reference path="../../.tmp/typings/tsd.d.ts" />
	var index_config_1 = __webpack_require__(2);
	var index_route_1 = __webpack_require__(3);
	var index_run_1 = __webpack_require__(4);
	var listing_controller_ts_1 = __webpack_require__(5);
	var githubContributor_service_1 = __webpack_require__(6);
	var webDevTec_service_1 = __webpack_require__(7);
	var listing_service_1 = __webpack_require__(8);
	var navbar_directive_1 = __webpack_require__(9);
	var malarkey_directive_1 = __webpack_require__(10);
	var whatsfreshFrontend;
	(function (whatsfreshFrontend) {
	    'use strict';
	    angular.module('whatsfreshFrontend', ['ngSanitize', 'ngResource', 'restangular', 'ui.router', 'ui.bootstrap', 'toastr'])
	        .constant('malarkey', malarkey)
	        .constant('moment', moment)
	        .config(index_config_1.config)
	        .config(index_route_1.routerConfig)
	        .run(index_run_1.runBlock)
	        .service('githubContributor', githubContributor_service_1.GithubContributor)
	        .service('webDevTec', webDevTec_service_1.WebDevTecService)
	        .service('listingService', listing_service_1.ListingService)
	        .controller('MainController', listing_controller_ts_1.MainController)
	        .directive('acmeNavbar', navbar_directive_1.acmeNavbar)
	        .directive('acmeMalarkey', malarkey_directive_1.acmeMalarkey);
	})(whatsfreshFrontend || (whatsfreshFrontend = {}));
	//# sourceMappingURL=index.module.js.map

/***/ },
/* 2 */
/***/ function(module, exports) {

	/** @ngInject */
	config.$inject = ["$logProvider", "toastrConfig", "$httpProvider"];
	function config($logProvider, toastrConfig, $httpProvider) {
	    // enable log
	    $logProvider.debugEnabled(true);
	    // set options third-party lib
	    toastrConfig.allowHtml = true;
	    toastrConfig.timeOut = 3000;
	    toastrConfig.positionClass = 'toast-top-right';
	    toastrConfig.preventDuplicates = true;
	    toastrConfig.progressBar = true;
	    delete $httpProvider.defaults.headers.common["X-Requested-With"];
	    $httpProvider.defaults.headers.common["Accept"] = "application/json";
	    $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost";
	    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
	}
	exports.config = config;
	//# sourceMappingURL=index.config.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	/** @ngInject */
	routerConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
	function routerConfig($stateProvider, $urlRouterProvider) {
	    $stateProvider
	        .state('home', {
	        url: '/stores/:store',
	        templateUrl: 'app/listings/listings.html',
	    })
	        .state('about', {
	        url: '/about',
	        templateUrl: 'app/about.html',
	    });
	    $urlRouterProvider.otherwise('/');
	}
	exports.routerConfig = routerConfig;
	//# sourceMappingURL=index.route.js.map

/***/ },
/* 4 */
/***/ function(module, exports) {

	/** @ngInject */
	runBlock.$inject = ["$log"];
	function runBlock($log) {
	    $log.debug('runBlock end');
	}
	exports.runBlock = runBlock;
	//# sourceMappingURL=index.run.js.map

/***/ },
/* 5 */
/***/ function(module, exports) {

	var MainController = (function () {
	    /** @ngInject */
	    MainController.$inject = ["$timeout", "webDevTec", "toastr", "listingService", "$stateParams"];
	    function MainController($timeout, webDevTec, toastr, listingService, $stateParams) {
	        this.stateParams = $stateParams;
	        this.awesomeThings = new Array();
	        this.webDevTec = webDevTec;
	        this.classAnimation = '';
	        this.creationDate = 1454119452100;
	        this.toastr = toastr;
	        this.listingService = listingService;
	        this.pageNumber = 1;
	        this.itemsPerPage = 9;
	        this.activate($timeout);
	    }
	    /** @ngInject */
	    MainController.prototype.activate = function ($timeout) {
	        this.getListings();
	        var self = this;
	        $timeout(function () {
	            self.classAnimation = 'rubberBand';
	        }, 4000);
	    };
	    MainController.prototype.activate.$inject = ["$timeout"];
	    MainController.prototype.showToastr = function () {
	        this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
	        this.classAnimation = '';
	    };
	    MainController.prototype.getListings = function () {
	        var _this = this;
	        this.listingService.getPage(this.pageNumber - 1, this.itemsPerPage).then(function (result) {
	            _this.listings = result.listings;
	            _this.totalPages = result.page.totalPages;
	            _this.maxSize = result.page.size;
	            _this.totalElements = result.page.totalElements;
	            console.log("page number:" + _this.pageNumber);
	        });
	    };
	    return MainController;
	})();
	exports.MainController = MainController;
	//# sourceMappingURL=listing.controller.js.map

/***/ },
/* 6 */
/***/ function(module, exports) {

	var GithubContributor = (function () {
	    /** @ngInject */
	    GithubContributor.$inject = ["$log", "$http"];
	    function GithubContributor($log, $http) {
	        this.$log = $log;
	        this.$http = $http;
	        this.apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';
	    }
	    GithubContributor.prototype.getContributors = function (limit) {
	        var _this = this;
	        if (limit === void 0) { limit = 30; }
	        return this.$http.get(this.apiHost + '/contributors?per_page=' + limit)
	            .then(function (response) {
	            return response.data;
	        })
	            .catch(function (error) {
	            _this.$log.error('XHR Failed for getContributors.\n', error.data);
	        });
	    };
	    return GithubContributor;
	})();
	exports.GithubContributor = GithubContributor;
	//# sourceMappingURL=githubContributor.service.js.map

/***/ },
/* 7 */
/***/ function(module, exports) {

	var WebDevTecService = (function () {
	    /** @ngInject */
	    function WebDevTecService() {
	        var rawData = [
	            {
	                'title': 'AngularJS',
	                'url': 'https://angularjs.org/',
	                'description': 'HTML enhanced for web apps!',
	                'logo': 'angular.png'
	            },
	            {
	                'title': 'BrowserSync',
	                'url': 'http://browsersync.io/',
	                'description': 'Time-saving synchronised browser testing.',
	                'logo': 'browsersync.png'
	            },
	            {
	                'title': 'GulpJS',
	                'url': 'http://gulpjs.com/',
	                'description': 'The streaming build system.',
	                'logo': 'gulp.png'
	            },
	            {
	                'title': 'Jasmine',
	                'url': 'http://jasmine.github.io/',
	                'description': 'Behavior-Driven JavaScript.',
	                'logo': 'jasmine.png'
	            },
	            {
	                'title': 'Karma',
	                'url': 'http://karma-runner.github.io/',
	                'description': 'Spectacular Test Runner for JavaScript.',
	                'logo': 'karma.png'
	            },
	            {
	                'title': 'Protractor',
	                'url': 'https://github.com/angular/protractor',
	                'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
	                'logo': 'protractor.png'
	            },
	            {
	                'title': 'Bootstrap',
	                'url': 'http://getbootstrap.com/',
	                'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
	                'logo': 'bootstrap.png'
	            },
	            {
	                'title': 'Angular UI Bootstrap',
	                'url': 'http://angular-ui.github.io/bootstrap/',
	                'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
	                'logo': 'ui-bootstrap.png'
	            },
	            {
	                'title': 'Sass (Node)',
	                'url': 'https://github.com/sass/node-sass',
	                'description': 'Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.',
	                'logo': 'node-sass.png'
	            },
	            {
	                'title': 'TypeScript',
	                'url': 'http://www.typescriptlang.org/',
	                'description': 'TypeScript, a typed superset of JavaScript that compiles to plain JavaScript.',
	                'logo': 'typescript.png'
	            }
	        ];
	        this.data = rawData.map(function (awesomeThing) {
	            awesomeThing.rank = Math.random();
	            return awesomeThing;
	        });
	    }
	    Object.defineProperty(WebDevTecService.prototype, "tec", {
	        get: function () {
	            return this.data;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return WebDevTecService;
	})();
	exports.WebDevTecService = WebDevTecService;
	//# sourceMappingURL=webDevTec.service.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Created by ahowell on 2/1/16.
	 */
	function getListingsFromResponse(deferred) {
	    var deferred = deferred;
	    return function (response) {
	        var pageListings = new Listings();
	        pageListings.listings = response._embedded.listings;
	        console.log(response.page);
	        pageListings.page = response.page;
	        deferred.resolve(pageListings);
	    };
	}
	var ListingService = (function () {
	    /** @ngInject */
	    ListingService.$inject = ["$resource", "$q"];
	    function ListingService($resource, $q) {
	        this.$resource = $resource;
	        var findByStoreName = {
	            method: 'GET',
	            isArray: true,
	            url: 'http://localhost:8080/listings/search/findByStore?store=:store'
	        };
	        this.resource = $resource("http://localhost:8080/listings/:id", { id: "@id" }, {
	            findByStoreName: findByStoreName
	        });
	        this.$q = $q;
	    }
	    ListingService.prototype.getPage = function (page, size, store) {
	        var deferred = this.$q.defer();
	        if (angular.isUndefined) {
	            this.resource.get({ page: page, size: size }, getListingsFromResponse(deferred));
	        }
	        else {
	            this.resource.findByStore(store, getListingsFromResponse(deferred));
	        }
	        return deferred.promise;
	    };
	    ;
	    ListingService.prototype.getAll = function () {
	        var deferred = this.$q.defer();
	        this.resource.get({}, getListingsFromResponse(deferred));
	        return deferred.promise;
	    };
	    ListingService.prototype.getOne = function (id) {
	        var listing = this.resource.get({ id: id }, function (response) {
	            listing = response;
	        });
	        return listing;
	    };
	    return ListingService;
	})();
	exports.ListingService = ListingService;
	//# sourceMappingURL=listing.service.js.map

/***/ },
/* 9 */
/***/ function(module, exports) {

	/** @ngInject */
	function acmeNavbar() {
	    return {
	        restrict: 'E',
	        scope: {
	            creationDate: '='
	        },
	        templateUrl: 'app/services/navbar/navbar.html',
	        controller: NavbarController,
	        controllerAs: 'vm',
	        bindToController: true
	    };
	}
	exports.acmeNavbar = acmeNavbar;
	/** @ngInject */
	var NavbarController = (function () {
	    NavbarController.$inject = ["moment"];
	    function NavbarController(moment) {
	        this.relativeDate = moment(this.creationDate).fromNow();
	    }
	    return NavbarController;
	})();
	exports.NavbarController = NavbarController;
	//# sourceMappingURL=navbar.directive.js.map

/***/ },
/* 10 */
/***/ function(module, exports) {

	/** @ngInject */
	acmeMalarkey.$inject = ["malarkey"];
	function acmeMalarkey(malarkey) {
	    return {
	        restrict: 'E',
	        scope: {
	            extraValues: '='
	        },
	        template: '&nbsp;',
	        link: linkFunc,
	        controller: MalarkeyController,
	        controllerAs: 'vm'
	    };
	}
	exports.acmeMalarkey = acmeMalarkey;
	function linkFunc(scope, el, attr, vm) {
	    var watcher;
	    var typist = vm.malarkey(el[0], {
	        typeSpeed: 40,
	        deleteSpeed: 40,
	        pauseDelay: 800,
	        loop: true,
	        postfix: ' '
	    });
	    el.addClass('acme-malarkey');
	    angular.forEach(scope.extraValues, function (value) {
	        typist.type(value).pause().delete();
	    });
	    watcher = scope.$watch('vm.contributors', function (current, original) {
	        angular.forEach(vm.contributors, function (contributor) {
	            typist.type(contributor.login).pause().delete();
	        });
	    });
	    scope.$on('$destroy', function () {
	        watcher();
	    });
	}
	/** @ngInject */
	var MalarkeyController = (function () {
	    MalarkeyController.$inject = ["$log", "githubContributor", "malarkey"];
	    function MalarkeyController($log, githubContributor, malarkey) {
	        this.$log = $log;
	        this.githubContributor = githubContributor;
	        this.malarkey = malarkey;
	        this.contributors = [];
	        this.activate();
	    }
	    MalarkeyController.prototype.activate = function () {
	        var _this = this;
	        return this.getContributors()
	            .then(function () {
	            _this.$log.info('Activated Contributors View');
	        });
	    };
	    MalarkeyController.prototype.getContributors = function () {
	        var _this = this;
	        return this.githubContributor.getContributors(10)
	            .then(function (data) {
	            _this.contributors = data;
	            return _this.contributors;
	        });
	    };
	    return MalarkeyController;
	})();
	exports.MalarkeyController = MalarkeyController;
	//# sourceMappingURL=malarkey.directive.js.map

/***/ },
/* 11 */
/***/ function(module, exports) {

	describe('controllers', function () {
	    var mainController;
	    beforeEach(angular.mock.module('whatsfreshFrontend'));
	    beforeEach(inject(function ($controller, webDevTec, toastr) {
	        webDevTec.data = [null, null, null, null, null];
	        spyOn(toastr, 'info').and.callThrough();
	        mainController = $controller('MainController');
	    }));
	    it('should have a timestamp creation date', function () {
	        expect(mainController.creationDate > 0).toBeTruthy();
	    });
	    it('should define animate class after delaying timeout ', inject(function ($timeout) {
	        $timeout.flush();
	        expect(mainController.classAnimation).toEqual('rubberBand');
	    }));
	    it('should show a Toastr info and stop animation when invoke showToastr()', inject(function (toastr) {
	        mainController.showToastr();
	        expect(toastr.info).toHaveBeenCalled();
	        expect(mainController.classAnimation).toEqual('');
	    }));
	    it('should define more than 5 awesome things', function () {
	        expect(mainController.awesomeThings.length === 5).toBeTruthy();
	    });
	});
	//# sourceMappingURL=listing.controller.spec.js.map

/***/ },
/* 12 */
/***/ function(module, exports) {

	describe('service githubContributor', function () {
	    beforeEach(angular.mock.module('whatsfreshFrontend'));
	    it('should be registered', inject(function (githubContributor) {
	        expect(githubContributor).not.toBeNull();
	    }));
	    describe('getContributors function', function () {
	        it('should return data', inject(function (githubContributor, $httpBackend) {
	            $httpBackend.when('GET', githubContributor.apiHost + '/contributors?per_page=1').respond(200, [{ pprt: 'value' }]);
	            var data;
	            githubContributor.getContributors(1).then(function (fetchedData) {
	                data = fetchedData;
	            });
	            $httpBackend.flush();
	            expect(data.length === 1).toBeTruthy();
	            expect(data[0]).not.toBeNull();
	        }));
	        it('should define a limit per page as default value', inject(function (githubContributor, $httpBackend) {
	            $httpBackend.when('GET', githubContributor.apiHost + '/contributors?per_page=30').respond(200, new Array(30));
	            var data;
	            githubContributor.getContributors().then(function (fetchedData) {
	                data = fetchedData;
	            });
	            $httpBackend.flush();
	            expect(data.length === 30).toBeTruthy();
	        }));
	        it('should log a error', inject(function (githubContributor, $httpBackend, $log) {
	            $httpBackend.when('GET', githubContributor.apiHost + '/contributors?per_page=1').respond(500);
	            githubContributor.getContributors(1);
	            $httpBackend.flush();
	            expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
	        }));
	    });
	});
	//# sourceMappingURL=githubContributor.service.spec.js.map

/***/ },
/* 13 */
/***/ function(module, exports) {

	describe('Listing service', function () {
	    var $httpBackend;
	    beforeEach(angular.mock.module('whatsfreshFrontend'));
	    it('get all', function (done) {
	        inject(function (listingService, $httpBackend, $rootScope) {
	            var listPayload = {
	                "name": "Sea Queen Flounder Fillets",
	                "imgLink": "akimages.shoplocal.com/dyn_li/200.0.88.0/Retailers/Aldi/160101HL_0607_HL2016_R_48705_SQN_FlounderFillets.jpg",
	                "picData": "",
	                "dateScraped": "Fri Jan 29 17:07:38 CST 2016",
	                "store": "Aldi",
	                "department": "Seafood",
	                "unit": "16 oz.",
	                "_links": {
	                    "self": {
	                        "href": "http://localhost:8080/listings/56abf0ba0025e70001e50bbd"
	                    },
	                    "listing": {
	                        "href": "http://localhost:8080/listings/56abf0ba0025e70001e50bbd"
	                    }
	                }
	            };
	            $httpBackend.expectGET("http://localhost:8080/listings?page=0&size=20").respond({
	                "_embedded": {
	                    "listings": [listPayload]
	                }
	            });
	            var listingList = listingService.getAll();
	            console.log("Before flush" + JSON.stringify(listingList));
	            $httpBackend.flush();
	            console.log("After flush" + listingList);
	            console.log("After digest:" + listingList);
	            listingList.then(function (result) {
	                expect(result[0].department).toEqual(listPayload.department);
	                done();
	            });
	            $rootScope.$digest();
	        });
	    });
	    it('get one', inject(function (listingService, $httpBackend) {
	        var listPayload = {
	            "name": "Sea Queen Flounder Fillets",
	            "imgLink": "akimages.shoplocal.com/dyn_li/200.0.88.0/Retailers/Aldi/160101HL_0607_HL2016_R_48705_SQN_FlounderFillets.jpg",
	            "picData": "",
	            "dateScraped": "Fri Jan 29 17:07:38 CST 2016",
	            "store": "Aldi",
	            "department": "Seafood",
	            "unit": "16 oz.",
	            "_links": {
	                "self": {
	                    "href": "http://localhost:8080/listings/56abf0ba0025e70001e50bbd"
	                },
	                "listing": {
	                    "href": "http://localhost:8080/listings/56abf0ba0025e70001e50bbd"
	                }
	            }
	        };
	        $httpBackend.expectGET("http://localhost:8080/listings/56abf0ba0025e70001e50bbd").respond(listPayload);
	        var listing = listingService.getOne("56abf0ba0025e70001e50bbd");
	        $httpBackend.flush();
	        expect(listing.name).toEqual(listPayload.name);
	    }));
	});
	//# sourceMappingURL=listing.service.spec.js.map

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * @todo Complete the test
	 * This example is not perfect.
	 * The `link` function is not tested.
	 * (malarkey usage, addClass, $watch, $destroy)
	 */
	describe('directive malarkey', function () {
	    var element;
	    var malarkeyController;
	    beforeEach(angular.mock.module('whatsfreshFrontend'));
	    beforeEach(inject(function ($compile, $rootScope, githubContributor, $q) {
	        spyOn(githubContributor, 'getContributors').and.callFake(function () {
	            return $q.when([{}, {}, {}, {}, {}, {}]);
	        });
	        element = angular.element("\n      <acme-malarkey extra-values=\"['Poney', 'Monkey']\"></acme-malarkey>\n    ");
	        $compile(element)($rootScope.$new());
	        $rootScope.$digest();
	        malarkeyController = element.isolateScope().vm;
	    }));
	    it('should be compiled', function () {
	        expect(element.html()).not.toEqual(null);
	    });
	    it('should have isolate scope object with instanciate members', function () {
	        expect(malarkeyController).toEqual(jasmine.any(Object));
	        expect(malarkeyController.contributors.length).toEqual(6);
	    });
	    it('should log a info', inject(function ($log) {
	        expect($log.info.logs).toEqual(jasmine.stringMatching('Activated Contributors View'));
	    }));
	});
	//# sourceMappingURL=malarkey.directive.spec.js.map

/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * @todo Complete the test
	 * This example is not perfect.
	 * Test should check if MomentJS have been called
	 */
	describe('directive navbar', function () {
	    var element;
	    var navbarController;
	    var timeInMs;
	    beforeEach(angular.mock.module('whatsfreshFrontend'));
	    beforeEach(inject(function ($compile, $rootScope) {
	        var currentDate = new Date();
	        timeInMs = currentDate.setHours(currentDate.getHours() - 24);
	        element = angular.element("\n      <acme-navbar creation-date=\"" + timeInMs + "\"></acme-navbar>\n    ");
	        $compile(element)($rootScope.$new());
	        $rootScope.$digest();
	        navbarController = element.isolateScope().vm;
	    }));
	    it('should be compiled', function () {
	        expect(element.html()).not.toEqual(null);
	    });
	    it('should have isolate scope object with instanciate members', function () {
	        expect(navbarController).not.toBeNull();
	        expect(navbarController.creationDate).toEqual(timeInMs);
	        expect(navbarController.relativeDate).toEqual('a day ago');
	    });
	});
	//# sourceMappingURL=navbar.directive.spec.js.map

/***/ },
/* 16 */
/***/ function(module, exports) {

	describe('service webDevTec', function () {
	    beforeEach(angular.mock.module('whatsfreshFrontend'));
	    it('should be registered', inject(function (webDevTec) {
	        expect(webDevTec).not.toEqual(null);
	    }));
	    it('get tec should return array of object', inject(function (webDevTec) {
	        expect(webDevTec.tec.length > 5).toBeTruthy();
	        webDevTec.tec.forEach(function (tecThing) {
	            expect(tecThing).not.toBeNull();
	        });
	    }));
	});
	//# sourceMappingURL=webDevTec.service.spec.js.map

/***/ }
/******/ ]);