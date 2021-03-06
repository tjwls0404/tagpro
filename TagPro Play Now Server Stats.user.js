// ==UserScript==
// @name       		Play Now Server Stats
// @version    		0.1
// @include      	http://*koalabeast.com/
// @description  	Show stats of current server on Play Now button
// @author        Dr. Holmes
// ==/UserScript==

function getStats(e) {
    n=(new Date).getTime();
    $.ajax({timeout:1e3,dataType:"json",url:"http://"+tagpro.serverHost+"/stats?callback=?",success:function(i){
        i.ping = (new Date).getTime()-n;
        e.find("span").text("Ping: "+i.ping+", Players: "+i.players+(i.playerCapacity?"/"+i.playerCapacity:"")); 
    },error:function(){
        e.find("span").text("error getting stats.");
    }});
}

getStats($('#play'));
