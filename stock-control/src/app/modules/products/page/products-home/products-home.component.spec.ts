import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsHomeComponent } from './products-home.component';

describe('ProductsHomeComponent', () => {
  let component: ProductsHomeComponent;
  let fixture: ComponentFixture<ProductsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
