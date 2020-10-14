const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;

client.on('ready', () => {
  console.log('켰다.');
  client.user.setActivity('모든 문의는 DM ', { type: 'STREAMING', url: 'https://www.twitch.tv/faker'})
});

    client.on('message', msg => {
      if (msg.channel.type === 'dm') return
      if(msg.content == 'A/도움말') {
      let helpImg = 'https://cdn.discordapp.com/attachments/736223021362053161/764062967594876928/faffd7d68d48b6be.jpg';
      let commandList = [
        {name: 'A/도움말', desc: '명령어 도움말'},
        {name: 'A/관리자공지', desc: 'dm으로 전체 embed 형식으로 공지 보내기'},
        {name: 'A/청소', desc: '텍스트 지움'},
        {name: 'A/경고 확인 (닉네임)', desc: '플레이어의 경고를 확인함'},
        {name: 'A/경고 설정 (닉네임) (변수)', desc: '플레이어의 경고를 설정함함'},
        {name: 'A/경고 삭제 (닉네임) (변수)', desc: '플레이어의 경고를 삭제함'},
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
      if(msg.content.startsWith('A/관리자공지')) {
      if(!checkPermission(msg)) return;
      if(msg.member != null) { // 채널에서 공지 쓸 때
        let contents = msg.content.slice('-y/관리자공지'.length);
        let embed = new Discord.MessageEmbed()
        .setAuthor('공지 BOT','https://ifh.cc/g/b1QNMh.jpg')
        .setColor('#00e1ff')
        .setThumbnail('https://ifh.cc/g/b1QNMh.jpg')
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
      if(msg.content.startsWith('A/청소')) {
      if(msg.channel.type == 'dm') {
        return msg.reply('dm에서 사용할 수 없는 명령어 입니다.');
      }
      
      if(!checkPermission(msg)) return;
    
      var clearLine = msg.content.slice('A/청소 '.length);
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

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);