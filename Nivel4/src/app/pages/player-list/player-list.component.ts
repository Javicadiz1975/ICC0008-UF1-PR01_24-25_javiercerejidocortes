import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { CameraService } from 'src/app/services/camera.service';
import { Share } from '@capacitor/share';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  players: any[] = [];
  imagenBase64: string | null = null;

  constructor(private router: Router, private playerService: PlayerService, private cameraService: CameraService,  private actionSheetCtrl: ActionSheetController) {}

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

  async onCamera() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: '📷 Tomar foto',
          handler: () => {
            setTimeout(async () => {
              const img = await this.cameraService.tomarFoto();
              this.setImagen(img);
            }, 300); // Espera unos milisegundos para que cierre el sheet
          }
        },
        {
          text: '🖼 Galería',
          handler: () => {
            setTimeout(async () => {
              const img = await this.cameraService.seleccionarDesdeGaleria();
              this.setImagen(img);
            }, 300);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
  
    await actionSheet.present();
  }
  
  
  
  setImagen(imagen: string | null) {
    if (imagen) {
      this.imagenBase64 = imagen;
      console.log('[PLAYER LIST] Imagen cargada correctamente');
    } else {
      console.warn('[PLAYER LIST] Acción cancelada o sin resultado');
    }
  }

  async onShare(player: any) {
    console.log('[PLAYER LIST] Compartir jugador:', player.first_name);

    await Share.share({
      title: 'Compartir jugador',
      text: `Jugador: ${player.first_name} ${player.last_name}`,
      dialogTitle: 'Compartir con...'
    });
  }
}

