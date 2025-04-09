import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class PlayerDetailComponent implements OnInit {
  player: any;
  private playerId!: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private playerService: PlayerService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.playerId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPlayer();
  }

  loadPlayer() {
    this.playerService.getPlayerById(this.playerId).subscribe(
      res => {
        this.player = res;
        this.checkIfFavorite();
        console.log('Jugador recibido desde la API:', this.player);
      },
      err => {
        console.error('Error al cargar jugador:', err);
      }
    );
  }
  
  checkIfFavorite() {
    this.favoriteService.isFavorite(this.player.id).then(isFav => {
      this.player.favorito = isFav;
    }).catch(err => {
      console.error('Error comprobando favorito:', err);
    });
  }

  goBack() {
    this.location.back();
  }
  toggleFavorite() {
    if (!this.player) return;
  
    if (this.player.favorito) {
      this.favoriteService.removeFavorite(this.player.id).then(() => {
        this.player.favorito = false;
        console.log('Jugador eliminado de favoritos firebase');
      });
    } else {
      this.favoriteService.addFavorite(this.player).then(() => {
        this.player.favorito = true;
        console.log('Jugador añadido a favoritos firbase');
      });
    }
  }
}
