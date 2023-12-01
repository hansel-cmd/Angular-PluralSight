import { Injectable } from '@angular/core';
import { Session } from './session';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoterService {
  constructor(private http: HttpClient) {}

  deleteVoter(eventId : number, session: Session, username: string) {
    session.voters = session.voters.filter((voter) => voter !== username);
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${username}`;
    this.http
      .delete(url)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }

  addVoter(eventId: number, session: Session, username: string) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    session.voters.push(username);
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${username}`;
    this.http
      .post(url, {}, options)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }

  hasVoted(session: Session, username: string): boolean {
    return session.voters.some((voter) => voter === username);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('ERROR', error);
      return of(result as T);
    };
  }
}
