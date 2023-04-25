import { Component, ElementRef,ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
 currentIndex = 0;
  selectedFileType: string;
  playListUrl: string[] = [];
  urlValue: string;
  fileUrl: string;
  selectedFile: File;
  file: File;


  
 @ViewChild('mp3Player') mp3PlayerRef!: ElementRef<HTMLAudioElement>;
  //  mp3Player: HTMLAudioElement;
  time: string = '0:00';

  constructor() {}

  ngAfterViewInit() {
    const mp3Player = this.mp3PlayerRef.nativeElement;
    console.log('mp3 player ', mp3Player);

    //transformer en methode
    mp3Player.addEventListener('loadedmetadata', () => {
      this.time = this.formatTime(mp3Player.duration);
      console.log('this.time', this.time);
    });

    mp3Player.addEventListener('timeupdate', () => {
      this.time = this.formatTime(mp3Player.currentTime);
      console.log('timeupdate', this.time);
    });
  }
  
  


  formatTime(time: number): string {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  // a revoir 
  playFile(): void {
    const mp3Player = this.mp3PlayerRef.nativeElement;
    let currentIndex = 0;
    mp3Player.src = this.playListUrl[currentIndex];
    mp3Player.load();
    mp3Player.play();
    mp3Player.addEventListener('ended', () => {
      currentIndex++;
      if (currentIndex < this.playListUrl.length) {
        mp3Player.src = this.playListUrl[currentIndex];
        mp3Player.load();
        setTimeout(() => {
          mp3Player.play();
        }, 1000); // délai d'une seconde avant de jouer le fichier audio suivant
      } else {
        // currentIndex = 0;
        // this.playSound();
      }
    });
  }

  pauseFile(): void {
    const mp3Player = this.mp3PlayerRef.nativeElement;
    mp3Player.pause();
  }

  deleteFile(i:number): void {
    this.playListUrl.splice(i,1)
  }

  onSubmit() {
    if (this.selectedFileType) {
      const urlValue = this.fileUrl;
      console.log('urlValue', urlValue);
      if (!this.playListUrl.includes(urlValue)) {
        // Vérifier si la chaîne de caractères est déjà présente
        console.log('urlValue', urlValue);
        this.playListUrl.push(urlValue);
        console.log('this.playListUrl', this.playListUrl);
        // Ajouter le fichier via l'URL
      }
      // Ajouter le fichier via l'URL
    }
  }

  onFileSelected(element: any) {
    this.selectedFile = element.target.files[0];
    const reader = new FileReader();
    console.log('reader', reader);

    reader.readAsArrayBuffer(this.selectedFile);
    reader.onload = () => {
      if (reader.result) {
        this.fileUrl = URL.createObjectURL(new Blob([reader.result]));
        console.log('this.fileUrl', this.fileUrl);
      }
    };
  }

  playSound() {
    console.log('click');
    let audio = new Audio();
    let currentIndex = 0;
    audio.src = this.playListUrl[currentIndex];
    audio.load();
    audio.play();
    audio.addEventListener('ended', () => {
      currentIndex++;
      if (currentIndex < this.playListUrl.length) {
        audio.src = this.playListUrl[currentIndex];
        audio.load();
        setTimeout(() => {
          audio.play();
        }, 1000); // délai d'une seconde avant de jouer le fichier audio suivant
      } else {
        // currentIndex = 0;
        // this.playSound();
      }
    });
  }
}
