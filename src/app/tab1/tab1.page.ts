import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonItem, IonInput, IonButton, IonIcon, IonText 
} from '@ionic/angular';
import { DatosService } from '../services/datos';
import { addIcons } from 'ionicons';
import { cart, arrowForward } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonIcon, IonText
  ]
})
export class Tab1Page {
  nombre: string = '';
  cantidad: number = 1;
  precioUnitario: number = 0;
  mensajeError: string = '';

  constructor(
    private datosService: DatosService,
    private router: Router
  ) {
    addIcons({ cart, arrowForward });
  }

  onSubmit() {
    if (!this.nombre || this.nombre.trim() === '') {
      this.mensajeError = 'El nombre del producto es obligatorio.';
      return;
    }
    if (!this.cantidad || this.cantidad <= 0 || !Number.isInteger(Number(this.cantidad))) {
      this.mensajeError = 'La cantidad debe ser un número entero mayor a cero.';
      return;
    }
    if (!this.precioUnitario || this.precioUnitario <= 0) {
      this.mensajeError = 'El precio unitario debe ser mayor a cero.';
      return;
    }

    this.mensajeError = '';
    this.datosService.actualizarCompra(this.nombre, Number(this.cantidad), Number(this.precioUnitario));
    this.router.navigateByUrl('/tabs/tab2');
  }
}