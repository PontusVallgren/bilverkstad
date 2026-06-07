import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/** Fields shared by every submission. `company` is the honeypot (must stay empty). */
interface BasePayload {
  company: string;
}

export interface ContactPayload extends BasePayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface OffertPayload extends BasePayload {
  regNumber: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  priority: string;
  date: string;
  message: string;
}

interface MailResponse {
  ok: boolean;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class MailService {
  private readonly http = inject(HttpClient);

  sendContact(payload: ContactPayload): Observable<MailResponse> {
    return this.http.post<MailResponse>(environment.mailEndpoint, { type: 'kontakt', ...payload });
  }

  sendOffert(payload: OffertPayload): Observable<MailResponse> {
    return this.http.post<MailResponse>(environment.mailEndpoint, { type: 'offert', ...payload });
  }
}
