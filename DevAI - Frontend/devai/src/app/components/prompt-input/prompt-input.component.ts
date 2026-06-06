import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prompt-input',
  templateUrl: './prompt-input.component.html',
  styleUrls: ['./prompt-input.component.scss'],
  imports: [FormsModule]
})
export class PromptInputComponent  implements OnInit {

  public message: string = '';
  
  @Output() sendMessageEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  sendMessage() {
    if (!this.message.trim()) return;
    this.sendMessageEvent.emit(this.message);
  }

  
autoResize(event: any) {
  const textarea = event.target;

  textarea.style.height = 'auto';

  const lineHeight = 20; // approx (adjust if needed)
  const maxLines = 4;

  const maxHeight = lineHeight * maxLines;

  if (textarea.scrollHeight > maxHeight) {
    textarea.style.height = maxHeight + 'px';
    textarea.style.overflowY = 'auto';
  } else {
    textarea.style.height = textarea.scrollHeight + 'px';
    textarea.style.overflowY = 'hidden';
  }
}



}
