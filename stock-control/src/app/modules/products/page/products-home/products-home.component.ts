import { MessageService } from 'primeng/api';
import { ProductsService } from 'src/app/services/products/products.service';
import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';
import { Router } from '@angular/router';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { EventAction } from 'src/app/models/interfaces/event/EventAction';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: []
})
export class ProductsHomeComponent {
  private readonly destroy$: Subject<void> = new Subject();
  public productsDatas: Array<GetAllProductsResponse> = [];

  constructor(
    private ProductsService: ProductsService,
    private productDtService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService
  ){}

  ngOnInit():void {
    this.getServiceProductsDatas();
  }
  getServiceProductsDatas() {
    const productsLoaded = this.productDtService.getProductsDatas();

    if (productsLoaded.length > 0){
      this.productsDatas = productsLoaded;
    }else{
      this.getAPIPorductsDatas();
    }
  }

  getAPIPorductsDatas() {
    this.ProductsService.getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (response.length > 0){
          this.productsDatas = response;
        }
      },
      error:(err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar Produtos',
          life: 2500
        });
        this.router.navigate(['/dashboard']);
      }
    })
  }

  handleProductAction(event: EventAction): void {
    if (event){
      console.log('DADOS DO EVENTO RECEBIDO',event);
    }
  }

  ngDestroy():void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
