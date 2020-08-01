const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "환영합니다";
const byeChannelName = "수고하셨습니다";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "수고하셨습니다..";

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

  if(message.content == '연희야') {
    return message.reply('"!도움말" 치시고 명령어 확인해주세요');
  }});
  
  client.on('message', (message) => {
    if(message.author.bot) return;
  
    if(message.content == '연희야 뭐해?') {
      return message.reply('상메 보셈');
    }});

      client.on('message', (message) => {
        if(message.author.bot) return;
      
        if(message.content == '연희야 사랑해') {
          return message.reply('ㅇㅇ');
        }});

        client.on('message', (message) => {
          if(message.author.bot) return;
        
          if(message.content == '연희야 페르마의마지막정리를 설명해봐') {
            return message.reply('타원곡선 y^2=x(x-a^n)(x+b^n) 꼴로 변형했을때 L=(s,E) L=(s,F) 인 보형 형식 F가 존재하지않으므로 모순이 발생 즉 해가없다.(**됐냐? 컄퉤**)');
          }});

          client.on('message', (message) => {
            if(message.author.bot) return;
          
            if(message.content == '연희야 뭐해') {
              return message.reply('상메나 쳐봐라 뭐하는지 나온다야');
            }});

            client.on('message', (message) => {
              if(message.author.bot) return;
              
              if(message.content == '연희야 시발') {
                return message.reply('ㅗ');
              }});
  
                client.on('message', (message) => {
                  if(message.author.bot) return;
                
                  if(message.content == '연희야 바보') {
                    return message.reply('닌 얼마나 천제인지 보자**(함수 f(x) 는 x^4 - 3x^2 + 8 에 대하여 미분f(2)의 값을 구하시오)**');
                  }});

                  client.on('message', (message) => {
                    if(message.author.bot) return;
                  
                    if(message.content == '연희야 머리딸리죠') {
                      return message.reply('닌 얼마나 천제인지 보자**(함수 f(x) 는 x^4 - 3x^2 + 8 에 대하여 미분f(2)의 값을 구하시오)**')
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
  } else if(message.content == '!도움말') {
    let helpImg = 'https://media.discordapp.net/attachments/736223021362053161/736792334896726156/preview.png?width=681&height=681';
    let commandList = [
      {name: '!도움말', desc: '명령어 도움말'},
      {name: 'ping', desc: '현재 핑 상태'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
      {name: '!전체공지2', desc: 'dm으로 전체 embed 형식으로 공지 보내기'},
      {name: '!청소', desc: '텍스트 지움'},
      {name: '!초대코드', desc: '해당 채널의 초대 코드 표기'},
      {name: '!초대코드2', desc: '봇 운영자 전용'},
    ];
    let commandStr = '연희';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 연희 BOT', helpImg)
      .setColor('#186de6')
      .setThumbnail('https://ifh.cc/g/lKywFI.jpg')
      .setFooter(`연희 BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  } else if(message.content == '!초대코드2') {
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
  } else if(message.content == '!초대코드') {
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
  } else if(message.content.startsWith('!전체공지2')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지2'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('공지 of 연희 BOT','https://ifh.cc/g/lKywFI.jpg')
        .setColor('#186de6')
        .setThumbnail('https://ifh.cc/g/lKywFI.jpg')
        .setFooter(`연희 BOT ❤️`)
        .setTimestamp()
  
      embed.addField('공지: ', contents);
  
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('!전체공지')) {
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
  } else if(message.content.startsWith('!청소')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @연희 3
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

  if (message.content.startsWith('mbti 등록 ')) {
    var reg_mbti = message.content.split(' ');
 
    //type
    var type = 16;
    var input_mbti = reg_mbti[2].toUpperCase();
    for(var i=0; i<16; i++) {
      if (mbti[i] == input_mbti) {
        type = i;
        break;
      }
    }
    if(type == 16){
      message.channel.send("실패!");
    }else {
 
      //json to Array
      var data = fs.readFileSync('./user_list.json', 'utf8');
      var user_list_arr = JSON.parse(data);
 
      //search
      var j = -1;
      for(var k=0; k<user_list_arr.length; k++) {
        if (user_list_arr[k].user_id == message.member.user.id) {
          j = k;
          break;
        }
      }
 
      //patch or push
      if (j == -1) {
        var user_list = new Object();
        user_list.user_id = msg.member.user.id;
        user_list.username = msg.member.user.username;
        user_list.mbti  = type;
        user_list_arr.push(user_list);
      } else {
        user_list_arr[j].username = msg.member.user.username;
        user_list_arr[j].mbti  = type;
      }
 
      //Array to json
      data = JSON.stringify(user_list_arr);
      fs.writeFileSync('./user_list.json', data, 'utf8');
 
      message.channel.send("성공!");
    }
  }
 
  if (message.content.startsWith('mbti 궁합')) {
    var comp_mbti = message.content.split(' ');
 
    //json to Array
    var data = fs.readFileSync('./user_list.json', 'utf8');
    var user_list_arr = JSON.parse(data);
 
    //search user 1
    var user_1 = "";
    if (comp_mbti[2] === undefined) {
      user_1 = "";
    } else {
      user_1 = comp_mbti[2].replace(/[^0-9]/g,'');
    }
 
    var user1type = 16;
    var user1name = "";
    for(var k=0; k<user_list_arr.length; k++) {
      if (user_list_arr[k].user_id == user_1) {
        user1type = user_list_arr[k].mbti;
        user1name = user_list_arr[k].username;
        break;
      }
    }
 
    //search user 2
    var user_2 = "";
    if (comp_mbti[3] === undefined) {
      user_2 = msg.member.user.id;
    } else if (comp_mbti[3] == "") {
      comp_mbti[3] = comp_mbti[4]; //중간에 띄어쓰기가 한 번 더 들어간 경우에도 정상적인 처리를 위해서
      user_2 = comp_mbti[3].replace(/[^0-9]/g,'');
    } else {
      user_2 = comp_mbti[3].replace(/[^0-9]/g,'');
    }
 
    var user2type = 16;
    var user2name = "";
    for(var k=0; k<user_list_arr.length; k++) {
      if (user_list_arr[k].user_id == user_2) {
        user2type = user_list_arr[k].mbti;
        user2name = user_list_arr[k].username;
        break;
      }
    }
 
    //result
    if (user1type == 16 || user2type == 16) {
      message.channel.send(noresultEmbed);
    } else{
 
      if (user2type > user1type) {
        [user1type, user2type] = [user2type, user1type];
      }
 
      var result = mbtiR[user1type][user2type];
 
      var explain_text1 = " 와(과) ";
      var explain_text2 = " 의 궁합";
 
      var resultEmbed = new Discord.MessageEmbed()
          .setColor('#0099FF')
          .setTitle(user1name.concat(explain_text1,user2name,explain_text2))
        .addField('결과', result, true)
          .setFooter('Powered by node.js  Made by M4ndU', '');
 
      msg.channel.send(resultEmbed);
 
    }
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

client.login(token);