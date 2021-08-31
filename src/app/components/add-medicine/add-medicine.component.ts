import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {

  form!: FormGroup;
  
  constructor(private readonly medicineService: MedicineService) {
    this.form = new FormGroup({
      value: new FormControl('', Validators.required),
    });
   }

  ngOnInit(): void {
  }

  addMedicine() {
    this.medicineService.addMedicine(this.form.value);
    this.form.reset();
  }
}
