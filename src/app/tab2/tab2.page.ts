import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonItem, IonInput, IonText, IonIcon 
} from '@ionic/angular';
import { DatosService, DatosCompra } from '../services/datos';
import { addIcons } from 'ionicons';
import { checkmarkCircle, alertCircle, checkmarkDoneCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    IonItem, IonInput, IonText, IonIcon
  ]
})
export class Tab2Page implements OnInit {
  datosCompra: DatosCompra = { nombre: '', cantidad: 0, precioUnitario: 0, subtotal: 0 };
  
  descuento: number = 0;
  dineroRecibido: number = 0;
  
  totalFinal: number = 0;
  cambio: number = 0;
  saldoPendiente: number = 0;
  mensajeError: string = '';
  estadoTexto: string = '';

  constructor(private datosService: DatosService) {
    addIcons({ checkmarkCircle, alertCircle, checkmarkDoneCircle });
  }

  ngOnInit() {
    this.datosService.currentCompra.subscribe(compra => {
      this.datosCompra = compra;
      this.calcularTotales();
    });
  }

  calcularTotales() {
    if (this.descuento < 0 || this.descuento > 100) {
      this.mensajeError = 'El descuento debe estar entre 0 y 100.';
      return;
    }
    if (this.dineroRecibido < 0) {
      this.mensajeError = 'El dinero recibido debe ser mayor o igual a cero.';
      return;
    }

    this.mensajeError = '';

    const montoDescuento = (this.datosCompra.subtotal * this.descuento) / 100;
    this.totalFinal = Math.max(0, this.datosCompra.subtotal - montoDescuento);

    if (this.dineroRecibido >= this.totalFinal) {
      this.cambio = this.dineroRecibido - this.totalFinal;
      this.saldoPendiente = 0;
      if (this.cambio > 0) {
        this.estadoTexto = `Cambio a devolver: $${this.cambio.toFixed(2)}`;
      } else {
        this.estadoTexto = '¡Pago exacto realizado!';
      }
    } else {
      this.cambio = 0;
      this.saldoPendiente = this.totalFinal - this.dineroRecibido;
      this.estadoTexto = `Saldo pendiente: $${this.saldoPendiente.toFixed(2)}`;
    }
  }
}