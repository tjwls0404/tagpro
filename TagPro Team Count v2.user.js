// ==UserScript==
// @name          TagPro Team Count v2
// @namespace     Dr. Holmes
// @description   Adds team count next to switch/joined/left message
// @include       http://tagpro-*.koalabeast.com*
// @include       http://tangent.jukejuice.com* 
// @include       http://maptest.newcompte.fr* 
// @author        Dr. Holmes
// @version       2.1
// ==/UserScript==

tagpro.ready(function(){
    var prettyTextOriginal = tagpro.prettyText;
    
    tagpro.prettyText = function(e,t,n,r,s,o,u) {
        if ((e.search("has switched to the") + e.search("has joined the") + e.search("left the")) > -3){
            e=e.replace("team.","team: ");
            e=e + teamCount();
        }
        return prettyTextOriginal(e,t,n,r,s,o,u);
    }
});
             
function teamCount(){
	var ball;
   	var team;
    var red = 0;
    var blue = 0;
    
	for (ball in tagpro.players){
		if (tagpro.players[ball].team == 1){
			red += 1;
		}
		else if (tagpro.players[ball].team == 2){
			blue += 1;
        	}
	}
    
    team = adjustForTeam(red, blue, team);
    return team;
}

function adjustForTeam(red, blue, team){
    if (tagpro.players[tagpro.playerId].team == 1){
        team = "["+red+" v "+blue+"]";
    } else if (tagpro.players[tagpro.playerId].team == 2){
        team = "["+blue+" v "+red+"]";
    }
    return team;
}
