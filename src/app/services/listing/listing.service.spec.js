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
            $httpBackend.expectGET("http://localhost:8080/listings").respond({
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
