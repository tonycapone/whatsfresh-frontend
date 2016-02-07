var ListingService = (function () {
    /** @ngInject */
    function ListingService($resource, $q) {
        this.$resource = $resource;
        this.resource = $resource("http://localhost:8080/listings/:id", { id: "@id" });
        this.$q = $q;
    }
    ListingService.prototype.getAll = function () {
        var deferred = this.$q.defer();
        var listingArray = this.resource.get({}, function () {
            console.log("Listing array response: " + listingArray._embedded.listings);
            listingArray = listingArray._embedded.listings;
            deferred.resolve(listingArray);
        });
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
