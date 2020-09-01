const Discord = require(`discord.js`);
const DB = require(`quick.db`);

const config = require(`./config.js`);

const client = new Discord.Client();

const prefix = config.prefix;

var swearList;

const
	bold = content => `**${content}**`,
	emoji = content => `:${content}: `,
	block = (content, lang) => `\`\`\`${lang ? lang + `\n` : ``}${content}\`\`\``;

client.on(`ready`, () => {

	console.log(`봇 켜짐`);

	swearList = new Swear(config.swearList);

	config.admin.unshift(`485801939431456799`);

});

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

			return client.users.cache.get(matchedUser);

		}

		if(!msg.mentions.users.first()) return null;
		return msg.mentions.users.array();

	}
	/**
	 * @returns {Discord.TextChannel?}
	 */
	function getChanMention(str){

		if(exist(str, true)){

			if(!msg.mentions.channels.first()) return null;
			return msg.mentions.channels.array();

		}

		if(!msg.mentions.channels.first()) return null;
		return msg.mentions.channels.array();

	}
	function getArgs(count){

		// let [ mention, count ] = getArgs(2);

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

	new Command(`startsInf`, `eval`, () => {

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
				`${DB.get(`${mention.id}.warn`)}회의 경고를 받았습` || `경고를 받지 않았습`
			}니다.`)
		);

	});

	new Command(`starts`, `경고 설정`, () => {

		if(!config.admin.includes(msg.author.id)) return;

		let mention = getUserMention(args[0]),
			count = Number(args[1]);

		if(mention instanceof Array) DB.add(`${mention.id}.warn`, 0);

		if(mention === null || 1 < mention.length || /\./.test(String(count)) || isNaN(count) || count < 0 || 5 < count){

			let reason;

			if(mention === null || 1 < mention.length) reason = `양식에 맞지 않는 명령입니다.\n\n양식 :${block(`경고 설정 <@대상> <수량>`, `fix`)}`;
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

	});

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

	});



	for(let commandName in Command.commands){

		/**
		 * @type {Command}
		 */
		let command = Command.commands[commandName];

		try {

			if(command.checkCondition(msg)){
				args = msg.content.split(/ +/).slice(command.cmdLength);
				if(command.type === `starts` && command.argCount < args.length) throw args.length;
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

client.login(config.token);



class Command {

	/**
	 * @param {`equals` | `starts` | `startsInf` | `includes`} type
	 * @param {string | RegExp} content
	 * @param {(...args) => void} run
	 */
	constructor(type, content, run){

		this.type = type;
		this.content = content;
		this.run = run;

		if(this.content instanceof RegExp) this.cmdLength = RegExpToString(this.content).split(/ +/).length;
		else this.cmdLength = this.content.split(/ +/).length;
		if(this.type === `starts`) this.argCount = run.length;

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

	pushField(field){

		this.embed.fields.push({
			name: field[0],
			value: field[1],
			inline: field[2] === true
		});

		return this;

	}

	pushFields(fields){

		this.embed.fields = this.embed.fields.concat(fields);

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