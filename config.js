module.exports = {

	prefix: `-`, // 접두사

	admin: [ // 사용자 id(문자열)

		`685497398113730560`

	],

	muteRoleName: `mute`, // 뮤트 역할 이름

	swearList: [ // 욕설 정규식들

		// 그렇게까지 할 필요는 없잖아..

		/tl*qk+f*/,
		/tlq/,
		/(sl)?do+(a|q)l?/,
		/(qh|wk)wl/,
		/(cls|r(o|p)|f)s(us|ha)/,
		/se+x/,
		/t(o|p)r+tm/,
		/tor?!(r(l|i))?(di(d|k)*)?/,

		/(ㅅ|ㅆ)!ㅂ/,
		/(시|씨)(ㅣ|ㅇ|[^가-힣])*(발|벌|(바|버)((아|ㅇ|ㅏ|)*(ㄹ?|알|얼)))/,
		/ㅂ!ㅅ/,
		/(병|븅|빙|벼(어|ㅇ|ㅓ)*엉?|뷰(우|ㅇ|ㅜ)*웅?|비(이|ㅇ|ㅣ)*잉?)!(신|진|싄|즨)/,
		/십|씹/,
		/애!(미|비)/,
		/(보|자)!지/,
		/(친|개|게|발|벌|알|얼|ㄹ)!(년|놈)/,
		/(섹|섻|쉑|쉓|쎅|쎽|쎾|쎇|쎿|쒝|쒞|쒟)!(쓰|스|으|ㅅ|ㅇ|ㅡ)*/,
		/ㄴㄷ+ㅌ/,
		/(새|섀|쌔|썌|세|셰|쎄|쎼)!(기|끼|((ㄱ|ㄲ)?(이|ㅇ|ㅣ)*)|꺄)/,
		/(색|쌕|샊|쌖|섹|쎅|셲|쎾)!(기|끼)?(야(아|ㅇ|ㅏ)*)?/

	]

};