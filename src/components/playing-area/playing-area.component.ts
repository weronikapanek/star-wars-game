import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiDataService} from "../../services/api-data.service";
import {CharactersInterface} from "../../interfaces/CharactersInterface";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CharacterInterface} from "../../interfaces/CharacterInterface";
import {StarshipInterface} from "../../interfaces/StarshipInterface";
import {StarshipsInterface} from "../../interfaces/StarshipsInterface";

@Component({
  selector: 'app-playing-area',
  templateUrl: './playing-area.component.html',
  styleUrls: ['./playing-area.component.scss'],
  })
export class PlayingAreaComponent implements OnInit, OnDestroy {
  charactersArray: Array<CharacterInterface | StarshipInterface> = [];
  starshipsArray: Array<CharacterInterface | StarshipInterface> = [];
  card1!: any;
  card2!: any;
  winner: string = '';
  player1Score: number = 0;
  player2Score: number = 0;
  destroy$ = new Subject<boolean>();

  constructor(private apiDataService: ApiDataService) {}

  ngOnInit(): void {
    this.apiDataService.getCharacters()
      .pipe(takeUntil(this.destroy$))
      .subscribe((characters: CharactersInterface) => {
        this.charactersArray = [...characters.results];
      });

    this.apiDataService.getStarships()
      .pipe(takeUntil(this.destroy$))
      .subscribe((starships: StarshipsInterface) => {
        this.starshipsArray = [...starships.results];
      });
  }

  drawPeople() {
    if (this.charactersArray) {
      const randomNumber1 = this.getRandomNumber(this.charactersArray.length);
      const randomNumber2 = this.getRandomNumber(this.charactersArray.length);
      this.card1 = this.charactersArray[randomNumber1];
      this.card2 = this.charactersArray[randomNumber2];

      this.checkWinner(this.card1, this.card2);
    }
  }

  drawStarships() {
    if (this.starshipsArray) {
      const randomNumber1 = this.getRandomNumber(this.starshipsArray.length);
      const randomNumber2 = this.getRandomNumber(this.starshipsArray.length);
      this.card1 = this.starshipsArray[randomNumber1];
      this.card2 = this.starshipsArray[randomNumber2];

      this.checkWinner(this.card1, this.card2);
    }
  }

  checkWinner(card1: any, card2: any) {
    let attr1, attr2;
    if (Object.keys(card1).includes("mass")) {
      attr1 = card1.mass
      attr2 = card2.mass
    } else {
      attr1 = card1.crew
      attr2 = card2.crew
    }

    if (attr1 ==="unknown" || attr2 ==="unknown" || attr1 === attr2) {
      return this.winner = 'draw';
    } else if (attr1 > attr2) {
      this.player1Score++;
      return this.winner = 'P1';
    } else if (attr1 < attr2) {
      this.player2Score++;
      return this.winner = 'P2';
    } else {
      return;
    }
  }

  getRandomNumber(max: number) {
    return Math.floor(Math.random() * max)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
