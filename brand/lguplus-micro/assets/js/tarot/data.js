const keywordList = [
  // 직장
  {
    id: '0',
    keyword: '슬기로운 직장생활',
    category: 'work',
    categoryReactVid: 'STEP3_01_01_work',
    cardList: [
      {
        name: 'the star',
        mean: '희망<span>/</span>동경',
        desc:
          '이 카드는 <b>희망과 노력</b>을 상징하는 <b>별 카드</b>입니다. 직장 생활 쉽지 않죠? 열심히 한 만큼, 대가는 반드시 돌아오겠네요. 곧 <b>별과 같은 희망이 찾아올 예정</b>입니다.',
        relativeService: null,
        reaction: 1,
        voiceFile: 'STEP5_01_work-STAR'
      },
      {
        name: 'justice',
        mean: '균형<span>/</span>정당함',
        desc:
          '이 카드는 <b>균형</b>을 상징하는 카드입니다. <b>직장생활과 일상의 균형</b>이 필요한 시기군요. 너무 무리하지 말고 <b>워라밸</b>을 지키기 위한 노력이 필요해 보입니다.',
        relativeService: [1, 2],
        serviceTitle: '퇴근 후 집관으로 워라밸 지키자!',
        reaction: 3,
        voiceFile: 'STEP5_02_work-JUSTICE-1'
      }
    ]
  },
  {
    id: '1',
    keyword: '일잘하는법',
    category: 'work',
    categoryReactVid: 'STEP3_01_01_work',
    cardList: [
      {
        name: 'the star',
        mean: '희망<span>/</span>동경',
        desc:
          '이 카드는 <b>희망과 노력</b>을 상징하는 <b>별 카드</b>입니다. 직장 생활 쉽지 않죠? 열심히 한 만큼, 대가는 반드시 돌아오겠네요. 곧 <b>별과 같은 희망이 찾아올 예정</b>입니다.',
        relativeService: null,
        reaction: 1,
        voiceFile: 'STEP5_01_work-STAR'
      },
      {
        name: 'justice',
        mean: '균형<span>/</span>정당함',
        desc:
          '이 카드는 <b>균형</b>을 상징하는 카드입니다. <b>직장생활과 일상의 균형</b>이 필요한 시기군요. 너무 무리하지 말고 <b>워라밸</b>을 지키기 위한 노력이 필요해 보입니다.',
        relativeService: [1, 2],
        serviceTitle: '퇴근 후 집관으로 워라밸 지키자!',
        reaction: 3,
        voiceFile: 'STEP5_02_work-JUSTICE-1'
      }
    ]
  },
  {
    id: '2',
    keyword: '퇴사 할까 말까',
    category: 'work',
    categoryReactVid: 'STEP3_01_02_work',
    cardList: [
      {
        name: 'justice',
        mean: '결정<span>/</span>정당함',
        desc:
          '당신은 현재 <b>결정</b>의 순간에 놓여 있군요. 지금 당신에게 필요한 건 <b>신중함</b>이네요. 퇴사를 고민중이라면 먼저 <b>확실한 대안</b>을 마련하는 것이 필요해보입니다.',
        relativeService: null,
        reaction: 3,
        voiceFile: 'STEP5_03_work-JUSTICE-2'
      },
      {
        name: 'the hierophant',
        mean: '관대함<span>/</span>조언',
        desc:
          '교황 카드는 <b>멘토</b>를 의미합니다. 현재 <b>퇴사에 대한 고민을 함께 나눌 만한</b> 멘토가 필요합니다. 믿을 만한 멘토에게 <b>조언</b>을 얻어보세요.',
        relativeService: [0],
        serviceTitle: '넷플릭스에 나의 멘토가 있지 않을까?',
        reaction: 3,
        voiceFile: 'STEP5_04_work-HIEROPHANT'
      }
    ]
  },
  {
    id: '3',
    keyword: '이직하면어떨까',
    category: 'work',
    categoryReactVid: 'STEP3_01_02_work',
    cardList: [
      {
        name: 'justice',
        mean: '결정<span>/</span>정당함',
        desc:
          '당신은 현재 <b>결정</b>의 순간에 놓여 있군요. 지금 당신에게 필요한 건 <b>신중함</b>이네요. 퇴사를 고민중이라면 먼저 <b>확실한 대안</b>을 마련하는 것이 필요해보입니다.',
        relativeService: null,
        reaction: 3,
        voiceFile: 'STEP5_03_work-JUSTICE-2'
      },
      {
        name: 'the hierophant',
        mean: '관대함<span>/</span>조언',
        desc:
          '교황 카드는 <b>멘토</b>를 의미합니다. 현재 <b>퇴사에 대한 고민을 함께 나눌 만한</b> 멘토가 필요합니다. 믿을 만한 멘토에게 <b>조언</b>을 얻어보세요.',
        relativeService: [0],
        serviceTitle: '넷플릭스에 나의 멘토가 있지 않을까?',
        reaction: 3,
        voiceFile: 'STEP5_04_work-HIEROPHANT'
      }
    ]
  },
  {
    id: '4',
    keyword: '취업은 언제쯤',
    category: 'work',
    categoryReactVid: 'STEP3_01_03_work',
    cardList: [
      {
        name: 'the sun',
        mean: '밝은 미래<span>/</span>만족',
        desc:
          '카드 속 <b>밝게 빛나는 태양</b>이 보이시죠? 매우 <b>긍정적인 의미</b>를 가진 카드입니다. 혹시 취업 준비 중이라면 <b>곧 좋은 소식</b>이 올 것 같네요.',
        relativeService: null,
        reaction: 1,
        voiceFile: 'STEP5_05_work-SUN'
      },
      {
        name: 'the chariot',
        mean: '전진<span>/</span>승리',
        desc:
          '취업난에 지친 당신에게 꼭 필요한 카드를 뽑았군요. 전쟁에서 필요한 건 <b>용기와 자신감</b>입니다. 원하는 회사를 향해 계속 나아간다면, <b>승리</b>를 이끌 수 있습니다.',
        relativeService: [3],
        serviceTitle: '취준 스트레스는 게임으로 날리자!',
        reaction: 4,
        voiceFile: 'STEP5_06_work-CHARIOT'
      }
    ]
  },
  //   펫
  {
    id: '5',
    keyword: '반려동물과의 궁합',
    category: 'pet',
    categoryReactVid: 'STEP3_01_04_pet',
    cardList: [
      {
        name: 'the lovers',
        mean: '연애<span>/</span>쾌락',
        desc:
          '이 카드는 <b>연인 카드</b>입니다. 당신은 반려동물과 <b>눈빛만 봐도 통하는 연인 같은 사이</b>군요. 사랑하는 만큼 더 오래오래 옆에 있길 바라고 있네요.',
        relativeService: [4],
        serviceTitle: '반려동물 혼자 두기 걱정된다면 팻케어!',
        reaction: 1,
        voiceFile: 'STEP5_07_pet-LOVERS'
      },
      {
        name: 'the sun',
        mean: '밝은 미래<span>/</span>만족',
        desc:
          '긍정적인 카드입니다. 당신과 반려동물은 <b>서로 믿고 의지하는 사이</b>군요. 함께 할 수록 <b>서로에게 좋은 기운</b>을 주고 있습니다.',
        relativeService: [6],
        serviceTitle: '반려동물과 함께 한다면 펫플러스!',
        reaction: 1,
        voiceFile: 'STEP5_08_pet-SUN'
      }
    ]
  },
  {
    id: '6',
    keyword: '반려동물마음사로잡기',
    category: 'pet',
    categoryReactVid: 'STEP3_01_04_pet',
    cardList: [
      {
        name: 'the lovers',
        mean: '연애<span>/</span>쾌락',
        desc:
          '이 카드는 <b>연인 카드</b>입니다. 당신은 반려동물과 <b>눈빛만 봐도 통하는 연인 같은 사이</b>군요. 사랑하는 만큼 더 오래오래 옆에 있길 바라고 있네요.',
        relativeService: [4],
        serviceTitle: '반려동물 혼자 두기 걱정된다면 팻케어!',
        reaction: 1,
        voiceFile: 'STEP5_07_pet-LOVERS'
      },
      {
        name: 'the sun',
        mean: '밝은 미래<span>/</span>만족',
        desc:
          '긍정적인 카드입니다. 당신과 반려동물은 <b>서로 믿고 의지하는 사이</b>군요. 함께 할 수록 <b>서로에게 좋은 기운</b>을 주고 있습니다.',
        relativeService: [6],
        serviceTitle: '반려동물과 함께 한다면 펫플러스!',
        reaction: 1,
        voiceFile: 'STEP5_08_pet-SUN'
      }
    ]
  },
  //   자녀
  {
    id: '7',
    keyword: '우리 아이 진로',
    category: 'parenting',
    categoryReactVid: 'STEP3_01_05_parenting',
    cardList: [
      {
        name: 'the hierophant',
        mean: '관대함<span>/</span>조언',
        desc:
          '교황 카드는 <b>멘토</b>를 의미합니다. 지금 <b>아이에게 필요한 건 멘토같은 존재</b>입니다. 잔소리 대신 <b>진심 어린 조언과 응원</b>이 필요해요.',
        relativeService: [12, 13],
        serviceTitle: 'VR/AR로 아이들과 추억 만들자!',
        reaction: 3,
        voiceFile: 'STEP5_09_parenting-HIEROPHANT'
      },
      {
        name: 'the sun',
        mean: '밝은 미래<span>/</span>만족',
        desc:
          '이 카드는 <b>밝은 미래</b>를 의미합니다. 아이에게 튼튼한 말, 밝은 태양과 같은 <b>긍정의 힘</b>을 주세요. 아이는 <b>스스로 자신의 진로를 찾아</b> 나아갈 것입니다.',
        relativeService: null,
        reaction: 4,
        voiceFile: 'STEP5_10_parenting-SUN'
      }
    ]
  },
  {
    id: '8',
    keyword: '육아고민',
    category: 'parenting',
    categoryReactVid: 'STEP3_01_06_parenting',
    cardList: [
      {
        name: 'the high priestess',
        mean: '지식<span>/</span>총명',
        desc:
          '<b>지혜로운 여사제</b> 카드를 뽑았군요. 당신은 자녀 교육에 관심이 많은 만큼 <b>고민도 많습니다.</b> 제3자의 도움을 받아 <b>지혜롭게 대처</b>하세요.',
        relativeService: [7],
        serviceTitle: '육아 고민은 아이들나라로 덜자!',
        reaction: 3,
        voiceFile: 'STEP5_11_parenting-HIGH_PRIESTESS'
      },
      {
        name: 'the emperor',
        mean: '책임<span>/</span>부성',
        desc:
          '황제 카드는 <b>책임</b>을 의미합니다. 당신은 부모라는 왕관의 무게를 잘 견디고 있군요. 하지만 <b>당근과 채찍에 대한 고민</b>도 많아 보입니다.',
        relativeService: [8],
        serviceTitle: '육아에 그렇게 좋다고 하던데..',
        reaction: 3,
        voiceFile: 'STEP5_12_parenting-EMPEROR'
      }
    ]
  },
  //   연애
  {
    id: '9',
    keyword: '솔로탈출',
    category: 'love',
    categoryReactVid: 'STEP3_01_09_love',
    cardList: [
      {
        name: 'the fool',
        mean: '자유',
        desc:
          '당신은 <b>자유를 만끽하고 있는 중</b>이군요. 외로울 때도 있지만 이 자유가 싫지만은 않습니다. 자유를 만끽하다 보면 <b>새로운 인연이 찾아올 겁니다.</b>',
        relativeService: [0],
        serviceTitle: '솔로 생활은 넷플리스와 함께!',
        reaction: 3,
        voiceFile: 'STEP5_13_love-FOOL'
      },
      {
        name: 'the chariot',
        mean: '승리<span>/</span>쟁취',
        desc:
          '이 카드는 <b>적극적</b>인 의미를 담은 전차카드 입니다. 당신의 연인은 <b>의외로 가까운 곳</b>에 있네요. <b>주변을 적극적으로 살펴</b> 사랑을 쟁취하세요.',
        relativeService: null,
        reaction: 1,
        voiceFile: 'STEP5_14_love-CHARIOT'
      }
    ]
  },
  {
    id: '10',
    keyword: '연인 궁합',
    category: 'love',
    categoryReactVid: 'STEP3_01_10_love',
    cardList: [
      {
        name: 'the lovers',
        mean: '연애<span>/</span>쾌락',
        desc:
          '<b>연애 기운</b>이 아주 좋은 카드입니다. 다만, <b>서로의 마음을 더 살펴 볼 필요</b>가 있겠네요. 애정 표현이든, 서운함이든 <b>솔직하게 표현하는 게 중요</b>해 보입니다.',
        relativeService: [3],
        serviceTitle: '연인은 게임 앞에서 솔직해지는 법!',
        reaction: 1,
        voiceFile: 'STEP5_15_love-LOVERS'
      },
      {
        name: 'temperance',
        mean: '중용<span>/</span>절제',
        desc:
          '이 카드는 <b>어디에도 치우치지 않으려는 절제</b>를 의미합니다. 사랑하는 만큼 <b>서로의 입장을 바꿔 생각해보려는 자세</b>가 필요해 보입니다.',
        relativeService: null,
        reaction: 2,
        voiceFile: 'STEP5_16_love-TEMPERANCE'
      }
    ]
  },
  {
    id: '11',
    keyword: '이별극복',
    category: 'love',
    categoryReactVid: 'STEP3_01_11_love',
    cardList: [
      {
        name: 'the sun',
        mean: '밝은 미래<span>/</span>만족',
        desc:
          '이 카드에 보이는 태양 의미는 <b>밝은 미래</b> 입니다. 이별의 아픔을 잊게 해줄 <b>더 좋은 날들이 기다리고 있을 거에요</b>',
        relativeService: null,
        reaction: 4,
        voiceFile: 'STEP5_17_love-SUN'
      },
      {
        name: 'the fool',
        mean: '자유<span>/</span>모험',
        desc:
          '이 카드의 의미는 <b>자유와 모험</b>입니다. 그 동안 연애하느라 구속 받았다면 이제는 <b>자유로운 시간을 만끽하세요</b>',
        relativeService: null,
        reaction: 1,
        voiceFile: 'STEP5_18_love-FOOL'
      }
    ]
  },
  //   금전
  {
    id: '12',
    keyword: '언제 부자 될까',
    category: 'money',
    categoryReactVid: 'STEP3_01_12_money',
    cardList: [
      {
        name: 'temperance',
        mean: '절제<span>/</span>관리',
        desc:
          '이 카드는 <b>절제와 관리</b>를 의미합니다. 수입에 비해 <b>지출이 많은 편</b>이네요. 쓰기 전에 <b>꼭 필요한 지출인지 한 번 더 확인</b> 해 볼 필요가 있습니다.',
        relativeService: [9],
        serviceTitle: '사장님한테 진짜 좋은 서비스인데..',
        reaction: 3,
        voiceFile: 'STEP5_19_money-TEMPERANCE'
      },
      {
        name: 'the star',
        mean: '긍정<span>/</span>희망',
        desc:
          '카드는 긍정적입니다. 하지만, <b>금전적인 면에서 너무 긍정적이라 문제</b>가 되는 카드에요. 돈 쓰는 일에 관대한만큼, <b>알게 모르게 새는 돈이 많습니다.</b>',
        relativeService: [11],
        serviceTitle: '돈 아끼는 지름길은 결합 할인부터!',
        reaction: 3,
        voiceFile: 'STEP5_20_money-STAR'
      }
    ]
  },
  {
    id: '13',
    keyword: '나의금전운',
    category: 'money',
    categoryReactVid: 'STEP3_01_12_money',
    cardList: [
      {
        name: 'temperance',
        mean: '절제<span>/</span>관리',
        desc:
          '이 카드는 <b>절제와 관리</b>를 의미합니다. 수입에 비해 <b>지출이 많은 편</b>이네요. 쓰기 전에 <b>꼭 필요한 지출인지 한 번 더 확인</b> 해 볼 필요가 있습니다.',
        relativeService: [9],
        serviceTitle: '사장님한테 진짜 좋은 서비스인데..',
        reaction: 3,
        voiceFile: 'STEP5_19_money-TEMPERANCE'
      },
      {
        name: 'the star',
        mean: '긍정<span>/</span>희망',
        desc:
          '카드는 긍정적입니다. 하지만, <b>금전적인 면에서 너무 긍정적이라 문제</b>가 되는 카드에요. 돈 쓰는 일에 관대한만큼, <b>알게 모르게 새는 돈이 많습니다.</b>',
        relativeService: [11],
        serviceTitle: '돈 아끼는 지름길은 결합 할인부터!',
        reaction: 3,
        voiceFile: 'STEP5_20_money-STAR'
      }
    ]
  },
  //   일상
  {
    id: '14',
    keyword: '자취생활',
    category: 'daily',
    categoryReactVid: 'STEP3_01_13_daily',
    cardList: [
      {
        name: 'the moon',
        mean: '불안<span>/</span>혼돈',
        desc:
          '달 카드는 <b>불안</b>을 의미합니다. 자취하고 처음은 즐거웠는데, 요즘은 <b>걱정이 많으시네요.</b> 방심하지 말고 <b>미리 대비할 필요</b>가 있어 보입니다.',
        relativeService: [5],
        serviceTitle: '나 대신 우리집 지켜주는 지킴이!',
        reaction: 3,
        voiceFile: 'STEP5_21_daily-MOON'
      },
      {
        name: 'temperance',
        mean: '절제<span>/</span>관리',
        desc:
          '이 카드는 <b>절제와 관리</b>를 상징합니다. 집 청소 한 지가 꽤 되신 것 같네요. 혼자 사는 만큼 <b>적절한 절제와 규칙이 필요</b>해보입니다.',
        relativeService: null,
        reaction: 3,
        voiceFile: 'STEP5_22_daily-TEMPERANCE'
      }
    ]
  },
  {
    id: '15',
    keyword: '주말에 뭐하지',
    category: 'daily',
    categoryReactVid: 'STEP3_01_14_daily',
    cardList: [
      {
        name: 'the fool',
        mean: '자유<span>/</span>모험',
        desc:
          '이 카드는 자유를 의미해요. 뒤에 파도는 역동적인 움직임을 나타냅니다. 몸의 활력을 불어넣으면 좋은 일이 생길 겁니다. 지금 당장 움직이세요!',
        relativeService: [10],
        serviceTitle: '밖에 나가기 무섭다면 집에서 홈트하자!',
        reaction: 3,
        voiceFile: 'STEP5_23_daily-FOOL'
      },
      {
        name: 'the magician',
        mean: '창조<span>/</span>수완',
        desc:
          '현재 당신 앞에 <b>다양한 선택지</b>가 있군요. 하지만 시도하는 데 <b>주저함</b>이 있어 보입니다. <b>새로운 것에 과감하게 도전할 필요</b>가 있겠어요.',
        relativeService: [0],
        serviceTitle: '새로운 드라마 도전은 넷플릭스에서!',
        reaction: 3,
        voiceFile: 'STEP5_24_daily-MAGICIAN'
      }
    ]
  },
  {
    id: '16',

    keyword: '요즘너무심심해요',
    category: 'daily',
    categoryReactVid: 'STEP3_01_14_daily',

    cardList: [
      {
        name: 'the fool',
        mean: '자유<span>/</span>모험',
        desc:
          '이 카드는 자유를 의미해요. 뒤에 파도는 역동적인 움직임을 나타냅니다. 몸의 활력을 불어넣으면 좋은 일이 생길 겁니다. 지금 당장 움직이세요!',
        relativeService: [10],
        serviceTitle: '밖에 나가기 무섭다면 집에서 홈트하자!',
        reaction: 3,
        voiceFile: 'STEP5_23_daily-FOOL'
      },
      {
        name: 'the magician',
        mean: '창조<span>/</span>수완',
        desc:
          '현재 당신 앞에 <b>다양한 선택지</b>가 있군요. 하지만 시도하는 데 <b>주저함</b>이 있어 보입니다. <b>새로운 것에 과감하게 도전할 필요</b>가 있겠어요.',
        relativeService: [0],
        serviceTitle: '새로운 드라마 도전은 넷플릭스에서!',
        reaction: 3,
        voiceFile: 'STEP5_24_daily-MAGICIAN'
      }
    ]
  },
  //   건강
  {
    id: '17',
    keyword: '나의건강운',
    category: 'health',
    categoryReactVid: 'STEP3_01_08_health',
    cardList: [
      {
        name: 'wheel of fortune',
        mean: '순환<span>/</span>반복<span>/</span>운명',
        desc:
          '수레바퀴 카드는 <b>순환</b>과 반복을 의미합니다. 혹시 몸의 순환을 놓치고 있진 않나요? <b>틈틈이 몸을 풀어 줄 필요</b>가 있겠네요.',
        relativeService: [10],
        serviceTitle: '스마~트하게 집에서 운동 해볼래?',
        reaction: 2,
        voiceFile: 'STEP5_25_health-WHEEL_OF_FORTUNE'
      },
      {
        name: 'strength',
        mean: '힘<span>/</span>용기',
        desc:
          '요즘 <b>스트레스</b>가 많으시군요. 마음을 편하게 가져보세요. 건강을 위해서라도 <b>스트레스를 해소하려는 노력</b>이 필요해 보입니다.',
        relativeService: [3],
        serviceTitle: '스트레스 푸는 데는 게임이 직빵이지',
        reaction: 3,
        voiceFile: 'STEP5_26_health-STRENGTH'
      }
    ]
  },
  //   인간관계
  {
    id: '18',
    keyword: '인간관계힘든이유',
    category: 'social',
    categoryReactVid: 'STEP3_01_07_social',
    cardList: [
      {
        name: 'justice',
        mean: '균형<span>/</span>정당함',
        desc:
          '이 카드에 보이는 저울은 <b>균형</b>을 의미해요. 그 동안 다른 사람들의 말에 이리저리 휘둘렸다면 이제 <b>내 감정과 목소리에 귀기울여보세요</b>',
        relativeService: null,
        reaction: 2,
        voiceFile: 'STEP5_27_social-JUSTICE'
      },
      {
        name: 'the fool',
        mean: '자유<span>/</span>모험',
        desc:
          '이 카드의 의미는 <b>자유</b>입니다. 지금까지 당신을 힘들게 했던 <b>관계를 끊고 자유로워지는 것</b>을 의미합니다.',
        relativeService: [0],
        serviceTitle: '내 마음 알아주는 컨텐츠는 넷플릭스에서!',
        reaction: 3,
        voiceFile: 'STEP5_28_social-FOOL'
      }
    ]
  },
  {
    id: '19',
    keyword: '인간관계현타',
    category: 'social',
    categoryReactVid: 'STEP3_01_07_social',
    cardList: [
      {
        name: 'justice',
        mean: '균형<span>/</span>정당함',
        desc:
          '이 카드에 보이는 저울은 <b>균형</b>을 의미해요. 그 동안 다른 사람들의 말에 이리저리 휘둘렸다면 이제 <b>내 감정과 목소리에 귀기울여보세요</b>',
        relativeService: null,
        reaction: 2,
        voiceFile: 'STEP5_27_social-JUSTICE'
      },
      {
        name: 'the fool',
        mean: '자유<span>/</span>모험',
        desc:
          '이 카드의 의미는 <b>자유</b>입니다. 지금까지 당신을 힘들게 했던 <b>관계를 끊고 자유로워지는 것</b>을 의미합니다.',
        relativeService: [0],
        serviceTitle: '내 마음 알아주는 컨텐츠는 넷플릭스에서!',
        reaction: 3,
        voiceFile: 'STEP5_28_social-FOOL'
      }
    ]
  }
]
const giftList = {
  stardabang: {
    name: 'stardabang',
    mean: '커피',
    desc:
      '별 다방 카드를 뽑으셨군요. 요즘 고민이 많은 <b>‘당신에게 필요한 건, 커피 한 잔의 여유’라는 뜻입니다.</b>',
    reaction: 1,
    relativeService: null,
    voiceFile: 'STEP5_32_gift-COFFEE'
  },
  chineunim: {
    name: 'chineunim',
    mean: '치킨',
    desc:
      '야식 치트키를 뽑으셨군요. 속이 답답할 땐 <b>치킨이 정답</b>이라는 뜻입니다.',
    reaction: 1,
    relativeService: null,
    voiceFile: 'STEP5_31_gift-CHICKEN'
  },
  ice31: {
    name: 'ice31',
    mean: '아이스크림',
    desc:
      '고민을 시원하게 날릴 카드네요. <b>인생은 쓰고 아이스크림은 달다</b>는 뜻입니다.',
    reaction: 1,
    relativeService: null,
    voiceFile: 'STEP5_33_gift-ICE_CREAM'
  }
}
const serviceList = [
  {
    title: '5G 넷플릭스팩',
    desc:
      '유플러스 고객이라면 넷플릭스를 마음껏 즐길 수 있는 U+5G 요금제 (넷플릭스 베이식 제공)',
    link: 'https://bit.ly/3seWVhO'
  },
  {
    title: 'U+ 프로야구',
    desc:
      '원하는 위치와 장면을 선명히 확대하고 돌려보는 유플러스 만의 프로야구 앱 (모든 통신사 이용가능)',
    link: 'https://bit.ly/35oHmuj'
  },
  {
    title: 'U+ 골프',
    desc:
      '생생한 스윙장면부터 입체중계까지, TV 중계보다 재미있는 유플러스만의 골프중계 앱 (모든 통신사 이용가능)',
    link: 'https://bit.ly/38x7Go7'
  },
  {
    title: '지포스나우 클라우드게임',
    desc:
      '400여 개의 최신/인기 PC게임을 모바일/PC/TV를 넘나들며 자유롭게 플레이 할 수 있는 제휴 서비스 (U+고객은 베이직 월정액 무료, 프리미엄 월정액 50% 할인)',
    link: 'https://bit.ly/3oxZnOj'
  },
  {
    title: '펫케어',
    desc:
      '우리집 반려동물의 건강과 안전을 지켜주는 유플러스만의 펫케어 패키지 (맘카, 원격급식기, 간식로봇)',
    link: 'https://bit.ly/3oC4z3y'
  },
  {
    title: '우리집 지킴이 Easy',
    desc:
      '내가 직접 설치하여, 손쉽게 우리집을 지키고, 보험까지 한번에 제공해주는 유플러스만의 패키지 (맘카 Easy, 동작감지센서, 도어센서)',
    link: 'https://bit.ly/3nvDcqv'
  },
  {
    title: '펫플러스',
    desc:
      '반려동물을 키우는 가족을 위한 전용 혜택을 받을 수 있는 유플러스만의 결합 상품',
    link: 'https://bit.ly/3ozbWZM'
  },
  {
    title: '아이들나라',
    desc: '우리 아이의 배움 습관을 함께 키우는 국내 최초 맞춤교육 IPTV',
    link: 'https://bit.ly/2XtortR'
  },
  {
    title: 'U+아이들생생도서관',
    desc:
      '세계 유명 출판사의 영어도서를 3D 또는 AR 콘텐츠로 볼 수 있는 유플러스만의 교육 서비스',
    link: 'https://bit.ly/3nxsb8j'
  },
  {
    title: '우리가게 패키지',
    desc:
      '매장에서 필요한 통신상품만 모아 할인 받고 알뜰하게 가입하는 유플러스만의 우리가게 혁신서비스',
    link: 'https://bit.ly/3nxQaUL'
  },
  {
    title: '스마트홈트',
    desc:
      'AI코치에게 실시간 자세 교정을 받으며 집에서도 정확한 자세로 운동할 수 있는 유플러스만의 홈트레이닝 서비스',
    link: 'https://bit.ly/2Xrjce3'
  },
  {
    title: '참 쉬운 가족 결합',
    desc:
      '복잡한 할인 조건, 가입 조건 걱정 없이 가족이 모이면 누구나  할인을 받을 수 있는 가족 결합 상품 (최대 127,600원 할인 / 최대 60GB 공유 데이터)',
    link: 'https://bit.ly/3ot5qDL'
  },
  {
    title: 'U+ VR',
    desc:
      '다양한 VR콘텐츠를 한 곳에 모아 실감나게 즐길 수 있는 유플러스만의 VR서비스',
    link: 'https://bit.ly/35uuJ0D'
  },
  {
    title: 'U+ AR',
    desc:
      '나만의 스타를 실감나게 감상하고 함께 찍은 영상을 공유할 수 있는 유플러스만의 AR서비스',
    link: 'https://bit.ly/3qcIfy7'
  }
]
const nameList = [
  '새라',
  '현식',
  '영수',
  '다림',
  '광동',
  '신현',
  '지철',
  '상수',
  '대현',
  '경혜',
  '경훈',
  '지혜',
  '유진',
  '지영',
  '지은',
  '수진',
  '혜진',
  '지현',
  '민정',
  '지연',
  '민지',
  '지원',
  '수연',
  '현정',
  '은지',
  '은정',
  '소영',
  '수정',
  '수현',
  '은영',
  '선영',
  '현주',
  '소연',
  '민경',
  '은주',
  '정은',
  '주희',
  '서연',
  '지수',
  '지윤',
  '현진',
  '윤정',
  '민주',
  '진희',
  '지민',
  '진영',
  '정민',
  '수민',
  '은경',
  '혜원',
  '주연',
  '서현',
  '혜정',
  '유정',
  '은혜',
  '수빈',
  '은진',
  '주영',
  '혜림',
  '혜영',
  '진아',
  '선미',
  '윤희',
  '정현',
  '효진',
  '소희',
  '미선',
  '희정',
  '지훈',
  '지선',
  '민영',
  '서윤',
  '선희',
  '효정',
  '지우',
  '미영',
  '미정',
  '나영',
  '민희',
  '미진',
  '현지',
  '유리',
  '민서',
  '보경',
  '은희',
  '가영',
  '은미',
  '희진',
  '아영',
  '예진',
  '미경',
  '현아',
  '서영',
  '연주',
  '유미',
  '혜민',
  '주현',
  '정원',
  '수영',
  '소현',
  '정아',
  '수지',
  '유나',
  '경민',
  '지희',
  '도연',
  '승현',
  '다혜',
  '수아',
  '수경',
  '채원',
  '민아',
  '정희',
  '성희',
  '성민',
  '영주',
  '혜미',
  '현우',
  '다영',
  '승희',
  '혜인',
  '지유',
  '소정',
  '예지',
  '경희',
  '준영',
  '재희',
  '연희',
  '지안',
  '지호',
  '정훈',
  '선아',
  '경미',
  '나연',
  '선화',
  '재영',
  '민수',
  '윤서',
  '윤아',
  '진주',
  '세영',
  '현수',
  '동현',
  '보미',
  '연우',
  '소윤',
  '윤주',
  '혜경',
  '영미',
  '영은',
  '유경',
  '경진',
  '규리',
  '정연',
  '정화',
  '유주',
  '지아',
  '시현',
  '현경',
  '예원',
  '유라',
  '진우',
  '혜지',
  '하영',
  '준호',
  '윤미',
  '은아',
  '윤지',
  '혜선',
  '다은',
  '정미',
  '영진',
  '승연',
  '윤경',
  '주아',
  '성현',
  '미연',
  '명국',
  '보라',
  '재현',
  '정윤',
  '세희',
  '시우',
  '미희',
  '혜리',
  '다희',
  '시연',
  '주원',
  '태희',
  '태연',
  '나현',
  '은서',
  '미란',
  '혜란',
  '유림',
  '은선',
  '상현',
  '민선',
  '영민',
  '도희',
  '혜린',
  '미현',
  '민규',
  '미나',
  '하연',
  '혜연',
  '승민',
  '서진',
  '서희',
  '연수',
  '선우',
  '성진',
  '재원',
  '예은',
  '성훈',
  '현준',
  '다연',
  '보영',
  '현희',
  '수미',
  '성은',
  '태영',
  '슬기',
  '시은',
  '희영',
  '현미',
  '민재',
  '준희',
  '재민',
  '아름',
  '우진',
  '세진',
  '나경',
  '경아',
  '소미',
  '수인',
  '도현',
  '승아',
  '나윤',
  '상희',
  '현숙',
  '민성',
  '정우',
  '여진',
  '다인',
  '은수',
  '도경',
  '진호',
  '상민',
  '인영',
  '하나',
  '재훈',
  '선주',
  '미라',
  '다현',
  '채은',
  '민우',
  '예린',
  '민준',
  '연서',
  '아라',
  '희경',
  '혜주',
  '연지',
  '재은',
  '영준',
  '도영',
  '상훈',
  '가은',
  '성호',
  '은숙',
  '경화',
  '정인',
  '하윤',
  '미화',
  '진경',
  '준혁',
  '경은',
  '희원',
  '소율',
  '진선',
  '지인',
  '상미',
  '태경',
  '은비',
  '보람',
  '민호',
  '태현',
  '도윤',
  '희수',
  '가희',
  '선경',
  '명희',
  '지애',
  '성준',
  '연정',
  '효주',
  '윤진',
  '영희',
  '미애',
  '세은',
  '민석',
  '소라',
  '하은',
  '은성',
  '아현',
  '명진',
  '송희',
  '현영',
  '희선',
  '주은',
  '세연',
  '희주',
  '영훈',
  '재인',
  '가연',
  '보민',
  '다정',
  '한나',
  '미소',
  '미숙',
  '태훈',
  '영선',
  '태은',
  '예림',
  '윤영',
  '현서',
  '희연',
  '소은',
  '나은',
  '지환',
  '성우',
  '은채',
  '효선',
  '유빈',
  '정수',
  '호영',
  '현민',
  '동훈',
  '수희',
  '정호',
  '종현',
  '은하',
  '성원',
  '연아',
  '지숙',
  '소진',
  '진수',
  '혜수',
  '현석',
  '예나',
  '성미',
  '승훈'
]
const nameCharismaList = [
  '지훈',
  '현우',
  '정훈',
  '민수',
  '동현',
  '진우',
  '준호',
  '성현',
  '명국',
  '재현',
  '상현',
  '민규',
  '성진',
  '성훈',
  '현준',
  '재민',
  '우진',
  '도현',
  '민성',
  '정우',
  '진호',
  '상민',
  '재훈',
  '민우',
  '민준',
  '영준',
  '상훈',
  '성호',
  '준혁',
  '민호',
  '태현',
  '성준',
  '민석',
  '영훈',
  '태훈',
  '성우',
  '동훈',
  '정호',
  '종현',
  '현석',
  '승훈'
]

export { keywordList, giftList, serviceList, nameList, nameCharismaList }
