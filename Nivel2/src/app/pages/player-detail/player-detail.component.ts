import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

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
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.playerId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPlayer();
  }

  loadPlayer() {
    this.playerService.getPlayerById(this.playerId).subscribe(
      res => {
        this.player = res;
        console.log('Jugador recibido desde la API:', this.player);
      },
      err => {
        console.error(' Error al cargar jugador:', err);
      }
    );
  }

  goBack() {
    this.location.back();
  }

  toggleFavorite() {
    this.player.favorito = !this.player.favorito;
    console.log(this.player.favorito ? 'Marcado como favorito se implmenta en Nivel3' : ' Desmarcado se implementa en Nivel3');
    alert('Simulación agregar a favorito se implementa en nivel 3');
  }
}
