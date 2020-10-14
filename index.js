const Discord = require('discord.js');
//const fs = require(`fs`);
const client = new Discord.Client();
//const token = process.env.token;
const token = process.env.token;

client.on('ready', () => {
    console.log('켰다.');
    client.user.setActivity('모든 문의는 DM ', { type: 'STREAMING', url: 'https://www.twitch.tv/faker'})
  });

client.on('message', msg => {
  if (msg.channel.type === 'dm') return
  if(msg.content == 'R!도움말') {
	let helpImg = 'https://media.discordapp.net/attachments/738391539348144219/764698433503494154/16023887027965544997531929285966.jpg';
	let commandList = [
	  {name: 'R!도움말', desc: '명령어 도움말'},
	  {name: 'R!관리자공지', desc: 'dm으로 전체 embed 형식으로 공지 보내기'},
	  {name: 'R!청소', desc: '텍스트 지움'},
	];
	let commandStr = '연희';
	let embed = new Discord.MessageEmbed()
	  .setAuthor('Help of 연희 BOT', helpImg)
	  .setColor('#FF0000')
	  .setThumbnail('https://ifh.cc/g/ZkCGzN.jpg')
	  .setFooter(`연희 BOT ❤️`)
	  .setTimestamp()
	
	commandList.forEach(x => {
	  commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
	});

	embed.addField('Commands: ', commandStr);

	msg.channel.send(embed)
  }
  if(msg.content.startsWith('R!관리자공지')) {
	if(!checkPermission(msg)) return;
	if(msg.member != null) { // 채널에서 공지 쓸 때
	  let contents = msg.content.slice('-R!관리자공지'.length);
	  let embed = new Discord.MessageEmbed()
		.setAuthor('Rocket SHOP')
		.setColor('#00e1ff')
		.setThumbnail('Rocket SHOP')
		.setTimestamp()
		embed.addField(msg.guild.name + '```에서 온 공지```', contents);
  
	  msg.member.guild.members.cache.array().forEach(x => {
		if(x.user.bot) return;
		x.user.send(embed)
	  });
  
	  return msg.reply('공지를 전송했습니다.');
	} else {
	  return msg.reply('채널에서 실행해주세요.');
	}
  }
  if(msg.content.startsWith('R!청소')) {
	if(msg.channel.type == 'dm') {
	  return msg.reply('dm에서 사용할 수 없는 명령어 입니다.');
	}
	
	if(!checkPermission(msg)) return;

	var clearLine = msg.content.slice('R!청소 '.length);
	var isNum = !isNaN(clearLine)

	if(isNum && (clearLine <= 0 || 100 < clearLine)) {
	  msg.channel.send("1부터 100까지의 숫자만 입력해주세요.")
	  return;
	}
	if(!isNum) { // c @연희 3
	  if(msg.content.split('<@').length == 2) {
		if(isNaN(msg.content.split(' ')[2])) return;

		var user = msg.content.split(' ')[1].split('<@!')[1].split('>')[0];
		var count = parseInt(msg.content.split(' ')[2])+1;
		let _cnt = 0;

		msg.channel.msgs.fetch().then(collected => {
		  collected.every(msg => {
			if(msg.author.id == user) {
			  msg.delete();
			  ++_cnt;
			}
			return !(_cnt == count);
		  });
		});
	  }
	} else {
	  msg.channel.bulkDelete(parseInt(clearLine)+1)
		.then(() => {
		  AutoMsgDelete(msg, `<@${msg.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
		})
		.catch(console.error)
	}
  }
  if(msg.content.startsWith('A/업데이트')) {
	if(msg.author.id !== `685497398113730560`) return;
	client.guilds.cache.forEach(guild => {
		let achan = guild.channels.cache.filter(c => c.type === 'text').find(x => x.name.includes('봇공지'));
		if(achan){ 
		  achan.send(msg.content.slice(6));
		} else { 
		  achan = guild.channels.cache.filter(c => c.type === 'text').find(x => x.position == 0);
		  achan.send(msg.content.slice(6));
		}
	});
  }
});

function checkPermission(msg) {
	const perm = msg.member.permissions.has("ADMINISTRATOR") || msg.author.id == `685497398113730560`;
	if(!perm) msg.channel.send(msg.author + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
	return perm;
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
	  tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(msg, str, delay = 3000) {
  let message = await msg.channel.send(str);

  setTimeout(() => {
	message.delete();
  }, delay);
}



client.login(token);