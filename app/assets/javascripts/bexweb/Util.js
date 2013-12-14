function Util(){

}

Util.timeValidator = function(value,sep){
	var time = "";
	var min = "";
	var sec = "";

	if (!value || value.length<1) {return false;}
	if (sep = typeof sep == 'undefined'){
		value = value.substring(value.length - 6,6);
		//console.log("value = " + value);
		time = value.substring(0,2);
		min = value.substring(4,2);
		sec = value.substring(4);
	}else{
		var time = inputStr.split(sep);
		if (!time.length === 3){return false;}
		time = time[0];
		min = time[1];
		sec = time[2];	
	}
	
    return parseInt(time,10)>=0 
           && parseInt(time,10)<=23 
           && parseInt(min,10)>=0 
           && parseInt(min,10)<=59
           && parseInt(sec,10)>=0 
           && parseInt(sec,10)<=59;
}

Util.urlValidator = function(str,shouldHttps) {
  var pattern = new RegExp('^(http?:\/\/)?'+ // protocol
    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
    '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
    '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
    '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
    '(\#[-a-z\d_]*)?$','i'); // fragment locater
  if(!pattern.test(str)) {
    return false;
  }
  return true;
}

Util.addZero = function(value){
   
   if(value<10){
        value = "0" + value;
    }
    return value;
}

Util.dateFormatFromHumamRealiableFormat = function(humanRealiableFormatDate){
  var name = humanRealiableFormatDate.toString();
  var mydate = new Date(
      name.substr(0,4),
      name.substr(4,2),
      name.substr(6,2),
      name.substr(8,2),
      name.substr(10,2),
      name.substr(12,2)
    );
  return [
      Util.addZero(
        mydate.getHours()),
      Util.addZero(
        mydate.getMinutes()),
      Util.addZero(
        mydate.getSeconds())
    ].join(":");
}

Util.dateFormatFromTimestamp = function(timestampDate){
  var mydate = new Date(timestampDate);
  return [
      Util.addZero(
        mydate.getHours()),
      Util.addZero(
        mydate.getMinutes()),
      Util.addZero(
        mydate.getSeconds())
    ].join(":");
}