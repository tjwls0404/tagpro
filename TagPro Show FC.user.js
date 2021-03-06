// ==UserScript==
// @name          TagPro Show FC
// @namespace     Dr. Holmes
// @description   Shows friendly FC next to the flag icon.
// @include		  http://tagpro-*.koalabeast.com:*
// @include		  http://tangent.jukejuice.com:*
// @include       http://*.newcompte.fr:*
// @author        Dr. Holmes
// @version       0.1
// ==/UserScript==

tagpro.ready(function(){
	var tr = tagpro.renderer,
		players = tagpro.players,
		redTeam = 1,
		blueTeam = 2,
		text = null,
        textPos = {x:0,y:0};
    
    function getPos() {
        if (players[tagpro.playerId].team == redTeam){
            var flag = tagpro.ui.sprites.blueFlag;
            textPos.x = flag.x;
            textPos.y = flag.y;
        }
        else {
            var flag = tagpro.ui.sprites.redFlag;
            textPos.x = flag.x;
            textPos.y = flag.y;
        }
    }
    
	tagpro.socket.on('sound', function(message){
		var sound = message.s;
		
		if (sound == 'friendlyalert'){
            setTimeout(function(){
                var fc;
                
                for (p in players){
                    if (players[p].team == players[tagpro.playerId].team){
	                    if (players[p].flag){
	                        fc = players[p].name;
	                    }
                    }
                }
                
                getPos();
                
                text = tr.prettyText(fc);
                text.x = textPos.x;
                text.y = textPos.y;
                
                tr.layers.ui.addChild(text);
            }, 100);
		}
		else if (sound == 'friendlydrop' || sound == 'cheering'){
			if (text != null){
				tr.layers.ui.removeChild(text);
			}
		}
	});
});
		
		
