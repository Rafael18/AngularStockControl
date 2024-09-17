import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  public productsDataEmitter$ =
   new BehaviorSubject<Array<GetAllProductsResponse> | null>(null);

   public productsDatas: Array<GetAllProductsResponse> = [];

   setProductsData(products: Array<GetAllProductsResponse>): void{
    if(products){
      this.productsDataEmitter$.next(products);
      this.getProductsData();
    }
   }

  getProductsData() {
    this.productsDataEmitter$.pipe(
      take(1),
      map((product) => product?.filter((data) => data.amount > 0))
    )
      .subscribe({
        next: (response) =>{
          if(response){
            this.productsDatas = response
          }
        }
      });

    return this.productsDatas
  }
}
