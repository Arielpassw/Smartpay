import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DatosCompra {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private compraSource = new BehaviorSubject<DatosCompra>({
    nombre: '',
    cantidad: 0,
    precioUnitario: 0,
    subtotal: 0
  });

  currentCompra = this.compraSource.asObservable();

  constructor() { }

  actualizarCompra(nombre: string, cantidad: number, precioUnitario: number) {
    const subtotal = cantidad * precioUnitario;
    this.compraSource.next({ nombre, cantidad, precioUnitario, subtotal });
  }
}