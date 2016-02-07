import { ListingService } from './listing.service'
import { Listing } from "./listing.service";

describe('Listing service', () => {
  var $httpBackend;
  beforeEach(angular.mock.module('whatsfreshFrontend'));

  it('get all', (done) => { inject((listingService: ListingService, $httpBackend: angular.IHttpBackendService, $rootScope: angular.IRootScopeService) => {

    var listPayload =

    {
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

    $httpBackend.expectGET("http://localhost:8080/listings?page=0&size=9").respond({
      "_embedded": {
        "listings": [listPayload]
      }
    });
    var listingList = listingService.getAll();
    console.log("Before flush" + JSON.stringify(listingList))
    $httpBackend.flush();
    console.log("After flush" + listingList)
    console.log("After digest:" + listingList)
    listingList.then((result) => {
      expect(result[0].department).toEqual(listPayload.department)
      done();
    })
    $rootScope.$digest();
    })
  });


  it('get one', inject((listingService: ListingService, $httpBackend: angular.IHttpBackendService) => {


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
      }

      $httpBackend.expectGET("http://localhost:8080/listings/56abf0ba0025e70001e50bbd").respond(listPayload);

    var listing : Listing = listingService.getOne("56abf0ba0025e70001e50bbd")

    $httpBackend.flush()
    expect(listing.name).toEqual(listPayload.name);
  }));

})
