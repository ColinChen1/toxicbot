//Created by Colin Chen
//v0.14

var API_KEY = "8da0a8e6-e1c3-42de-9de3-a770d10636f7";
var API_KEY_LINK = '?api_key=' + API_KEY; 
var urlRank = 'https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/'; 
var urlSumID = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/'; 

var request = require('request'); 

var Discord = require("discord.js");

var mybot = new Discord.Client();

mybot.on("message", function(message){

	var messageArray = (message.content).split(' '); 
	var summonerName = ''; 
	var summonerID = ''; 
	//if(message)
	//if(message.author == )
	if(messageArray[0] == '?player')
		{
			for(i = 1; i < messageArray.length; i++)
			{
				summonerName += messageArray[i];
			}
			request('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summonerName + '?api_key=8da0a8e6-e1c3-42de-9de3-a770d10636f7', function (error, response, body) {
 			 if (!error && response.statusCode == 200) 
 			 {
 			 	 var data = JSON.parse(body); 
 			 	 summonerID = (data[summonerName.toLowerCase()]['id']) + ''; //getting summoner id
 			 	// console.log(summonerID); 

 			 	 request('https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/' + summonerID + '/entry?api_key=8da0a8e6-e1c3-42de-9de3-a770d10636f7', function (error, response, body) {
 			 	 		// ?player command
		 			 if (!error && response.statusCode == 200) {
		 			 	 var data = JSON.parse(body); 
		 			 	 var name = data[summonerID][0]['entries'][0]['playerOrTeamName']; 
		 			 	 var tier = (data[summonerID][0]['tier']); 
		 			 	 var division = (data[summonerID][0]['entries'][0]['division']); //need to traverse array to find kwueef id
		 			 	 var LP = data[summonerID][0]['entries'][0]['leaguePoints']; 
		 			 	 var wins = data[summonerID][0]['entries'][0]['wins']; 
		 			 	 var losses = data[summonerID][0]['entries'][0]['losses'];  
		 			 	 var winrate = (wins/(wins + losses)*100).toFixed(2); 
		 			 	// console.log(winrate); 
		 			 	 mybot.sendMessage(message, name + ' is ' + tier + " " + division + " at " 
		 			 	 	+ LP + " LP with a winrate of " + winrate + "% (" + wins + "W/" + losses + "L)"); 
						  }
						else
						{
							mybot.sendMessage(message, summonerName + " is either unranked, pre-30, doesn't exist, or a 26-3 faggot."); 
						}
					})
			}
		}) 
 


		} 
	if(messageArray[0] == '?help')
	{
		mybot.sendMessage(message, "Hi! Welcome to toxicbot! I only have two commands availible since my developer is a shitty dev!\n\nList of Commands:\n?player [insert summoner name] - Displays ranked information of given summoner.\n?help - Displays the numerous commands availible to your disposal."); 
	}
});

mybot.login("colinchen1526@gmail.com", "iloveleague");