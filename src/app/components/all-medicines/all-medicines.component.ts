import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Medicine } from 'src/app/models/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { OnlineOfflineService } from 'src/app/services/online-offline.service';

@Component({
  selector: 'app-all-medicines',
  templateUrl: './all-medicines.component.html',
  styleUrls: ['./all-medicines.component.css']
})
export class AllMedicinesComponent implements OnInit {

  

  medicines: Medicine[] = [];

  constructor(
    private readonly medicineService: MedicineService,
    public readonly onlineOfflineService: OnlineOfflineService
  ) {
      // stuff
  }

  ngOnInit() {
    this.medicines = this.medicineService.getAllMedicines();
  }

  markAsApproved(medicine: Medicine) {
    medicine.FDAApprove=true;
  }
}
