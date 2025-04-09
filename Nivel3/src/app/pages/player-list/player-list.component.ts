import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  players: any[] = [];

  constructor(private router: Router, private playerService: PlayerService) {}

  ngOnInit() {
    this.playerService.getPlayers().subscribe({
      next: (data) => {
        console.log('[API] Jugadores obtenidos:', data);
        this.players = data;
      },
      error: (error) => {
        console.error('[API] Error al obtener jugadores:', error);
      }
    });
  }

  verDetalle(player: any) {
    console.log('[PLAYER LIST] Ver detalle de jugador:', player);
    this.router.navigate(['/player-detail', player.id]);
  }

  onCamera() {
    console.log('[PLAYER LIST] Botón de cámara de la página pulsado');
    alert('Simulación de abrir la cámara desde la página se implementa en nivel 4');
  }

  onShare(player: any) {
    console.log('[PLAYER LIST] Compartir jugador:', player.first_name);
    alert(`Compartiendo a ${player.first_name} ${player.last_name} funcionalidad en nivel 4`);
  }
}

