
import IResourceClass = angular.resource.IResourceClass;
import IResource = angular.resource.IResource;

export interface ListingResource extends IResourceClass<Listing> {
    findByStore(params: Object, success: Function, error?: Function): Listings;
}

export interface Listings {
  listings: Listing[];

  page: {
    size: number;
    totalPages: number;
    totalElements: number;
    number: number;
  }
}
export interface Listing extends IResource{

  id: string ;
  name: string;
  imgLink: string;
  picData: string;
  dateScraped: string;
  store: string;
  department: string;
  unit: string;
  price: string;
}
