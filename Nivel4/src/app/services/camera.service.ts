import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() {}

  async getImage(source: CameraSource): Promise<string | null> {
    console.log('[CameraService] getImage() iniciado. Fuente:', source);

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source,
        saveToGallery: source === CameraSource.Camera
      });

      console.log('[CameraService] Imagen capturada correctamente.');
      console.log('[CameraService] Tamaño base64:', image.base64String?.length || 0);
      return `data:image/jpeg;base64,${image.base64String}`;
    } catch (error) {
      console.error('[CameraService] Error al obtener imagen:', error);
      return null;
    }
  }

  async tomarFoto(): Promise<string | null> {
    console.log('[CameraService] tomarFoto() iniciado');
    
    try {
      const perms = await Camera.requestPermissions({ permissions: ['camera'] });
      console.log('[CameraService] Permisos de cámara:', perms);

      const result = await this.getImage(CameraSource.Camera);
      if (result) {
        console.log('[CameraService] Foto capturada correctamente');
      } else {
        console.warn('[CameraService] Captura cancelada o fallida');
      }
      return result;
    } catch (error) {
      console.error('[CameraService] Error en tomarFoto():', error);
      return null;
    }
  }

  async seleccionarDesdeGaleria(): Promise<string | null> {
    console.log('[CameraService] seleccionarDesdeGaleria() iniciado');
  
    try {
      await Camera.requestPermissions({ permissions: ['photos'] });
      console.log('[CameraService] Permisos solicitados correctamente');
  
      // 🔁 USAR PROMPT en vez de Photos
      const result = await this.getImage(CameraSource.Prompt);
  
      if (result) {
        console.log('[CameraService] Imagen obtenida correctamente');
      } else {
        console.warn('[CameraService] No se seleccionó imagen');
      }
  
      return result;
    } catch (error) {
      console.error('[CameraService] Error al abrir galería:', error);
      return null;
    }
  }
}





