import { ConfirmationService, MessageService } from 'primeng/api';
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
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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

  handleDeleteProductAction(event: {
    product_id: string,
    productName: string
  }) :void {
    this.confirmationService.confirm({
      message: `Conforma a exclusão do produto: ${event.productName}?`,
      header:'Confirmação de exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.deleteProduct(event?.product_id)
    });
  }
  deleteProduct(product_id: string) {
    if(product_id){
      this.ProductsService
        .deleteProduct(product_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if(response){
              this.messageService.add({
                severity: 'success',
                summary:'Sucesso',
                detail: 'Produto removido com sucesso',
                life: 2500
              });

              this.getAPIPorductsDatas();
            }
          },
          error: (err) => {
            console.log(err);

            this.messageService.add({
              severity: 'error',
              summary:'Erro',
              detail: 'Erro ao remover o produto!',
              life: 2500
            });
          }
        })
    }
  }

  ngDestroy():void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
