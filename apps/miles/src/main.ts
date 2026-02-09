import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

createApplication(appConfig)
  .catch((err) => console.error(err));
