/** @ngInject */
export function routerConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
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
