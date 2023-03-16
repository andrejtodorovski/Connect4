import { Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-connect4',
  templateUrl: './connect4.component.html',
  styleUrls: ['./connect4.component.css']
})
export class Connect4Component {
  title = 'Connect 4 Game';
  playerTurn: string = 'Yellow';
  br: number = 0;
  hasWon:boolean = false;
  constructor(private readonly elementRef: ElementRef) { }
  public handleButtonClick(buttonNumber: string): any {
    // Get the row where the button was clicked
    const buttonClickedRow = this.elementRef.nativeElement.querySelectorAll('.rowDiv')[parseInt(buttonNumber)];
    for (let i = 5; i >= 0; i--) {
      const divBox = buttonClickedRow.querySelectorAll('a')[i];
      if (!divBox.classList.contains('yellow') && !divBox.classList.contains('red')) {
        if (this.playerTurn == 'Yellow') {
          divBox.classList.add('yellow');
          this.playerTurn = 'Red';
          this.br++;
        }
        else {
          divBox.classList.add('red');
          this.playerTurn = 'Yellow';
          this.br++;
        }
        break;
      }
    }
    this.checkForWin();
    this.checkForDraw();
  }
  public resetGame() {
    const allDivs = this.elementRef.nativeElement.querySelectorAll('.rowDiv a');
    for (let i = 0; i < 42; i++) {
      allDivs[i].classList.remove('yellow');
      allDivs[i].classList.remove('red');
      allDivs[i].classList.remove("border");
      allDivs[i].classList.remove("inactiveLink");
      const allButtons = this.elementRef.nativeElement.querySelectorAll('.rowDiv > button');
      for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].disabled = false;
      }
    }
    this.hasWon = false;
    this.br = 0;
  }
  public disableButtons() {
    const allButtons = this.elementRef.nativeElement.querySelectorAll('.rowDiv > button');
    for (let i = 0; i < allButtons.length; i++) {
      allButtons[i].disabled = true;
    }
    const allDivs = this.elementRef.nativeElement.querySelectorAll('.rowDiv a');
    for (let i = 0; i < allDivs.length; i++) {
      allDivs[i].classList.add("inactiveLink");
    }
  }
  public checkFourInARow(first: any, second: any, third: any, fourth: any, color: string): boolean {
    return first.classList.contains(color)
      && second.classList.contains(color)
      && third.classList.contains(color)
      && fourth.classList.contains(color);
  }
  public checkForWin() {
    const allDivRows = this.elementRef.nativeElement.querySelectorAll('.rowDiv');
    // check for win in columns
    for (let j = 0; j < 6; j++) {
      const currentDiv = allDivRows[j];
      for (let i = 0; i < 3; i++) {
        const first = currentDiv.querySelectorAll('a')[i];
        const second = currentDiv.querySelectorAll('a')[i + 1];
        const third = currentDiv.querySelectorAll('a')[i + 2];
        const fourth = currentDiv.querySelectorAll('a')[i + 3];
        if (this.checkFourInARow(first, second, third, fourth, "yellow")) {
          this.hasWon = true;
          alert("yellow win!");
          this.disableButtons();
          this.flashDivBoxes(first,second,third,fourth);
          return;
        }
        if (this.checkFourInARow(first, second, third, fourth, "red")) {
          this.hasWon = true;
          alert("red win!");
          this.disableButtons();
          this.flashDivBoxes(first,second,third,fourth);
          return;
        }
      }
    }
    // check for win in rows
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 4; i++) {
        const div1 = allDivRows[i];
        const div2 = allDivRows[i + 1];
        const div3 = allDivRows[i + 2];
        const div4 = allDivRows[i + 3];
        const first = div1.querySelectorAll('a')[j];
        const second = div2.querySelectorAll('a')[j];
        const third = div3.querySelectorAll('a')[j];
        const fourth = div4.querySelectorAll('a')[j];
        if (this.checkFourInARow(first, second, third, fourth, "yellow")) {
          this.hasWon = true;
          alert("yellow win!");
          this.disableButtons();
          this.flashDivBoxes(first,second,third,fourth);
          return;
        }
        if (this.checkFourInARow(first, second, third, fourth, "red")) {
          this.hasWon = true;
          alert("red win!");
          this.disableButtons();
          this.flashDivBoxes(first,second,third,fourth);
          return;
        }
      }
    }
    const allDivs = this.elementRef.nativeElement.querySelectorAll('.rowDiv a');
    // check for win in diagonal
    for (let j = 0; j < 24; j++) {
      if (j % 6 > 2) {
        const first = allDivs[j];
        const second = allDivs[j + 5];
        const third = allDivs[j + 10];
        const fourth = allDivs[j + 15];
        if (this.checkFourInARow(first, second, third, fourth, "yellow")) {
          this.hasWon = true;
          alert("yellow win!");
          this.disableButtons();
          this.flashDivBoxes(first,second,third,fourth);
          return;
        }
        if (this.checkFourInARow(first, second, third, fourth, "red")) {
          this.hasWon = true;
          alert("red win!");
          this.disableButtons();
          this.flashDivBoxes(first,second,third,fourth);
          return;
        }
      }
      if (j % 6 <= 2) {
        const first = allDivs[j];
        const second = allDivs[j + 7];
        const third = allDivs[j + 14];
        const fourth = allDivs[j + 21];
        if (this.checkFourInARow(first, second, third, fourth, "yellow")) {
          this.hasWon = true;
          alert("yellow win!");
          this.disableButtons();
          this.flashDivBoxes(first,second,third,fourth);
          return;
        }
        if (this.checkFourInARow(first, second, third, fourth, "red")) {
          this.hasWon = true;
          alert("red win!");
          this.disableButtons();
          this.flashDivBoxes(first,second,third,fourth);
          return;
        }
      }
    }
  }
  public checkForDraw() {
    // check for draw
    if (this.br === 42 && this.hasWon == false) {
      alert("Draw!");
      this.disableButtons();
    }
  }
  public flashDivBoxes(first: any, second: any, third: any, fourth: any){
        first.classList.add("border");
        second.classList.add("border");
        third.classList.add("border");
        fourth.classList.add("border");
  }
}
