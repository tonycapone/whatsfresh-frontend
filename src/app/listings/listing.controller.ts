import { WebDevTecService, ITecThing } from '../services/webDevTec/webDevTec.service';
import {ListingService} from "../services/listing/listing.service";
import {Listing} from "../services/listing/listing.service";
import {Listings} from "../services/listing/listing.service";
import IStateParamsService = angular.ui.IStateParamsService;

export class MainController {
  public awesomeThings: ITecThing[];
  public webDevTec: WebDevTecService;
  public classAnimation: string;
  public creationDate: number;
  public toastr: any;
  public listingService: ListingService;
  public listings: Listing[];
  public pageNumber: number;
  public totalPages: number;
  public totalElements: number;
  public maxSize: number;
  public itemsPerPage: number;
  public stateParams: IStateParamsService;

  /** @ngInject */
  constructor ($timeout: angular.ITimeoutService, webDevTec: WebDevTecService, toastr: any, listingService: ListingService,
    $stateParams: IStateParamsService) {
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
  activate($timeout: angular.ITimeoutService) {
    this.getListings();
    var self = this;

    $timeout(function() {
      self.classAnimation = 'rubberBand';
    }, 4000);
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }

  getListings() {
     this.listingService.getPage(this.pageNumber - 1, this.itemsPerPage).then((result: Listings)=>{
       this.listings = result.listings;
       this.totalPages = result.page.totalPages;
       this.maxSize = result.page.size;
       this.totalElements = result.page.totalElements
       console.log("page number:"+ this.pageNumber)
     });
  }
}
