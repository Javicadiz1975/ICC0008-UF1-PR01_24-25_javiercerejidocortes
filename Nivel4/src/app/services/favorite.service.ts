import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  // Añadir jugador a favoritos
  async addFavorite(player: any): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (!user) {
      console.warn('No hay usuario autenticado.');
      return;
    }
  
    try {
      await this.firestore.firestore
        .collection(`users/${user.uid}/favorites`)
        .doc(player.id.toString())
        .set(player);
  
      console.log(`Favorito añadido: ${player.first_name} ${player.last_name}`);
    } catch (error) {
      console.error('Error al añadir favorito:', error);
    }
  }

  // Eliminar jugador de favoritos
  async removeFavorite(playerId: number): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (!user) {
      console.warn('No hay usuario autenticado.');
      return;
    }
  
    try {
      await this.firestore.firestore
        .collection(`users/${user.uid}/favorites`)
        .doc(playerId.toString())
        .delete();
  
      console.log(`Favorito eliminado: ID ${playerId}`);
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
    }
  }
  

  // Verificar si un jugador es favorito
  async isFavorite(playerId: number): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    if (!user) {
      console.warn('No hay usuario autenticado.');
      return false;
    }
  
    console.log(`Usuario autenticado: UID = ${user.uid}`);
    console.log(`Buscando en ruta: users/${user.uid}/favorites/${playerId}`);
  
    try {
      const docSnap = await this.firestore.firestore
        .collection(`users/${user.uid}/favorites`)
        .doc(playerId.toString())
        .get();
  
      if (docSnap.exists) {
        console.log(`El jugador con ID ${playerId} SÍ está en favoritos.`);
      } else {
        console.log(`El jugador con ID ${playerId} NO está en favoritos.`);
      }
  
      return docSnap.exists;
    } catch (error) {
      console.error('Error comprobando si el jugador es favorito:', error);
      return false;
    }
  }
  

  // // Obtener todos los favoritos del usuario (opcional)
  // async getFavorites(): Promise<any[]> {
  //   const user = await this.afAuth.currentUser;
  //   if (!user) return [];

  //   const snapshot = await firstValueFrom(
  //     this.firestore
  //       .collection('users')
  //       .doc(user.uid)
  //       .collection('favorites')
  //       .get()
  //   );

  //   return snapshot.docs.map(doc => doc.data());
  // }
}
