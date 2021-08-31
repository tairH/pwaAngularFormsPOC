import { Injectable } from '@angular/core';
import { Medicine } from '../models/medicine';
import { UUID } from 'angular2-uuid';
import { OnlineOfflineService } from './online-offline.service';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  
  private medicines: Medicine[] = [];
  private db: any;

  constructor(private readonly onlineOfflineService: OnlineOfflineService) {
    this.registerToEvents(onlineOfflineService);

    this.createDatabase();
  }

  addMedicine(medicine: Medicine) {
    medicine.id = UUID.UUID();
    medicine.FDAApprove = false;
    this.medicines.push(medicine);
    console.log(this.medicines);

    if (!this.onlineOfflineService.isOnline) {
      this.addToIndexedDb(medicine);
    }
  }


  getAllMedicines(): Medicine[] {
    return this.medicines;
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        console.log('went online');
        console.log('sending all stored items');

        this.sendItemsFromIndexedDb();
      } else {
        console.log('went offline, storing in indexdb');
      }
    });
  }
  
  private createDatabase() {
    this.db = new Dexie('MyTestDatabase');
    this.db.version(1).stores({
      medicines: 'id,value,done'
    });
  }

  private addToIndexedDb(medicine: Medicine) {
    this.db.medicines
      .add(medicine)
      .then(async () => {
        const allItems: Medicine[] = await this.db.medicines.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch((e: { stack: any; }) => {
        alert('Error: ' + (e.stack || e));
      });
  }
  
  private async sendItemsFromIndexedDb() {
    const allItems: Medicine[] = await this.db.medicines.toArray();
  
    allItems.forEach((item: Medicine) => {
      // send items to backend...
      this.db.medicines.delete(item.id).then(() => {
        console.log(`item ${item.id} sent and deleted locally`);
      });
    });
  }
}
