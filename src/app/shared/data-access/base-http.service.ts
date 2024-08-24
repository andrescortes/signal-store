import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  readonly http = inject(HttpClient);

  apiUrl: string = environment.API_PRODUCT_URL;
}
