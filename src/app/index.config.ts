/** @ngInject */
export function config($logProvider: angular.ILogProvider, toastrConfig: any, $httpProvider : angular.IHttpProvider) {
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
