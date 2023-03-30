var oldPlace = new Array("","");
var oldRR = new Array("","","","","","","","","","","");
var oldCounty = "none";
var cInfo = "";
var cList = "";
var cMax = 0;
var ckName = ":*:U1908:*:"
var dlm = "@.@"

function saveCondition() {
   var ckStuff = oldCounty;
   ckStuff += dlm + oldPlace[0] + dlm + oldPlace[1];
   for (i=0;i<10;i++) { ckStuff += dlm + oldRR[i]; }
   var ck = ckName + "=" + escape(ckStuff);
   document.cookie = ck;
}

function restoreCondition() {
      cCheck();
   var ck = " " + document.cookie + ";";
   var cks = ck.indexOf(ckName);
   var cke;
   var ckVal = "";
   var cknm = " " + ckName;
   if (cks != -1) {
     cks += cknm.length;
     cke = ck.indexOf(";",cks);
     ckVal = unescape(ck.substring(cks, cke));
   }
  if (ckVal.length>0) {
    var ckList = ckVal.split(dlm);
    oldCounty = ckList[0];
         setCounty(oldCounty);         setCountyLink(oldCounty);    oldPlace[0] = ckList[1];
    if (oldPlace[0].length>0) { showElement(oldPlace[0]); }
    oldPlace[1] = ckList[2];
    if (oldPlace[1].length>0) { showElement(oldPlace[1]); }
     for (i=0;i<10;i++) {
      oldRR[i] = ckList[i+3];
      var rrCode = oldRR[i];
      if (rrCode.length<1) { break; }
      var objRail = document.getElementById(rrCode).style;      objRail.display="block";
     }
  }
}

function visualSet(cnty,lvl1,lvl2) { // * in any of these means No Change
      cCheck();
  if ((cnty=="*") || (cnty != oldCounty)) {
        oldCounty = cnty;
        setCounty(oldCounty);        setCountyLink(oldCounty);
  }  if (lvl1!="*") {
    if (lvl1 != oldPlace[0]) {
      if (oldPlace[0].length>0) { hideElement(oldPlace[0]); }
      oldPlace[0] = lvl1;
      if (oldPlace[0].length>0) { showElement(oldPlace[0]); }
    }
    else {
      if (oldPlace[0].length>0) { hideElement(oldPlace[0]); }
      oldPlace[0] = "";
    }
  }
  if (lvl2!="*") {
    if (lvl2 != oldPlace[1]) {
      if (oldPlace[1].length>0) { hideElement(oldPlace[1]); }
      oldPlace[1] = lvl2;
      if (oldPlace[1].length>0) { showElement(oldPlace[1]); }
    }
    else { // clicked on the same location, close the information
      if (oldPlace[1].length>0) { hideElement(oldPlace[1]); }
      oldPlace[1] = "";
      clearRRCodes();
        oldCounty = "none";
        setCounty(oldCounty);        setCountyLink(oldCounty);
    }
  }
     saveCondition();
}

function showElement(ID) {
       if (document.getElementById(ID) != null) {
          var obj = document.getElementById(ID).style;          obj.display="block";
        }
        else { alert("ID not found:" + ID); }
 }

function hideElement(ID) {
       if (document.getElementById(ID) != null) {
          var obj = document.getElementById(ID).style;          obj.display="none";
        }
        else { alert("ID not found:" + ID); }
 }

   function showBranch(place,cnty,lvl){
      cCheck();
      var objPlace =          document.getElementById(place).style;      if(objPlace.display=="block") {         objPlace.display="none";
         oldPlace[lvl]="";
     oldCounty = "none";
         setCounty("none");         setCountyLink("none");        if((lvl==0) && (oldPlace[1]!=place)) {
          objPlace = document.getElementById(oldPlace[1]).style;
          if(objPlace.display=="block") { objPlace.display="none"; clearRRCodes(); oldPlace[1]=""; }
        }
     }
      else {         objPlace.display="block";
     oldCounty = cnty;
         setCounty(cnty);         setCountyLink(cnty);      }
     if(oldPlace[lvl]!=place) {      if (oldPlace[lvl].length>0) {
        objPlace =          document.getElementById(oldPlace[lvl]).style;
        if(objPlace.display=="block") { objPlace.display="none"; clearRRCodes(); }
      }
      oldPlace[lvl]=place;
     }
     saveCondition();
   }

  function cCheck() {
      if (cInfo.length<1) {
        var c=document.getElementById("loader");
        cInfo = c.value;
        cList = cInfo.split("$");
        cmax = cList.length-1;
        for (k=0;k<cmax;k++) { cList[k] = cList[k].substr(1); }
      }
  }

   function getCountyURL(cName) {
    var cURL = "";
    for (k=0;k<cmax;k++) {
      var cLine = cList[k];
      cItems = cLine.split(";");
      if (cItems[0] == cName) {
        cURL = cItems[4];
        break;
      }
    }
    return cURL;
   }

   function setCounty(cnty){
     var i=document.getElementById("CMAP");
     var u = "";
     if (cnty == "none") { u="MoneyOrder.gif"; }
     else { u=getCountyURL(cnty)+".jpg"; }
     i.src = u;
   }

   function setCountyLink(cnty){
     var i=document.getElementById("CNINFO");
     var h = "";
     if (cnty == "none") { h="Utah1908.html"; }
     else { h=getCountyURL(cnty)+".html"; }
     i.href = h;
   }

   function setRailInfo(rr){
    var rList = rr.split(",");
    var numRR = rList.length;
    var prevRRNum = "";
    var nr = 0;
    clearRRCodes();
    if (oldPlace[1].length>0) {
    for (k=0;k<numRR;k++) {
     var theRR = rList[k];
     if (theRR.slice(0,1)==" ") { theRR = theRR.substr(1); } // peel off first character (a space)
     if (theRR.length==1) { theRR = prevRRNum + theRR; } // only numeric code given, apply to previous number
     if (theRR.charCodeAt(0)<58) {
      var nm = theRR.length-1;
      var rrCode = "";
      if (theRR.charCodeAt(nm)>57) { // found non-numeric at the end
        prevRRNum = theRR.slice(0,nm);
        rrCode = "RAIL" + prevRRNum + " " + theRR.slice(nm) + ".";
      }
      else {
        prevRRNum = theRR;
        rrCode = "RAIL" + theRR + ".";
      }
      nm+=1;
       if (document.getElementById(rrCode) != null) {
        oldRR[nr]=rrCode;
        nr += 1;
        var objRail =          document.getElementById(rrCode).style;          objRail.display="block";
        }
        else {
         // alert("rr not found:" + rrCode);
        }
      } // end of if
    } // end of for
    }
     saveCondition();
   }

function clearRRCodes() {
  for (i=0;i<10;i++) {
    var rrCode = oldRR[i];
    if (rrCode.length<1) { break; }
    var objRail = document.getElementById(rrCode).style;    objRail.display="none";
    oldRR[i] = "";
  }
}

function doRefresh(){     alert("Reloading Page");     window.location.reload();}
