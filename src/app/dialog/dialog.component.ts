import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;
  actionButton: string = 'save';
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
    if (this.editData) {
      this.actionButton = 'update';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct() {
    console.log(this.editData, 'this.editData');
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('product added successfully.');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error while adding the product');
          },
        });
      }
    } else {
      console.log('i am called');

      this.updateProduct();
    }
  }

  updateProduct() {
    // console.log("ffff",this.editData.id);

    // this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
    //   next: (res) => {
    //     alert('product updated successfully');
    //     this.productForm.reset();
    //     this.dialogRef.close('update');
    //   },
    //   error: () => {
    //     alert('error while updating the record');
    //   }
    // });

    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('product updated successfully.');
        this.productForm.reset();
        this.dialogRef.close('update');
        console.log('log 1', this.editData.id);
      },
      error: () => {
        alert('Error while updating the product');
      },
    });
  }
}
