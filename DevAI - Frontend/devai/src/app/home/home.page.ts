import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { HttpServices } from '../services/http-services';
import { CacheService } from '../services/cache-service';
import { Router } from '@angular/router';
import { SideChatHistoryComponent } from '../components/side-chat-history/side-chat-history.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConversationsComponent } from '../components/conversations/conversations.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ConversationsComponent,
    SideChatHistoryComponent
   ],
})
export class HomePage {
  public isNewChat: boolean = true;
  public chatId: string = '';
  public response: string = '';

  constructor(
    private httpService: HttpServices,
    private cacheService: CacheService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!localStorage.getItem(this.cacheService.userTokenKey) && !localStorage.getItem(this.cacheService.userRefreshTokenKey)) {
      this.router.navigate(['/login']);
    } else {
      this.getUser();
    } 
  }

  getUser() {
    this.httpService.getUer().subscribe({
      next: (res) => {
        localStorage.setItem(this.cacheService.userInfo, res)
      },
      error: (err) => {
        this.router.navigate(['/login']);
      }
    })
  }

}
