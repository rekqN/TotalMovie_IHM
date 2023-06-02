import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userdata={
    fullname:'',
    email:'', 
    username:'',
    password:''
  }
  constructor(private storage: Storage, private alert: AlertController) { }

  ngOnInit() {
    if (ScreenOrientation.lock) {
      const lockOptions: OrientationLockOptions = { orientation: 'portrait' };
      ScreenOrientation.lock(lockOptions);
    }
  }

  async Register() {
    // Verificar se algum campo está vazio
    if (
      this.userdata.fullname === '' ||
      this.userdata.email === '' ||
      this.userdata.username === '' ||
      this.userdata.password === ''
    ) {
      //console.log('Por favor, preencha todos os campos');
      const alert = await this.alert.create({
        header: 'Erro a criar conta',
        message: 'Todos os campos devem ser preenchidos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    // Verificar se algum campo não tem pelo menos dois caracteres
    if (
      this.userdata.fullname.length < 2 ||
      this.userdata.email.length < 2 ||
      this.userdata.username.length < 2 ||
      this.userdata.password.length < 2
    ) {
      //console.log('Todos os campos devem ter pelo menos dois caracteres');
      const alert = await this.alert.create({
        header: 'Erro a criar conta',
        message: 'Todos os campos devem ter pelo menos dois caracteres',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    if (!this.userdata.email.includes('@') || !/\.[A-Za-z]+$/.test(this.userdata.email)) {
      const alert = await this.alert.create({
        header: 'Erro ao criar conta',
        message: 'O campo de e-mail deve conter "@" e um TLD válido',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    // Verificar as condições da senha
    if (
      this.userdata.password.length < 8 ||
      !/\d/.test(this.userdata.password) || // Verificar se há pelo menos um número
      !/[A-Z]/.test(this.userdata.password) || // Verificar se há pelo menos uma letra maiúscula
      !/[!@#$%^&*]/.test(this.userdata.password) // Verificar se há pelo menos um caractere especial
    ) {
      //console.log('A senha deve ter pelo menos 8 caracteres, um número, uma letra maiúscula e um caractere especial (!@#$%^&*)');
      const alert = await this.alert.create({
        header: 'Erro a criar conta',
        message: 'A palavra-passe deve ter pelo menos 8 caracteres, um número, uma letra maiúscula e um caractere especial (!@#$%^&*)',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    this.storage.create().then((storage) => {
      storage.get('userdata')
        .then(async (existingData) => {
          if (existingData) {
            if (Array.isArray(existingData)) {
              // Verifique se o usuário já existe no array existente
              const userExists = existingData.some((user) => user.username === this.userdata.username);
              if (!userExists) {
                // Adicione o novo usuário ao array existente
                existingData.push(this.userdata);
                return storage.set('userdata', existingData);
              } else {
                console.log('Esse usuário já existe!');
                const alert = await this.alert.create({
                  header: 'Erro a criar conta',
                  message: 'Esse nome de usuário já existe',
                  buttons: ['OK']
                });
                await alert.present();
                return;
              }
            } else {
              // Se `existingData` não for um array, crie um novo array com os dados existentes e adicione o novo dado
              if (existingData.username === this.userdata.username) {
                //console.log('Esse usuário já existe!');
                return;
              }
              return storage.set('userdata', [existingData, this.userdata]);
            }
          } else {
            return storage.set('userdata', [this.userdata]);
          }
        })
        .then(async () => {
          console.log(this.userdata);
          
          const alert = await this.alert.create({
            header: 'Registo bem-sucedido',
            message: 'A conta foi criada com sucesso',
            buttons: ['OK']
          });
          await alert.present();
        })
        .catch((error) => {
          console.error('Erro ao salvar os dados:', error);
        });
    });
  }
}


