import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private router: Router
  ) {}

  onRegister() {
    console.log('[REGISTER] Datos ingresados:', this.email, this.password, this.confirmPassword);

    if (!this.email || !this.password || !this.confirmPassword) {
      this.presentToast('⚠️ Todos los campos son obligatorios', 'danger');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.presentToast('⚠️ Las contraseñas no coinciden', 'danger');
      return;
    }

    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log('Registro exitoso');
        this.presentToast('✅ Registro exitoso', 'success');
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.error('Error al registrar:', err.code);
        this.presentToast(this.firebaseErrorMsg(err.code), 'danger');
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });
    await toast.present();
  }

  firebaseErrorMsg(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El correo ya está registrado.';
      case 'auth/invalid-email':
        return 'Correo electrónico inválido.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil (mínimo 6 caracteres).';
      default:
        return 'Error al registrar. Intenta de nuevo.';
    }
  }
}

