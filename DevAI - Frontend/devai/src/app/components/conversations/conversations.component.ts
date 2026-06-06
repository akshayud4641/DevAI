import { Component, Input, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { PromptInputComponent } from '../prompt-input/prompt-input.component';
import { HttpServices } from 'src/app/services/http-services';
import { CacheService } from 'src/app/services/cache-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
  imports: [
    IonContent,
    PromptInputComponent
  ]
})
export class ConversationsComponent  implements OnInit {

  @Input() isNewChat: boolean = false;
  @Input() chatId: string = '';

  public response: string = '';

  constructor(
    private httpService: HttpServices,
    private cacheService: CacheService,
    private router: Router
  ) { }

  ngOnInit() {}

  askAI(prompt: string) {
    this.response = '';
    this.httpService.askAI(prompt, (chunk) => {
      this.response += chunk;
    });
  }

}
