import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnInit {
  private destroy$ = new Subject<void>();
  public productsList: Array<GetAllProductsResponse> = [];

  public productChartData!: ChartData;
  public productChartOptions!: ChartOptions;

  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    private productDtService: ProductsDataTransferService
  ){}

  ngOnInit(): void {
    this.getProductsDatas();
  }

  getProductsDatas(): void {
    this.productService.getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (response.length > 0){
          this.productsList = response;
          this.productDtService.setProductsData(this.productsList);
          this.setProductsChartConfig();
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary:'Erro',
          detail: 'Erro ao buscar produtos.',
          life: 2500,
        });
      }
    });
  }

  setProductsChartConfig(): void {
    if (this.productsList.length > 0) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorsecundary = documentStyle.getPropertyValue('--text-color-secundary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.productChartData = {
        labels: this.productsList.map((element) => element?.name),
        datasets: [
          {
            label: 'Quantidade',
            backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
            borderColor: documentStyle.getPropertyValue('--indigo-400'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
            data: this.productsList.map((element) => element?.amount)
          }
        ]
      };

      this.productChartOptions = {
        maintainAspectRatio: false,
        aspectRatio:0.8,
        plugins:{
          legend:{
            labels:{
              color: textColor
            }
          }
        },

        scales:{
          x: {
            ticks:{
              color: textColorsecundary,
              font:{
                weight: '500'
              }
            },
            grid:{
              color: surfaceBorder
            }
          },

          y:{
            ticks:{
              color: textColorsecundary
            },
            grid:{
              color: surfaceBorder
            }
          }
        }
      };
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
