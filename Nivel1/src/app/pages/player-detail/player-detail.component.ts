import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

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
    private location: Location
  ) {}

  ngOnInit() {

    const allPlayers = [
      {
        id: 1,
        nombre: 'LeBron',
        apellidos: 'James',
        altura: '2.06 m',
        peso: '113 kg',
        equipo: 'Lakers',
        pais: 'EE.UU.',
        numero: '6',
        posicion: 'Alero',
        favorito: false
      },
      {
        id: 2,
        nombre: 'Stephen',
        apellidos: 'Curry',
        altura: '1.88 m',
        peso: '84 kg',
        equipo: 'Warriors',
        pais: 'EE.UU.',
        numero: '30',
        posicion: 'Base',
        favorito: false
      }
    ];

    this.playerId = Number(this.route.snapshot.paramMap.get('id'));
    this.player = allPlayers.find(p => p.id === this.playerId);
    console.log('🔍 Jugador seleccionado:', this.player);
  }

  goBack() {
    this.location.back();
  }

  toggleFavorite() {
    this.player.favorito = !this.player.favorito;
    console.log(this.player.favorito ? 'Marcado como favorito' : 'Desmarcado');
  }
}
