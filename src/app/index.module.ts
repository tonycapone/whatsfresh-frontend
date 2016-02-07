 //<reference path="../../.tmp/typings/tsd.d.ts" />


import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './listings/listing.controller.ts';
import { GithubContributor } from '../app/services/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/services/webDevTec/webDevTec.service';
 import { ListingService } from '../app/services/listing/listing.service';
import { acmeNavbar } from '../app/services/navbar/navbar.directive';
import { acmeMalarkey } from '../app/services/malarkey/malarkey.directive';

declare var malarkey: any;
declare var moment: moment.MomentStatic;

module whatsfreshFrontend {
  'use strict';

  angular.module('whatsfreshFrontend', ['ngSanitize', 'ngResource','restangular', 'ui.router', 'ui.bootstrap', 'toastr'])
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('githubContributor', GithubContributor)
    .service('webDevTec', WebDevTecService)
    .service('listingService', ListingService)
    .controller('MainController', MainController)
    .directive('acmeNavbar', acmeNavbar)
    .directive('acmeMalarkey', acmeMalarkey);
}
