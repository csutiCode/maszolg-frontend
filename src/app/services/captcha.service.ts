import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  constructor() { }

  firstNumber?: string;

  secondNumber?: string;


  //everytime generate 
  captchaList:  any[] = [
    {key:"egy", value: 1},
    {key:"kettő", value: 2},
    {key:"három", value: 3},
    {key:"négy", value: 4},
    {key:"öt", value: 5},
    {key:"hat", value: 6},
    {key:"hét", value: 7},
    {key:"nyolc", value: 8},
    {key:"kilenc", value: 9},
    {key:"tíz", value: 10},
   
  ]

  resultList:  any[] = [
    {key:"egy", value: 1},
    {key:"kettő", value: 2},
    {key:"három", value: 3},
    {key:"négy", value: 4},
    {key:"öt", value: 5},
    {key:"hat", value: 6},
    {key:"hét", value: 7},
    {key:"nyolc", value: 8},
    {key:"kilenc", value: 9},
    {key:"tíz", value: 10},
    {key:"tizenegy", value: 11},
    {key:"tizenkettő", value: 12},
    {key:"tizenhárom", value: 13},
    {key:"tizennégy", value: 14},
    {key:"tizenöt", value: 15},
    {key:"tizenhat", value: 16},
    {key:"tizenhét", value: 17},
    {key:"tizennyolc", value: 18},
    {key:"tizenkilenc", value: 19},
  ]

  captchaMap = new Map<string, number>();

  result : number = 0;

  textResult?: string;

  createCaptcha(): number {

    const firstRandom = this.captchaList[Math.floor(Math.random() * this.captchaList.length)];
    const secondRandom = this.captchaList[Math.floor(Math.random() * this.captchaList.length)];

    this.firstNumber = firstRandom.key;
    this.secondNumber = secondRandom.key;

    this.result = firstRandom.value + secondRandom.value;
    
    for (var num of this.resultList) {
      if (num.value == this.result) {
        this.textResult = num.key;
        break;
      }
    }

    return this.result;
  }

}
