import { Component} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(
        ':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('300ms', style({transform: 'translateY(0)', 'opacity': 1}))
        ]
      )
    ]),
    trigger('loadingAnimation', [
      transition(
        ':enter', [
          style({transform: 'translateY(-250%)', opacity: 0}),
          animate('1000ms', style({transform: 'translateY(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateY(-100%)', 'opacity': 0}))
        ]
      )
    ])
  ]
})
export class HomeComponent {
  startTime = new Date();
  title = 'HMD';
  todayRespirationAverage = 0;
  lastNightPercent = 0;
  weeklyAvergePercent = 0;
  loaded = false;
  lastNightArrowImage = "red_arrow_up";
  lastWeekArrowImage = "red_arrow_up";
  showLastNightArrow = true;
  showLastWeekArrow = true;

  constructor(db: AngularFireDatabase) {

    var respirationList = db.list('/sleep/301');
    respirationList.subscribe(respirations => {
      this.todayRespirationAverage = this.respirationRateAverage(respirations,
        "2017-07-10 00:00:01", "2017-07-10 23:59:59")
      var yesterdayRespirationAverage = this.respirationRateAverage(respirations,
        "2017-07-09 00:00:01", "2017-07-09 23:59:59")
      var lastWeekRespirationAverage = this.respirationRateAverage(respirations,
        "2017-07-02 00:00:01", "2017-07-08 23:59:59")
      // console.log("todayRespirationAverage " + this.todayRespirationAverage)
      // console.log("yesterdayRespirationAverage " + yesterdayRespirationAverage)
      // console.log("lastWeekRespirationAverage " + lastWeekRespirationAverage)
      var currTime = new Date().getTime()
      var diffTime = (currTime - this.startTime.getTime())/1000
      // console.log("time passed: " + diffTime)
      var lastNightAvgDiff= this.respirationAverageDiff(this.todayRespirationAverage, yesterdayRespirationAverage)
      var lastWeekAvgDiff = this.respirationAverageDiff(this.todayRespirationAverage, lastWeekRespirationAverage)
      this.setLastNightArrowImage(lastNightAvgDiff)
      this.setLastWeekArrowImage(lastWeekAvgDiff)
      this.loaded = true
    })
  }

  setLastNightArrowImage(avgDiff){
    if (avgDiff === 0) {
      this.showLastNightArrow = false
    } else if (avgDiff > 0 && avgDiff <= 10) {
      this.lastNightArrowImage = "green_arrow_up"
    } else if (avgDiff > 10) {
      this.lastNightArrowImage = "red_arrow_up"
    } else if (avgDiff < 0 && avgDiff >= -10) {
      this.lastNightArrowImage = "green_arrow_down"
    } else if (avgDiff < -10) {
      this.lastNightArrowImage = "red_arrow_down"
    }
    this.lastNightPercent = Math.abs(avgDiff)
  }

  setLastWeekArrowImage(avgDiff){
    if (avgDiff === 0) {
      this.showLastWeekArrow = false
    } else if (avgDiff > 0 && avgDiff <= 10) {
      this.lastWeekArrowImage = "green_arrow_up"
    } else if (avgDiff > 10) {
      this.lastWeekArrowImage = "red_arrow_up"
    } else if (avgDiff < 0 && avgDiff >= -10) {
      this.lastWeekArrowImage = "green_arrow_down"
    } else if (avgDiff < -10) {
      this.lastWeekArrowImage = "red_arrow_down"
    }
    this.weeklyAvergePercent = Math.abs(avgDiff)
  }

  respirationAverageDiff(startAverage, endAverage){
    var diff = (startAverage - endAverage)/startAverage
    var percentDiff = Math.round(diff * 100)
    // console.log("percentDiff: " + percentDiff)
    return percentDiff
  }

  respirationRateAverage(respirations, startAt, endAt){
      var respirationRateCount = 0
      var respirationRateTotal = 0
      respirations.forEach(respiration => {
        if (respiration.signal_quality >= 9 && respiration.respiration_rate !== 0
          && respiration.status_code === 0 && respiration.created_at >= startAt
          && respiration.created_at <= endAt) {
          respirationRateCount++
          respirationRateTotal += respiration.respiration_rate
        }
      });
      // console.log("respirationRateCount " + respirationRateCount)
      // console.log("respirationRateTotal " + respirationRateTotal)
      var respirationRateAverage = 0
      if (respirationRateCount > 0){
        respirationRateAverage = Math.round(respirationRateTotal/respirationRateCount)
      }
      return respirationRateAverage
  }
}
