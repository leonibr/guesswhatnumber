import { Component, ViewContainerRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Guess the number';
  myNumber: number = null;
  guesses: string[] = [];
  private secretNumber = 0;
  ngOnInit(): void {
    this.secretNumber = this.generate();
  }

  private generate(): number {
    return Math.round(Math.random() * 100);
  }


  confirmNumber() {
    const myPick = this.myNumber;

    this.playerTry(myPick);

    console.log('teste : %s', this.myNumber);
    this.myNumber = null;
  }

  reset() {
    this.guesses = [];
    this.secretNumber = this.generate();
  }

  playerTry(n: number): void {
    if (n >= 1 && n <= 100) {
      if (n == this.secretNumber) {
        this.guesses = [];
        this.guesses.unshift(`Congratulations! ${n} it\'s the correct answer!`);
        const h = setTimeout(() => {
          this.reset();
          this.guesses.unshift("Play again!");
          clearTimeout(h);
          console.log('timedout');
        }, 4000);


      } else if (n < this.secretNumber) {
        this.guesses.unshift(`${n} is smaller than X`);
      } else if (n > this.secretNumber) {
        this.guesses.unshift(`${n} is higher than X`);
      }
    } else {
      this.guesses.unshift(`${n} is out of range [1-100]`);
    }
  }
}
