var fs = require('fs');
var parse = require('csv-parse');

//var sInfo = fs.readFileSync('C:\\Users\\win10\\Downloads\\subway_data\\station_info.json', 'utf8');
//var sLang = fs.readFileSync('C:\\Users\\win10\\Downloads\\subway_data\\station_lang.json', 'utf8');
var sInfo = fs.readFileSync('/home/jongsang/local/station_info.json', 'utf8');
var sLang = fs.readFileSync('/home/jongsang/local/station_lang.json', 'utf8');
//console.log(sLang); 파일 전체 정보(csv형식)
var sLocation = JSON.parse(sInfo).DATA;
//console.log(sLocation);
var sNames = JSON.parse(sLang).DATA;
//console.log(sNames);  파일 전체 정보(json형식)
//console.log(sLocation.DATA.length);

//위치정보 정리
//var location_meta = new Object();
var location_meta = new Array();
for(var i = 0; i < sLocation.length; i++){
  if(sLocation[i].XPOINT_WGS !== "" &&
      (sLocation[i].LINE_NUM === "1" || sLocation[i].LINE_NUM === "2" || sLocation[i].LINE_NUM === "3" || sLocation[i].LINE_NUM === "4" || 
      sLocation[i].LINE_NUM === "5" || sLocation[i].LINE_NUM === "6" || sLocation[i].LINE_NUM === "7" || sLocation[i].LINE_NUM === "8" ||
       sLocation[i].LINE_NUM === "I" || sLocation[i].LINE_NUM === "B")
    ){
    //"서울" 은 "서울역" 으로 이름 변경.
    if(sLocation[i].STATION_NM === "서울"){ sLocation[i].STATION_NM = "서울역" }
    //
    sLocation[i].STATION_NM = sLocation[i].STATION_NM;
    
    
    //null 값 처리
//    if(sLocation[i].XPOINT_WGS === null){
//    	sLocation[i].XPOINT_WGS = 0;
//    }
//    if(sLocation[i].YPOINT_WGS === null){
//    	sLocation[i].YPOINT_WGS = 0;
//    }

    
    location_meta.push({
      "STATION_NM" : sLocation[i].STATION_NM,
      //"LINE_NUM" : Number(sLocation[i].LINE_NUM),
      "GEO_X" : Number(sLocation[i].XPOINT_WGS),
      "GEO_Y" : Number(sLocation[i].YPOINT_WGS)
    });
    //console.log("%j",location_meta[location_meta.length-1]);
  }
}
//console.log(sLocation[1].STATION_NM);
//console.log(location_meta[1].STATION_NM);

//다국어 역 정보 정리
var language_meta = new Object();
for(var i = 0; i < sNames.length; i++){
//	console.log(sNames.length);
  if(sNames[i].STN_NM !== ""){
    var stn_name = sNames[i].STN_NM;
    var qIndex = stn_name.indexOf("(");
    if(qIndex > 0){
      stn_name = stn_name.substring(0,qIndex);
    }
//    console.log(stn_name);
    
    language_meta[stn_name] = {
      "STN_NM_KOR" : sNames[i].STN_NM,
      "STN_NM_CHC" : sNames[i].STN_NM_CHC,
      "STN_NM_ENG" : sNames[i].STN_NM_ENG,
      "STN_NM_CHN" : sNames[i].STN_NM_CHN,
      "STN_NM_JPN" : sNames[i].STN_NM_JPN
    }
    
  }
//  console.log(sNames[i].STN_NM);
//  console.log(language_meta[stn_name]);
}

//console.log(language_meta['건대입구'].STN_NM_KOR);
//console.log(STATION_NM);


//console.log(typeof language_meta[location_meta[1].STATION_NM].STN_NM_KOR);
//console.log(location_meta[1].STATION_NM);
//console.log(typeof location_meta[1].STATION_NM);


for(var i=0; i < location_meta.length; i++){
//	console.log(language_meta[location_meta[i].STATION_NM].STN_NM_KOR);
//	console.log(location_meta[i].STATION_NM);
}


//메타 병합
var station_meta = new Object();
for(var i=0; i < location_meta.length; i++){
//	console.log(location_meta.length);
//	console.log(language_meta[i]);
//  console.log(location_meta[i].STATION_NM);
  if(location_meta[i].STATION_NM === "총신대입구(이수)"){
    location_meta[i].STATION_NM = "총신대입구";
  }
  else if(location_meta[i].STATION_NM === "쌍용(나사렛대)"){
    location_meta[i].STATION_NM = "쌍용";
  }
  
  
//  if(location_meta[i].STATION_NM !== "광명" && location_meta[i].STATION_NM !== "원흥" && location_meta[i].STATION_NM !== "매탄권선" ){
//	  console.log(language_meta[location_meta[i].STATION_NM]);
//    station_meta[location_meta[i].STATION_NM] = {
//      "STN_NM" : location_meta[i].STATION_NM,
//      "STN_NM_KOR" : language_meta[location_meta[i].STATION_NM].STN_NM_KOR,
//      "STN_NM_CHC" : language_meta[location_meta[i].STATION_NM].STN_NM_CHC,
//      "STN_NM_ENG" : language_meta[location_meta[i].STATION_NM].STN_NM_ENG,
//      "STN_NM_CHN" : language_meta[location_meta[i].STATION_NM].STN_NM_CHN,
//      "STN_NM_JPN" : language_meta[location_meta[i].STATION_NM].STN_NM_JPN,
//      "GEO_X" : location_meta[i].GEO_X,
//      "GEO_Y" : location_meta[i].GEO_Y
//    }
//  }
//  console.log(location_meta[i]);
//  console.log(language_meta[i]);
  
//  if(location_meta[i].STATION_NM !== "광명" && location_meta[i].STATION_NM !== "원흥" && location_meta[i].STATION_NM !== "매탄권선" ){
//	  console.log(location_meta[i]);
	  
    station_meta[location_meta[i].STATION_NM] = {
      "STN_NM" : location_meta[i].STATION_NM,
      "STN_NM_KOR" : language_meta[location_meta[i].STATION_NM] && language_meta[location_meta[i].STATION_NM].STN_NM_KOR,
      "STN_NM_CHC" : language_meta[location_meta[i].STATION_NM] && language_meta[location_meta[i].STATION_NM].STN_NM_CHC,
      "STN_NM_ENG" : language_meta[location_meta[i].STATION_NM] && language_meta[location_meta[i].STATION_NM].STN_NM_ENG,
      "STN_NM_CHN" : language_meta[location_meta[i].STATION_NM] && language_meta[location_meta[i].STATION_NM].STN_NM_CHN,
      "STN_NM_JPN" : language_meta[location_meta[i].STATION_NM] && language_meta[location_meta[i].STATION_NM].STN_NM_JPN,
      "GEO_X" : location_meta[i].GEO_X,
      "GEO_Y" : location_meta[i].GEO_Y
    }
    
//  }
}
//console.log(station_meta);

module.exports = station_meta;


