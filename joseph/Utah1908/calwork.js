
// Basic Calendar Calculation Functions
// Written by Joseph F. Buchanan - 2/11/2000
//  translated from Pacsal, Hypercard to JavaScript

function Leapy(yy) {  // Written by Joseph F. Buchanan - 2/11/2000
// Given the year, will return 1 if it is a leap year otherwise a zero.
// The year must be full 4 digits.
var lp=0;
 if ((yy % 4) == 0) {
    if ((yy % 100) == 0) {
      if ((yy % 400) == 0) {
        lp = 1;
      } else {
        lp = 0;
      }
     }else {
      lp = 1;
    }
  }
  return lp;
} // end of Leapy

function JulDay (yy,mm,dd) {  // Written by Joseph F. Buchanan - 2/11/2000
  // Given the year, month and day, will return the day of the year
  // 1 - 366 (julian day). The year must be full 4 digits.
  // month is 0-11
  if (mm>11) {
    alert("month out of range: " + mm);
    mm = 11;
  }
  var jd = dd-30+Math.floor((((mm+1)*275) / 9));
  if (mm > 1) { jd = jd-2+Leapy(yy); }
  return jd;
} // end of JulDay

function DOW (yy,mm,dd) {  // Written by Joseph F. Buchanan - 2/11/2000
  // Given the year, month and day will return the number of the day
  // of the week (0-6). The year must be full 4 digits.
  // month is 0-11
  var df = yy-1600;
  var daze = df+1+Math.floor(((df-1) / 4))-Math.floor(((df-1) / 100))+Math.floor(((df-1) / 400));
  var dayow = (daze % 7);
  dayow = ((dayow+JulDay(yy,mm,dd)+5) % 7);
  return dayow;
} // end of DOW

function MDays (yy,mm) {  // Written by Joseph F. Buchanan - 2/11/2000
  // Given the year and month, will return the number of days of that
  // month. The year must be full 4 digits. Month is 0-11
  var mm1 = mm+1;
  if (mm == 11) {
    return 31;
  } else {
    return JulDay(yy,mm1,1)-JulDay(yy,mm,1);
  }
} // end of MDays

function weekOfMonth (theDay) {  // Written by Joseph F. Buchanan - 2/11/2000
  n = theDay.getDate();
  return Math.floor((n+6) / 7);
} // end of weekOfMonth

function easterCalc(yyyy) {  // Written by Joseph F. Buchanan - 2/11/2000
  // Given the year, will return the day for Easter Sunday in the form
  // yyyymmdd. The year must be full 4 digits.
  var ii = (yyyy % 19); // yyyy modulo 19 // hard coded Paschal calendaring
  var em = new Array(3,3,2,3,2,3,3,2,3,3,2,3,3,2,3,2,3,3,2);
  var ed = new Array(14,3,23,11,31,18,8,28,16,5,25,13,2,22,10,30,17,7,27);
  var mm = em[ii];
  var dd = ed[ii];
  var dayow = DOW(yyyy,mm,dd);
  dd = dd+7-dayow;
  if (dd > 31) {
    dd = dd-31;
    mm = mm + 1;
  }
var easterDay = new Date();
easterDay.setYear(yyyy);
easterDay.setMonth(mm);
easterDay.setDate(dd);
 return easterDay;
} // end of easterCalc

function todayText() {
  var output = new Date();
  return (output.getMonth()+1) + "/" + (output.getDate()) + "/" + (output.getYear()+1900);
}

function monthName(n) {
  var MonthNames = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
  it = MonthNames[n];
  return it;
}

function wkDayName(n) {
  var WeekdayNames = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
  return WeekdayNames[n];
}

function makeCalendar (yy,mm,dd,howMany) {

  // Written by Joseph F. Buchanan - 2/11/2000 revised 2/24/2003
  // yy is 4 digit year, mm is month 0-11, howMany is number of months
  // dd is either 0 or the day to be hilighted (on the first month)
 var mLine, nSpaces, doweek, dSpot, LNum, i, n, x;
 var weekLine = " S  M  T  W  T  F  S";
  var blankLine = "                    ";
  var gapspace = "   ";
 var MonWidth = weekLine.length;
  var mfirst = 1;
  if (howMany == NaN) { howMany = 1; }
  var textBlock = new Array("", "", "", "", "", "", "", "", "", "");
  var textLines = 0; // ignore element 0 of the array
  for (n = 1; n<= howMany; n++) { // outer for loop - number of months across
    if (n>1) {
    for (i = 1; i<=textLines; i++) {
        textBlock[i] += gapspace;
      }
    }
    mLine = monthName(mm) + " " + yy;
    nSpaces = Math.floor((MonWidth - (mLine.length) + 1) / 2);
    mLine = blankLine.substr(0,nSpaces) + mLine;
    mLine += blankLine;
    textBlock[1] += mLine.substr(0,MonWidth);
    textBlock[2] += weekLine;
    doweek = DOW(yy,mm,1) + 1; // it comes as 0 thru 6
    dSpot = doweek;
    LNum = 3;
    if (doweek>1) {
      nSpaces = (doweek-1)*3;
      textBlock[LNum] += blankLine.substr(0,nSpaces);
    }
    if (textLines<3) {textLines=3;}
    for (i=1; i<=MDays(yy,mm); i++) { // get all days of the month
     if (mfirst && i==dd) { textBlock[LNum] += "<b>"; }
     if (i<10) {
        textBlock[LNum] += " " + i;
      } else {
        textBlock[LNum] += i;
      }
     if (mfirst && i==dd) {
       textBlock[LNum] += "</b>";
       mfirst = 0;
       }
      if (dSpot<7) { textBlock[LNum] += " "; }
        dSpot += 1;
      if ( i<MDays(yy,mm)) {
        if (dSpot>7) {
          dSpot = 1;
          LNum += 1;
         if ((n>1) && (LNum>textLines)) {
           for (x=1; x<=(n-1); x++) {
             textBlock[LNum] += blankLine + gapspace;
           }
          }
        }
      }
    } // days of month for loop
    if (dSpot<8) {
      nSpaces = (8-dSpot)*3 - 1;
      textBlock[LNum] += blankLine.substr(1,nSpaces);
    }
    if (LNum<textLines) {
      for (i=(LNum+1); i<=textLines; i++) {
       textBlock[i] += blankLine.substr(0,MonWidth);
     }
    }
    if (LNum>textLines) {textLines = LNum;}
    mm += 1;
    if (mm>11) {
      mm = 0;
      yy += 1;
    }
  } // months for loop
  var finishText = "";
  for (n=1; n<=textLines; n++) {
    finishText += textBlock[n] + "\n";
  }
  return finishText;
}

 // end of Make Calendar
