import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {};
  categories: Category[] = [];

  formCreateProduct: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    category: new FormControl(''),
  });

  constructor(private productService: ProductService,
              private router: Router,
              private categoryService: CategoryService) {
  }


  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAllCategoryService().subscribe((categoryFormBE) => {
      this.categories = categoryFormBE.content;
    });
  }

  createProduct() {
    const formData = new FormData() ;
    formData.append('name', this.formCreateProduct.get('name').value);
    formData.append('price', this.formCreateProduct.get('price').value);
    formData.append('quantity', this.formCreateProduct.get('quantity').value);
    formData.append('description', this.formCreateProduct.get('description').value);
    // formData.append('image', this.formCreateProduct.get('image').value);
    const files = (document.getElementById('image') as HTMLInputElement).files;
    if (files.length > 0) {
      formData.append('image', files[0]);
    }
    formData.append('category', this.formCreateProduct.get('category').value);
    this.productService.createProduct(formData).subscribe(() => {
      alert('tao thanh cong');
      this.formCreateProduct.reset();
    }, error => {
      alert('tb');
    });
  }

}
