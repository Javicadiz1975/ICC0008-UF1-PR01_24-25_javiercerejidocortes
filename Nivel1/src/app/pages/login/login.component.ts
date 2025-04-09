import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private router: Router
  ) {}

  onLogin() {
    console.log('[LOGIN] Intentando iniciar sesión con:', this.email);

    this.afAuth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log('Sesión iniciada correctamente');
        this.presentToast('Sesión iniciada correctamente', 'success');
        this.router.navigate(['/player-list']);
      })
      .catch((err) => {
        console.error('Error al iniciar sesión:', err.code);
        this.presentToast(this.firebaseErrorMsg(err.code), 'danger');
      });
  }

  goToRegister() {
    console.log('[LOGIN] Navegar a página de registro');
    this.router.navigate(['/register']);
  }

  async presentToast(message: string, color: 'success' | 'danger' = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }

  firebaseErrorMsg(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'Usuario no encontrado.';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta.';
      case 'auth/invalid-email':
        return 'Correo inválido.';
      default:
        return 'Error desconocido. Intenta de nuevo.';
    }
  }
}

