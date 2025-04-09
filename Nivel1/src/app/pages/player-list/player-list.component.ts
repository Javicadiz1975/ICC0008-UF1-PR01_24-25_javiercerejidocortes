import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {
  constructor(private router: Router) {}

  players = [
    {
      id: 1,
      nombre: 'LeBron',
      apellidos: 'James',
      altura: '2.06 m',
      peso: '113 kg',
      equipo: 'Lakers'
    },
    {
      id: 2,
      nombre: 'Stephen',
      apellidos: 'Curry',
      altura: '1.88 m',
      peso: '84 kg',
      equipo: 'Warriors'
    }
  ];

  verDetalle(player: any) {
    console.log('[PLAYER LIST] Ver detalle de jugador:', player);
    this.router.navigate(['/player-detail', player.id]);
  }

  // ✅ Método de cámara 
  onCamera() {
    console.log('[PLAYER LIST] 📸 Botón de cámara de la página pulsado');
    alert('Simulación de abrir la cámara desde la página');
  }

  onShare(player: any) {
    console.log('[PLAYER LIST] 📤 Compartir jugador:', player.nombre);
    alert(`Compartiendo a ${player.nombre}`);
  }
}

