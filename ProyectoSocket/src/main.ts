import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ChatComponent } from './app/pages/chat/chat.component';

bootstrapApplication(ChatComponent, appConfig)
  .catch((err) => console.error(err));
