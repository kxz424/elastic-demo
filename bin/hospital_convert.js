var fs = require('fs');
var parse = require('csv-parse');

//var f1to4 = fs.readFileSync('C:\\Users\\win10\\Downloads\\subway_data\\DDMC_HP.csv', 'utf8');
var f1to4 = fs.readFileSync('/home/jongsang/local/DDMC_HP.csv', 'utf8');

parse(f1to4, {comment:"#"}, function(csv_err, csv_data){
  if (csv_err) {
    return console.log(csv_err);
  }
  
  
   console.log("%j",csv_data[0]);
   console.log("%j",csv_data[1]);
   console.log("%j",csv_data[2]);
  
   
  for(var cd=1; cd< csv_data.length ; cd++){
    var dataIn = csv_data[cd];
    
//    console.log(dataIn[1]);
    
    var ldateTemp = dataIn[6].split('-');
//    console.log(ldateTemp[0]);
    
    var ldate = new Date(ldateTemp[0],Number(ldateTemp[1])-1,Number(ldateTemp[2])+1);
//    console.log(ldate);
      
      
        if(dataIn !== undefined){
        var logs = {
        	"number" : dataIn[0],
        	"classification" : dataIn[1],
        	"hospital_name" : dataIn[2],
        	"domicile_1" : dataIn[3],
        	"domicile_2" : dataIn[4],
        	"tel" : dataIn[5],
        	"time_slot" : ldate
        	
        }
        
      }
        console.log(logs);
        
        var fileName = "n_" + dataIn[0] + ".log";
        var logdata = JSON.stringify(logs)+"\n";
        fs.appendFileSync("data/"+fileName, logdata);
      
  }
      
      
      

    

  


});
