import { ProductEvent } from './../../../../models/enums/products/ProductEvent';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventAction } from 'src/app/models/interfaces/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: []
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProductsResponse> = [];
  @Output() productEvent = new EventEmitter<EventAction>();

  public productsSelected!: GetAllProductsResponse;
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;


  handleProductEvent(action: string, id?: string):void {
    if (action && action !==''){
      const productEventData = id && id !== '' ? { action, id} : {action};
      //EMITIR O VALOR DO EVENTO

      this.productEvent.emit(productEventData);
   }
  }

}
