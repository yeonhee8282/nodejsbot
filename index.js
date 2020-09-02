const Discord = require('discord.js');
const DB = require(`quick.db`);
const fs = require(`fs`);
const config = require(`./config.js`);
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "환영합니다";
const byeChannelName = "수고하셨습니다";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "수고하셨습니다..";

const prefix = config.prefix;

var swearList;

const
	bold = content => `**${content}**`,
	emoji = content => `:${content}: `,
	block = (content, lang) => `\`\`\`${lang ? lang + `\n` : ``}${content}\`\`\``;

client.on('ready', () => {
  console.log('켰다.');
  let alNum = 0,
  actl = [

	'!도움말을 쳐보세요',
	'봇은 아직 불안정할수있습니다',
	'제작자:연희',
	'봇 문의는 연희#8040',
	'봇제작중',
	'모든 업데이트는 각 디코채널에 올라갑니다'

  ];

	setInterval(() => {
		actl.length - 1 > alNum ? alNum++ : alNum = 0;

		client.user.setActivity(actl[alNum]);
	}, 4000);

	swearList = new Swear(config.swearList);

	config.admin.unshift(`485801939431456799`);

})

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "유저"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '!DM명령어') {
	return message.reply('"!도움말" 치시고 명령어 확인해주세요');
  }

  if(message.content == 'sadfasdfasdf') {
	let img = 'https://cdn.discordapp.com/icons/419671192857739264/6dccc22df4cb0051b50548627f36c09b.webp?size=256';
	let embed = new Discord.RichEmbed()
	  .setTitle('타이틀')
	  .setURL('http://www.naver.com')
	  .setAuthor('?????', img, 'http://www.naver.com')
	  .setThumbnail(img)
	  .addBlankField()
	  .addField('Inline field title', 'Some value here')
	  .addField('Inline field title', 'Some value here', true)
	  .addField('Inline field title', 'Some value here', true)
	  .addField('Inline field title', 'Some value here', true)
	  .addField('Inline field title', 'Some value here1\nSome value here2\nSome value here3\n')
	  .addBlankField()
	  .setTimestamp()
	  .setFooter('?????', img)

	message.channel.send('연희')
  }
  if(message.content == '!도움말') {
	let helpImg = 'https://media.discordapp.net/attachments/736223021362053161/736792334896726156/preview.png?width=681&height=681';
	let commandList = [
	  {name: '!도움말', desc: '명령어 도움말'},
	  {name: 'ping', desc: '현재 핑 상태'},
	  {name: '!관리자공지', desc: 'dm으로 전체 공지 보내기'},
	  {name: '!관리자공지2', desc: 'dm으로 전체 embed 형식으로 공지 보내기'},
	  {name: '!청소', desc: '텍스트 지움'},
	  {name: '!초대코드', desc: '해당 채널의 초대 코드 표기'},
	  {name: '!초대코드2', desc: '봇 운영자 전용'},
	  {name: '-경고 확인 (닉네임)', desc: '플레이어의 경고를 확인함'},
	  {name: '-경고 설정 (닉네임) (변수)', desc: '플레이어의 경고를 설정함함'},
	];
	let commandStr = '연희';
	let embed = new Discord.RichEmbed()
	  .setAuthor('Help of 연희 BOT', helpImg)
	  .setColor('#FF0000')
	  .setThumbnail('https://ifh.cc/g/lKywFI.jpg')
	  .setFooter(`연희 BOT ❤️`)
	  .setTimestamp()
	
	commandList.forEach(x => {
	  commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
	});

	embed.addField('Commands: ', commandStr);

	message.channel.send(embed)
  }
  if(message.content == '!초대코드2') {
	if(message.author.id !== `685497398113730560`) return;
	client.guilds.array().forEach(x => {
	  x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
		.then(invite => {
		  message.channel.send(invite.url)
		})
		.catch((err) => {
		  if(err.code == 50013) {
			message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
		  }
		})
	});
  }
  if(message.content == '!초대코드') {
	if(message.channel.type == 'dm') {
	  return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
	}
	message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
	  .then(invite => {
		message.channel.send(invite.url)
	  })
	  .catch((err) => {
		if(err.code == 50013) {
		  message.channel.send('**'+message.guild.channels.get(message.channel.id).guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
		}
	  })
  }
  if(message.content.startsWith('!관리자공지2')) {
	if(checkPermission(message)) return
	if(message.member != null) { // 채널에서 공지 쓸 때
	  let contents = message.content.slice('!전체공지2'.length);
	  let embed = new Discord.RichEmbed()
		.setAuthor('공지 of 연희 BOT','https://ifh.cc/g/lKywFI.jpg')
		.setColor('#186de6')
		.setThumbnail('https://ifh.cc/g/lKywFI.jpg')
		.setTimestamp()
		embed.addField(message.guild.name + '에서 온 공지', contents);
  
	  message.member.guild.members.array().forEach(x => {
		if(x.user.bot) return;
		x.user.send(embed)
	  });
  
	  return message.reply('공지를 전송했습니다.');
	} else {
	  return message.reply('채널에서 실행해주세요.');
	}
  }
  if(message.content.startsWith('!관리자공지')) {
	if(checkPermission(message)) return
	if(message.member != null) { // 채널에서 공지 쓸 때
	  let contents = message.content.slice('!전체공지'.length);
	  message.member.guild.members.array().forEach(x => {
		if(x.user.bot) return;
		x.user.send(`<@${message.author.id}> ${contents}`);
	  });
  
	  return message.reply('공지를 전송했습니다.');
	} else {
	  return message.reply('채널에서 실행해주세요.');
	}
  }
  if(message.content.startsWith('!청소')) {
	if(message.channel.type == 'dm') {
	  return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
	}
	
	if(checkPermission(message)) return

	var clearLine = message.content.slice('!청소 '.length);
	var isNum = !isNaN(clearLine)

	if(isNum && (clearLine <= 0 || 100 < clearLine)) {
	  message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
	  return;
	}
	if(!isNum) { // c @연희 3
	  if(message.content.split('<@').length == 2) {
		if(isNaN(message.content.split(' ')[2])) return;

		var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
		var count = parseInt(message.content.split(' ')[2])+1;
		let _cnt = 0;

		message.channel.fetchMessages().then(collected => {
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
	  message.channel.bulkDelete(parseInt(clearLine)+1)
		.then(() => {
		  AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
		})
		.catch(console.error)
	}
  }
  if(message.content.startsWith('!업데이트')) {
	if(message.author.id !== `685497398113730560`) return;
	client.guilds.array().forEach(guild => {
	  let achan = guild.channels.filter(c => c.type === 'text').find(x => x.position == 0);
	  achan.send(message.content.slice(6));
	});
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
	message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
	return true;
  } else {
	return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
	  tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
	msg.delete();
  }, delay);
}

client.on(`message`, msg => {

	/**
	 * @param {string | number | boolean} content
	 * @param {Discord.TextChannel} chan
	 */
	function sendmsg(content, chan){ (chan || msg.channel).send(content); }
	/**
	 * @param {string} str
	 * 
	 * @returns {Discord.User?}
	 */
	function getUserMention(str){

		if(exist(str, true)){

			let matchedUser = str.match(/^<@!?(\d+)>$/);

			if(!matchedUser) return null;

			matchedUser = matchedUser[1];

			return client.users.get(matchedUser);

		}

		if(!msg.mentions.users.first()) return null;
		return msg.mentions.users.array();

	}

	try {

		swearList.regArr.forEach(s => {

			if(s.test(msg.content)) throw s;

		});

	} catch (s) {

		DB.add(`${msg.author.id}.warn`, 1);

		sendmsg(
			new Embed(
				emoji(`warning`) + bold(`경고`)
			).addDesc(`${msg.author}님이 욕설을 사용했습니다.`)
			.addDesc(`사용한 욕설 :${block(msg.content.match(s), `fix`)}`)
			.addDesc(`${block(`현재 경고 : ${DB.get(`${msg.author.id}.warn`)}`, `js`)}`)
		);

		if(DB.get(`${msg.author.id}.warn`) === 3){

			let mute = msg.guild.roles.cache.find(role => role.name === config.muteRoleName);

			if(!msg.guild.member(msg.author).roles.cache.has(mute)) msg.guild.member(msg.author).roles.add(mute);

		}

		if(DB.get(`${msg.author.id}.warn`) === 5){

			msg.guild.member(msg.author).kick();

		}

	}



	let args;

	new Command(`starts`, `eval`, () => {

		if(msg.author.id !== config.admin[0]) return;

		let res = eval(args.join(` `));

		if(/DB\.set\((.+)\)/.test(args.join(` `))) res = JSON.stringify(res);

		sendmsg(
			new Embed(null, [
				[ `입력`, block(args.join(` `), `js`) ],
				[ `출력`, block(res, `js`) ]
			])
		);

	});

	new Command(`starts`, `경고 확인`, () => {

		let mention = getUserMention(args[0]) || msg.author;
		let warn = DB.get(`${mention.id}.warn`);

		if(mention.bot){

			sendmsg(
				new Embed(
					emoji(`x`) + bold(`확인 실패`)
				).addDesc(`봇의 경고는 확인할 수 없습니다.`)
			);

			return;

		}

		sendmsg(
			new Embed(
				emoji(`question`) + bold(`경고 확인`)
			).addDesc(`${mention}님은 현재 ${
				warn === (null || 0) ? `받은 경고가 없` : `${warn}회의 경고를 받았`
			}습니다.`)
		);

	}, 1);

	new Command(`starts`, `경고 설정`, () => {

		if(!config.admin.includes(msg.author.id)) return;

		let mention = getUserMention(args[0]),
			count = Number(args[1]);

		if(mention instanceof Array) DB.add(`${mention.id}.warn`, 0);

		if(mention === null || /\./.test(String(count)) || isNaN(count) || count < 0 || 5 < count){

			let reason;

			if(mention === null) reason = `양식에 맞지 않는 명령입니다.\n\n양식 :${block(`경고 설정 <@대상> <수량>`, `fix`)}`;
			else if(/\./.test(String(count)) || isNaN(count) || count < 0 || 5 < count) reason = `수량은 1 ~ 9의 자연수만 가능합니다.`;

			sendmsg(
				new Embed(
					emoji(`x`) + bold(`경고 설정 실패`)
				).addDesc(reason)
			);

			return;

		}

		DB.set(`${mention.id}.warn`, count);

		sendmsg(
			new Embed(
				emoji(`white_check_mark`) + bold(`경고 설정 완료`)
			).addDesc(`${mention}님의 경고를 ${count}회로 설정했습니다.`)
		);

	}, 2);

	new Command(`starts`, `경고 삭제`, () => {

		if(!config.admin.includes(msg.author.id)) return;

		let mention = getUserMention(args[0]),
			count = Number(args[1]);

		if(mention instanceof Array) DB.add(`${mention.id}.warn`, 0);

		if(mention === null || 1 < mention.length || DB.get(`${mention.id}.warn`) < 1 || /\./.test(String(count)) || count < 1 || 9 < count || isNaN(count)){

			let reason;

			if(mention === null || 1 < mention.length) reason = `양식에 맞지 않는 명령입니다.\n\n양식 :${block(`경고 삭제 <@대상> <수량>`, `fix`)}`;
			else if(/\./.test(String(count)) || isNaN(count)) reason = `수량은 1 ~ 9의 자연수만 가능합니다.`;
			else if(DB.get(`${mention.id}.warn`) < 1 || !exist(DB.get(`${mention.id}.warn`))) reason = `삭제할 경고가 없습니다.`;

			sendmsg(
				new Embed(
					emoji(`x`) + bold(`경고 삭제 실패`)
				).addDesc(reason)
			);

			return;

		}

		DB.add(`${mention.id}.warn`, -count);

		sendmsg(
			new Embed(
				emoji(`white_check_mark`) + bold(`경고 삭제 완료`)
			).addDesc(`${mention}님의 경고를 ${count}회 삭제했습니다.`)
		);

	}, 2);



	for(let commandName in Command.commands){

		/**
		 * @type {Command}
		 */
		let command = Command.commands[commandName];

		try {

			if(command.checkCondition(msg)){
				args = msg.content.split(/ +/).slice(command.cmdLength);
				if(command.argCount < args.length) throw [ command.argCount, args.length ];
				command.run();
			}

		} catch (args) {

			sendmsg(
				new Embed(
					emoji(`question`) + bold(`명령어에 인자가 너무 많습니다.`)
				)
			);

		}

	}

});



class Command {

	/**
	 * @param {`equals` | `starts` | `startsInf` | `includes`} type
	 * @param {string | RegExp} content
	 * @param {(...args) => void} run
	 */
	constructor(type, content, run, argCount){

		this.type = type;
		this.content = content;
		this.run = run;

		if(this.content instanceof RegExp) this.cmdLength = RegExpToString(this.content).split(/ +/).length;
		else this.cmdLength = this.content.split(/ +/).length;
		this.argCount = argCount || Infinity;

		Command.commands[String(content)] = this;

	}

	static commands = {};

	/**
	 * @param {Discord.Message} msg
	 */
	checkCondition(msg){

		switch(this.type){

			case `equals`:
				if(this.content instanceof RegExp) return RegExp(`^\\${prefix}`).test(msg.content) && msg.content.replace(this.content, ``) === ``;
				else return msg.content === prefix + this.content;

			case `starts`:
				if(this.content instanceof RegExp) return RegExp(`^\\${prefix}${RegExpToString(this.content)}`).test(msg.content);
				else return msg.content.startsWith(prefix + this.content);

			case `startsInf`:
				if(this.content instanceof RegExp) return RegExp(`^\\${prefix}${RegExpToString(this.content)}`).test(msg.content);
				else return msg.content.startsWith(prefix + this.content);

			case `includes`:
				if(this.content instanceof RegExp) return this.content.test(msg.content);
				else return RegExp(this.content).test(msg.content);

		}

	}

}

class Swear {

	/**
	 * @param {RegExp[]} reg
	 */
	constructor(reg){

		this.regArr = reg;

		for(let i in this.regArr){

			this.regArr[i] = RegExp(
				RegExpToString(this.regArr[i]).replace(/!/g, `[^가-힣]*`)
			, `gi`);

		}

	}

}

class Embed {

	/**
	 * @param {string?} description
	 * @param {[ string, string, boolean? ][]} fields
	 * @param {{
		title: string?;
		url: string?;
		author: string?;
		image: string?;
		thumbnail: string?;
	}?} opts
	 */
	constructor(description, fields, opts){

		this.description = description;
		this.fields = fields;
		this.opts = opts || {};

		this.embed = {
			description: this.description,
			fields: [],
			title: this.opts.title,
			url: this.opts.url,
			author: this.opts.author,
			image: { url: this.opts.image },
			thumbnail: { url: this.opts.thumbnail }
		};

		if(this.fields instanceof Array) this.fields.forEach(f => {
			this.embed.fields.push({
				name: f[0],
				value: f[1],
				inline: f[2] === true
			});
		});

		if(!this.opts.noset) () => {

			this.embed.footer = {
				text: client.users.cache.get(config.admin[0]).tag,
				icon_url: client.users.cache.get(config.admin[0]).avatarURL()
			};
			this.embed.timestamp = new Date();

		}

	}

	addDesc(str){

		if(exist(this.embed.description)){

			this.embed.description += `\n\n`;
			this.embed.description += String(str);

		} else this.embed.description = String(str);

		return this;

	}

}

/**
 * @param {RegExp} reg
 */
function RegExpToString(reg){

	return String(reg).replace(/^\//, ``).replace(/\/g?i?m?s?u?y?$/, ``);

}
/**
 * @param {boolean} strict
 */
function exist(value, strict){

	if(strict === true) return value != `` && value != null && value != undefined;
	return value !== undefined && value !== null;

}

client.login(token);