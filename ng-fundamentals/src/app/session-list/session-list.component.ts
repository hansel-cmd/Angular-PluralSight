import { Component, Input, OnChanges } from '@angular/core';
import { Session } from '../shared/session';
import { AuthService } from '../user/login/auth.service';
import { VoterService } from '../shared/voter.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css'],
})
export class SessionListComponent implements OnChanges {
  @Input() sessions!: Session[] | undefined;
  @Input() filterBy: string = 'all';
  @Input() sortBy: string = 'votes';
  @Input() eventId: number | undefined;
  filteredSessions: Session[] = [];

  constructor(
    private authService: AuthService,
    private voterService: VoterService
  ) {}

  ngOnChanges(): void {
    if (!this.sessions) return;
    this.handleFilter(this.filterBy);
    if (this.sortBy === 'votes') this.filteredSessions.sort(SortByVotesDesc);
    else this.filteredSessions.sort(SortByNamesAsc);
  }

  handleFilter(filter: string) {
    if (!this.sessions) return;
    if (filter === 'all') this.filteredSessions = [...this.sessions];
    else {
      this.filteredSessions = this.sessions?.filter(
        (session) => session.level.toLocaleLowerCase() === filter
      );
    }
  }

  toggleVote(session: Session) {
    if (!this.authService.currentUser || !this.eventId) return;
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(
        this.eventId,
        session,
        this.authService.currentUser.userName
      );
    } else {
      this.voterService.addVoter(
        this.eventId,
        session,
        this.authService.currentUser.userName
      );
    }

    if (this.sortBy === 'votes') this.filteredSessions.sort(SortByVotesDesc);
  }

  userHasVoted(session: Session) {
    if (!this.authService.currentUser) return false;
    return this.voterService.hasVoted(
      session,
      this.authService.currentUser.userName
    );
  }

  isAuthenticated() {
    return this.authService.isAuthenticated()
  }
}

const SortByVotesDesc = (s1: Session, s2: Session) => {
  return s2.voters.length - s1.voters.length;
};

const SortByNamesAsc = (s1: Session, s2: Session) => {
  if (s1.name > s2.name) return 1;
  else if (s1.name < s2.name) return -1;
  else return 0;
};
