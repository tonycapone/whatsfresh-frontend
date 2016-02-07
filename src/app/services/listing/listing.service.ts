
import IResourceClass = angular.resource.IResourceClass;
import IPromise = angular.IPromise;
import IDeferred = angular.IDeferred;
import {Listings} from "../../listings/listing";
import {Listing} from "../../listings/listing";
import {ListingResource} from "../../listings/listing";
import IActionDescriptor = angular.resource.IActionDescriptor;

/**
 * Created by ahowell on 2/1/16.
 */



function getListingsFromResponse(deferred: IDeferred): any {
  var deferred = deferred;
  return (response) => {

    var pageListings:Listings = new Listings();
    pageListings.listings = response._embedded.listings;
    console.log(response.page)
    pageListings.page = response.page;

    deferred.resolve(pageListings)

  }
}
export class ListingService {
  private good : boolean;
  private resource : ListingResource;
  private $q : angular.IQService;

  /** @ngInject */
  constructor(private $resource : angular.resource.IResourceService, $q : angular.IQService) {
    var findByStoreName : IActionDescriptor = {
      method: 'GET',
      isArray: true,
      url: 'http://localhost:8080/listings/search/findByStore?store=:store'
    }
    this.resource = <ListingResource>$resource("http://localhost:8080/listings/:id", {id: "@id"}, {
      findByStoreName: findByStoreName
    });
    this.$q = $q;
  }


  getPage(page: number, size: number, store?: string): IPromise<Listings>{
    var deferred = this.$q.defer();
    if(angular.isUndefined){
       this.resource.get({page: page, size: size}, getListingsFromResponse(deferred))
    } else {
      this.resource.findByStore(store, getListingsFromResponse(deferred))
    }
    return deferred.promise;

  };
  getAll (): IPromise<Listings>{
      var deferred = this.$q.defer()
      this.resource.get({}, getListingsFromResponse(deferred))

      return deferred.promise;
  }

  getOne (id: string): Listing {
    var listing = <Listing>this.resource.get({id: id}, (response) => {
      listing = response;
    });

    return listing
  }

}
