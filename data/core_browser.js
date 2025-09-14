// 한양조씨 족보앱 Core Module V3.0 - 브라우저용
// 브라우저 환경에서 직접 사용할 수 있는 데이터

// 실제 노션 데이터 (155명 완전 데이터 - 검색 인덱스 포함)
const CORE_DATA = {
  "persons": [
    {
      "id": "G3M001S",
      "name": "조영하",
      "displayName": "조영하",
      "generation": 3,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "미확인",
      "relationships": {
        "father": "조병희",
        "mother": "민혜숙",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조병희-민혜숙의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G3F002S",
      "name": "조명하",
      "displayName": "조명하",
      "generation": 3,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "미확인",
      "relationships": {
        "father": "조병희",
        "mother": "민혜숙",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조병희-민혜숙의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M003S",
      "name": "조세희",
      "displayName": "조세희",
      "generation": 5,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성호",
        "mother": "조명숙",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성호-조명숙의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F004S",
      "name": "한지영",
      "displayName": "한지영",
      "generation": 5,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "한성택",
        "mother": "조성덕",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성덕-한성택의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F005S",
      "name": "박초희",
      "displayName": "박초희",
      "generation": 5,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "이현섭"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "이현섭의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M006S",
      "name": "임동���",
      "displayName": "임동���",
      "generation": 5,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "이정연"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "이정연의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F007S",
      "name": "조성순",
      "displayName": "조성순",
      "generation": 4,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조강하",
        "mother": "전흥선",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조강하-전흥선의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1987
      }
    },
    {
      "id": "G6F008S",
      "name": "류지민",
      "displayName": "류지민",
      "generation": 6,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "김희진",
        "mother": "류현민",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "김희진-류현민의 딸\n",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 2021
      }
    },
    {
      "id": "G6M009S",
      "name": "권민우",
      "displayName": "권민우",
      "generation": 6,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "권바",
        "mother": "미확인",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "권바의 아들, 2023년생(2세)",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 2023
      }
    },
    {
      "id": "G6F010S",
      "name": "류지안",
      "displayName": "류지안",
      "generation": 6,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "김희진",
        "mother": "류현민",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "김희진-류현민의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 2018
      }
    },
    {
      "id": "G6F011S",
      "name": "김태란",
      "displayName": "김태란",
      "generation": 6,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "김윤형",
        "mother": "김승우",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "김윤형의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 2018
      }
    },
    {
      "id": "G6F012S",
      "name": "신이솔",
      "displayName": "신이솔",
      "generation": 6,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "김희수",
        "mother": "신유석",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "김희수-신유석의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 2020
      }
    },
    {
      "id": "G5F013S",
      "name": "조수정",
      "displayName": "조수정",
      "generation": 5,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조은상",
        "mother": "변주란",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조은상-변주란의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1997
      }
    },
    {
      "id": "G5F014S",
      "name": "김민재",
      "displayName": "김민재",
      "generation": 5,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조광희"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조광희의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1982
      }
    },
    {
      "id": "G5M015S",
      "name": "권바",
      "displayName": "권바",
      "generation": 5,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조원상",
        "mother": "배문경",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조원상-배문경의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1986
      }
    },
    {
      "id": "G5F016S",
      "name": "조윤경",
      "displayName": "조윤경",
      "generation": 5,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성희",
        "mother": "미확인",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성원-박선영의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1990
      }
    },
    {
      "id": "G5F017S",
      "name": "조수경",
      "displayName": "조수경",
      "generation": 5,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성희",
        "mother": "미확인",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성원-박성영의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1998
      }
    },
    {
      "id": "G5M018S",
      "name": "조광희",
      "displayName": "조광희",
      "generation": 5,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조은상",
        "mother": "변주란",
        "spouses": [
          "김민재"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조은상-변주란의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1990
      }
    },
    {
      "id": "G5F019S",
      "name": "전혜영",
      "displayName": "전혜영",
      "generation": 5,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "전승재",
        "mother": "조야영",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "전승재-조야영의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1988
      }
    },
    {
      "id": "G5M020S",
      "name": "전종일",
      "displayName": "전종일",
      "generation": 5,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "전승재",
        "mother": "조야영",
        "spouses": [
          "이민수"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "전승재-조야영의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1995
      }
    },
    {
      "id": "G5M021S",
      "name": "조용희",
      "displayName": "조용희",
      "generation": 5,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조원상",
        "mother": "배문경",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조원상-배문경의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1997
      }
    },
    {
      "id": "G5M022S",
      "name": "손안세",
      "displayName": "손안세",
      "generation": 5,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성원",
        "mother": "박선영",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조윤형의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F023S",
      "name": "이민수",
      "displayName": "이민수",
      "generation": 5,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "전종일"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "전종일의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F024S",
      "name": "조율희",
      "displayName": "조율희",
      "generation": 5,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조원상",
        "mother": "배문경",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조원상-배문경의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1988
      }
    },
    {
      "id": "G5M025S",
      "name": "강달호",
      "displayName": "강달호",
      "generation": 5,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "장정란"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "장정란의 부",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F026S",
      "name": "김희수",
      "displayName": "김희수",
      "generation": 5,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "김명진",
        "mother": "조성희",
        "spouses": [
          "신유석"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "김명진의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1989
      }
    },
    {
      "id": "G5M027S",
      "name": "김승우",
      "displayName": "김승우",
      "generation": 5,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "김윤형"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "김윤형의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1978
      }
    },
    {
      "id": "G5M028S",
      "name": "강동민",
      "displayName": "강동민",
      "generation": 5,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "강달호",
        "mother": "장정란",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "장정란-강달호의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F029S",
      "name": "김윤형",
      "displayName": "김윤형",
      "generation": 5,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "김명진",
        "mother": "조성희",
        "spouses": [
          "김승우"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "김명진의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1984
      }
    },
    {
      "id": "G5M030S",
      "name": "류현민",
      "displayName": "류현민",
      "generation": 5,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "김희진"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "김희진의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1989
      }
    },
    {
      "id": "G5F031S",
      "name": "장정란",
      "displayName": "장정란",
      "generation": 5,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조명진",
        "mother": "장학용",
        "spouses": [
          "강달호"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조명진-장학용의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M032S",
      "name": "강동욱",
      "displayName": "강동욱",
      "generation": 5,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "강달호",
        "mother": "장정란",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "장정란-강달호의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M033S",
      "name": "신유석",
      "displayName": "신유석",
      "generation": 5,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "김희수"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "김희수의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1983
      }
    },
    {
      "id": "G5F034S",
      "name": "김희진",
      "displayName": "김희진",
      "generation": 5,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "김명진",
        "mother": "조성희",
        "spouses": [
          "류현민"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "김명진 조성희의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1989
      }
    },
    {
      "id": "G5M035S",
      "name": "양종원",
      "displayName": "양종원",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조윤희"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조윤희의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1962
      }
    },
    {
      "id": "G5M036S",
      "name": "장바우",
      "displayName": "장바우",
      "generation": 5,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조명진",
        "mother": "조명진",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "장해경-이선이의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M037S",
      "name": "한지훈",
      "displayName": "한지훈",
      "generation": 5,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "한성택",
        "mother": "조성덕",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성덕-한성택의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F038S",
      "name": "이선이",
      "displayName": "이선이",
      "generation": 5,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "장해경"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "장해경의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M039S",
      "name": "이현섭",
      "displayName": "이현섭",
      "generation": 5,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "이원근",
        "mother": "조성실",
        "spouses": [
          "박초희"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성실 이원근의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M040S",
      "name": "장해경",
      "displayName": "장해경",
      "generation": 5,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조명진",
        "mother": "장학용",
        "spouses": [
          "이선이"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조명진-장학용의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F041S",
      "name": "한지혜",
      "displayName": "한지혜",
      "generation": 5,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "한성택",
        "mother": "조성덕",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성덕-한성택의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F042S",
      "name": "조윤희",
      "displayName": "조윤희",
      "generation": 5,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성용",
        "mother": "정복선",
        "spouses": [
          "양종원"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성용-정복선의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1989
      }
    },
    {
      "id": "G5M043S",
      "name": "이정연",
      "displayName": "이정연",
      "generation": 5,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성실",
        "mother": "조성실",
        "spouses": [
          "임동민"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성실-이원근의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M044S",
      "name": "장일우",
      "displayName": "장일우",
      "generation": 5,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조명진",
        "mother": "장학용",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "장해경-이선이의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M045S",
      "name": "유효신",
      "displayName": "유효신",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조옥란",
        "mother": "유시천",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조옥란-유시천의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M046S",
      "name": "유승원",
      "displayName": "유승원",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조옥란",
        "mother": "유시천",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조옥란-유시천의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F047S",
      "name": "이경희",
      "displayName": "이경희",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조옥영",
        "mother": "미확인",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조옥영의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M048S",
      "name": "나준원",
      "displayName": "나준원",
      "generation": 5,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조인희"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조인희의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F049S",
      "name": "이경숙",
      "displayName": "이경숙",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조옥영",
        "mother": "미확인",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조옥영의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F050S",
      "name": "조인희",
      "displayName": "조인희",
      "generation": 5,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성용",
        "mother": "정복선",
        "spouses": [
          "나준원"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성용-정복선의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M051S",
      "name": "유승대",
      "displayName": "유승대",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조옥란",
        "mother": "유시천",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조옥란-유시천의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F052S",
      "name": "유승미",
      "displayName": "유승미",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조옥란",
        "mother": "유시천",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조옥란-유시천의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M053S",
      "name": "유근호",
      "displayName": "유근호",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조옥란",
        "mother": "유시천",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조옥란-유시천의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M054S",
      "name": "유승철",
      "displayName": "유승철",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조옥란",
        "mother": "유시천",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조옥란-유시천의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F055S",
      "name": "조가은",
      "displayName": "조가은",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조완희",
        "mother": "송단비",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조완희-송단비의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M056S",
      "name": "유승주",
      "displayName": "유승주",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조옥란",
        "mother": "유시천",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조옥란-유시천의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F057S",
      "name": "송단비",
      "displayName": "송단비",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조완희"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조완희의 모",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F058S",
      "name": "조완희",
      "displayName": "조완희",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성범",
        "mother": "이경미",
        "spouses": [
          "송단비"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성범-이경미의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F059S",
      "name": "김수민",
      "displayName": "김수민",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조민희"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조민희의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M060S",
      "name": "이훈주",
      "displayName": "이훈주",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "이항열",
        "mother": "조성미",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성미-이항열의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M061S",
      "name": "조은호",
      "displayName": "조은호",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조민희",
        "mother": "김수민",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조민희-김수민의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M062S",
      "name": "유철수",
      "displayName": "유철수",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조옥란",
        "mother": "유시천",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조옥란-유시천의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F063S",
      "name": "조은우",
      "displayName": "조은우",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조민희",
        "mother": "김수민",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조민희-김수민의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M064S",
      "name": "유승은",
      "displayName": "유승은",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조옥란",
        "mother": "유시천",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조옥란-유시천의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F065S",
      "name": "조윤희",
      "displayName": "조윤희",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성문",
        "mother": "최인자",
        "spouses": [
          "임준성"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성문-최인자의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M066S",
      "name": "조준희",
      "displayName": "조준희",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성삼",
        "mother": "황선경",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성삼-황선경의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1968
      }
    },
    {
      "id": "G5M067S",
      "name": "임성우",
      "displayName": "임성우",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "임준성",
        "mother": "조윤희",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조윤희-임준성의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1992
      }
    },
    {
      "id": "G5M068S",
      "name": "조주호",
      "displayName": "조주호",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성준",
        "mother": "안은숙",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성준-안은숙의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F069S",
      "name": "조선희",
      "displayName": "조선희",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성준",
        "mother": "안은숙",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성준-안은숙의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M070S",
      "name": "임준성",
      "displayName": "임준성",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조윤희"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조윤희의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M071S",
      "name": "임성현",
      "displayName": "임성현",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "임준성",
        "mother": "조윤희",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조윤희-임준성의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1996
      }
    },
    {
      "id": "G5F072S",
      "name": "조연희",
      "displayName": "조연희",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성율",
        "mother": "강은희",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성율-강은희의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F073S",
      "name": "조민희",
      "displayName": "조민희",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성범",
        "mother": "이경미",
        "spouses": [
          "김수민"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성범-이경미의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5F074S",
      "name": "조금희",
      "displayName": "조금희",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성율",
        "mother": "강은희",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성율-강은희의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M075S",
      "name": "조태희",
      "displayName": "조태희",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성장",
        "mother": "정순재",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성장-정순재의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M076S",
      "name": "조원희",
      "displayName": "조원희",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성장",
        "mother": "정순재",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성장-정순재의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M077S",
      "name": "정승연",
      "displayName": "정승연",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성주",
        "mother": "정찬건",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성주-정찬건의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M078S",
      "name": "조경민",
      "displayName": "조경민",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조창희",
        "mother": "김미화",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조창희-김미화의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1996
      }
    },
    {
      "id": "G5F079S",
      "name": "조은희",
      "displayName": "조은희",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성장",
        "mother": "정순재",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성장-정순재의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M080S",
      "name": "조창희",
      "displayName": "조창희",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성문",
        "mother": "최인자",
        "spouses": [
          "김미화"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성문-최인자의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1968
      }
    },
    {
      "id": "G5M081S",
      "name": "조웅희",
      "displayName": "조웅희",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성장",
        "mother": "정순재",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성장-정순재의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M082S",
      "name": "정승기",
      "displayName": "정승기",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성주",
        "mother": "정찬건",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성주-정찬건의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G5M083S",
      "name": "조경진",
      "displayName": "조경진",
      "generation": 5,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조성문",
        "mother": "김미화",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조창희-김미화의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1996
      }
    },
    {
      "id": "G5F084S",
      "name": "김미화",
      "displayName": "김미화",
      "generation": 5,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조창희"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조창희의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1968
      }
    },
    {
      "id": "G4M085S",
      "name": "조원상",
      "displayName": "조원상",
      "generation": 4,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조동하",
        "mother": "라은실",
        "spouses": [
          "배문경"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조동하-라은실의 아들, 1962년생(61세)",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1961
      }
    },
    {
      "id": "G4M086S",
      "name": "전승재",
      "displayName": "전승재",
      "generation": 4,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조동하",
        "mother": "라은실",
        "spouses": [
          "조야영"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조아영의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1957
      }
    },
    {
      "id": "G4M087S",
      "name": "조은상",
      "displayName": "조은상",
      "generation": 4,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조동하",
        "mother": "라은실",
        "spouses": [
          "변주란"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조동하-라은실의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1963
      }
    },
    {
      "id": "G4F088S",
      "name": "변주란",
      "displayName": "변주란",
      "generation": 4,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조은상"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조은상의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1964
      }
    },
    {
      "id": "G4F089S",
      "name": "박선영",
      "displayName": "박선영",
      "generation": 4,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조강하",
        "mother": "전흥선",
        "spouses": [
          "조성원"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성원의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1965
      }
    },
    {
      "id": "G4F090S",
      "name": "조야영",
      "displayName": "조야영",
      "generation": 4,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조동하",
        "mother": "라은실",
        "spouses": [
          "전승재"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "전승재의 부인, 1963년생(60세)",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1963
      }
    },
    {
      "id": "G4F091S",
      "name": "배문경",
      "displayName": "배문경",
      "generation": 4,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조원상"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조원상의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1962
      }
    },
    {
      "id": "G4F092S",
      "name": "조성실",
      "displayName": "조성실",
      "generation": 4,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조일하",
        "mother": "심인숙",
        "spouses": [
          "이원근"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조일하-심인숙의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M093S",
      "name": "조성원",
      "displayName": "조성원",
      "generation": 4,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조강하",
        "mother": "전흥선",
        "spouses": [
          "박선영"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조강하-전흥선의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1961
      }
    },
    {
      "id": "G4F094S",
      "name": "조성희",
      "displayName": "조성희",
      "generation": 4,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조강하",
        "mother": "전흥선",
        "spouses": [
          "김명진"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조강하-전흥선의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1954
      }
    },
    {
      "id": "G4F095S",
      "name": "조명진",
      "displayName": "조명진",
      "generation": 4,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조일하",
        "mother": "심인숙",
        "spouses": [
          "장학용"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조일하-심인숙의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M096S",
      "name": "이원근",
      "displayName": "이원근",
      "generation": 4,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성실"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성실의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M097S",
      "name": "김명진",
      "displayName": "김명진",
      "generation": 4,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조강하",
        "mother": "전흥선",
        "spouses": [
          "조성희"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조강하-전흥선의 사위",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1953
      }
    },
    {
      "id": "G4F098S",
      "name": "조성덕",
      "displayName": "조성덕",
      "generation": 4,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조일하",
        "mother": "심인숙",
        "spouses": [
          "한성택"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조일하-심인숙의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F099S",
      "name": "조성애",
      "displayName": "조성애",
      "generation": 4,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조강하",
        "mother": "전흥선",
        "spouses": [],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조강하-전흥선의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1958
      }
    },
    {
      "id": "G4M100S",
      "name": "한성택",
      "displayName": "한성택",
      "generation": 4,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성덕"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성덕의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M101S",
      "name": "장학용",
      "displayName": "장학용",
      "generation": 4,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조명진"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조명진의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M102S",
      "name": "조성호",
      "displayName": "조성호",
      "generation": 4,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조일하",
        "mother": "심인숙",
        "spouses": [
          "조명숙"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조일하-심인숙의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F103S",
      "name": "조옥영",
      "displayName": "조옥영",
      "generation": 4,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조중하",
        "mother": "백창성",
        "spouses": [
          "미확인"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조중하-백창성의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F104S",
      "name": "이경미",
      "displayName": "이경미",
      "generation": 4,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성범"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성범의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F105S",
      "name": "조옥란",
      "displayName": "조옥란",
      "generation": 4,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조중하",
        "mother": "백창성",
        "spouses": [
          "유시천"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조중하-백창성의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M106S",
      "name": "이항열",
      "displayName": "이항열",
      "generation": 4,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성미"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성미의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F107S",
      "name": "조명숙",
      "displayName": "조명숙",
      "generation": 4,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성호"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성호의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F108S",
      "name": "조성미",
      "displayName": "조성미",
      "generation": 4,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조중하",
        "mother": "백창성",
        "spouses": [
          "이항열"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조중하-백창성의 딸, 조씨 성 유지",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F109S",
      "name": "정복선",
      "displayName": "정복선",
      "generation": 4,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성용"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성용의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M110S",
      "name": "유시천",
      "displayName": "유시천",
      "generation": 4,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조옥란"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조옥란의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M111S",
      "name": "조성용",
      "displayName": "조성용",
      "generation": 4,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조일하",
        "mother": "심인숙",
        "spouses": [
          "정복선"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조일하-심인숙의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1953
      }
    },
    {
      "id": "G4M112S",
      "name": "조성준",
      "displayName": "조성준",
      "generation": 4,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조중하",
        "mother": "백창성",
        "spouses": [
          "안은숙"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조중하-백창성의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F113S",
      "name": "최인자",
      "displayName": "최인자",
      "generation": 4,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성문"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성문의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1940
      }
    },
    {
      "id": "G4F114S",
      "name": "황선경",
      "displayName": "황선경",
      "generation": 4,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성삼"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성삼의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M115S",
      "name": "조성율",
      "displayName": "조성율",
      "generation": 4,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조중하",
        "mother": "백창성",
        "spouses": [
          "강은희"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조중하-백창성의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M116S",
      "name": "조성만",
      "displayName": "조성만",
      "generation": 4,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조광하",
        "mother": "이의경",
        "spouses": [
          "미확인"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조광하-이의경의 아듡",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F117S",
      "name": "강은희",
      "displayName": "강은희",
      "generation": 4,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성율"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성율의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M118S",
      "name": "조성범",
      "displayName": "조성범",
      "generation": 4,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조중하",
        "mother": "백창성",
        "spouses": [
          "이경미"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조중하-백창성의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M119S",
      "name": "조성삼",
      "displayName": "조성삼",
      "generation": 4,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조광하",
        "mother": "이의경",
        "spouses": [
          "황선경"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조광하-이의경의 아듡",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F120S",
      "name": "안은숙",
      "displayName": "안은숙",
      "generation": 4,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성준"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성준의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F121S",
      "name": "조성화",
      "displayName": "조성화",
      "generation": 4,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조제하",
        "mother": "Mrs제하",
        "spouses": [
          "미확인"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조제하의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M122S",
      "name": "정찬건",
      "displayName": "정찬건",
      "generation": 4,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성주"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성주의 남편",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F123S",
      "name": "정순재",
      "displayName": "정순재",
      "generation": 4,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성장"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성장의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F124S",
      "name": "신윤자",
      "displayName": "신윤자",
      "generation": 4,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성기"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성기의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M125S",
      "name": "조성욱",
      "displayName": "조성욱",
      "generation": 4,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조대하",
        "mother": "허효순",
        "spouses": [
          "조찬희"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조대하-허효순의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F126S",
      "name": "조성주",
      "displayName": "조성주",
      "generation": 4,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조광하",
        "mother": "이의경",
        "spouses": [
          "정찬건"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조광하-이의경의 딸",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M127S",
      "name": "조성장",
      "displayName": "조성장",
      "generation": 4,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조대하",
        "mother": "허효순",
        "spouses": [
          "정순재"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조대하-허효순의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4F128S",
      "name": "조찬희",
      "displayName": "조찬희",
      "generation": 4,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조성욱"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조성욱의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M129S",
      "name": "조성기",
      "displayName": "조성기",
      "generation": 4,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조제하",
        "mother": "Mrs제하",
        "spouses": [
          "신윤자"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조제하의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G4M130S",
      "name": "조성문",
      "displayName": "조성문",
      "generation": 4,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": "조광하",
        "mother": "이의경",
        "spouses": [
          "최인자"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조광하-이의경의 아듡",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1938
      }
    },
    {
      "id": "G3M131S",
      "name": "조강하",
      "displayName": "조강하",
      "generation": 3,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": "조병갑",
        "mother": "김명훈",
        "spouses": [
          "전흥선"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조병갑-김명훈의 첫째 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1926
      }
    },
    {
      "id": "G3F132S",
      "name": "전흥선",
      "displayName": "전흥선",
      "generation": 3,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조강하"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조강하의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1932
      }
    },
    {
      "id": "G3M133S",
      "name": "조동하",
      "displayName": "조동하",
      "generation": 3,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": "조병갑",
        "mother": "김명훈",
        "spouses": [
          "라은실"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조병갑-김명훈의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1930
      }
    },
    {
      "id": "G3F134S",
      "name": "라은실",
      "displayName": "라은실",
      "generation": 3,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "생존",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조동하"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조동하의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1936
      }
    },
    {
      "id": "G3M135S",
      "name": "조광하",
      "displayName": "조광하",
      "generation": 3,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": "조병희",
        "mother": "강부인",
        "spouses": [
          "이의경"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조병희-강부인의 셋째 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1905
      }
    },
    {
      "id": "G3M136S",
      "name": "조대하",
      "displayName": "조대하",
      "generation": 3,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": "조병희",
        "mother": "강부인",
        "spouses": [
          "허효순"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조병희-강부인의 첫째 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G3M137S",
      "name": "조중하",
      "displayName": "조중하",
      "generation": 3,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": "조병희",
        "mother": "강부인",
        "spouses": [
          "백창성"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조병희-강부인의 넷째 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G3M138S",
      "name": "조제하",
      "displayName": "조제하",
      "generation": 3,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": "조병희",
        "mother": "강부인",
        "spouses": [
          "Mrs제하"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조병희-강부인의 둘째 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G3F139S",
      "name": "백창성",
      "displayName": "백창성",
      "generation": 3,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조중하"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조중하의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G3F140S",
      "name": "허효순",
      "displayName": "허효순",
      "generation": 3,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조대하"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조대하의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G3F141S",
      "name": "심인숙",
      "displayName": "심인숙",
      "generation": 3,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조일하"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조일하의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G3M142S",
      "name": "조일하",
      "displayName": "조일하",
      "generation": 3,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": "조병희",
        "mother": "민혜숙",
        "spouses": [
          "심인숙"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조병희-민혜숙의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G3F143S",
      "name": "Mrs제하",
      "displayName": "Mrs제하",
      "generation": 3,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조제하"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조제하의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G3F144S",
      "name": "이의경",
      "displayName": "이의경",
      "generation": 3,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조광하"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조광하의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": 1904
      }
    },
    {
      "id": "G2F145S",
      "name": "강부인",
      "displayName": "강부인",
      "generation": 2,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조병희"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조병희의 첫째 부인, 조대하/조제하/조광하/조중하 어머니",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G2F146S",
      "name": "김명훈",
      "displayName": "김명훈",
      "generation": 2,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조병갑"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조병갑의 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G2F147S",
      "name": "민혜숙",
      "displayName": "민혜숙",
      "generation": 2,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조병희"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조병희의 부인(2)",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G2M148S",
      "name": "조병희",
      "displayName": "조병희",
      "generation": 2,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": "조정윤",
        "mother": "임정숙",
        "spouses": [
          "강부인"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "재혼, 강부인과 4명 자녀, 민혜숙과 1명 자녀",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G2M149S",
      "name": "조병갑",
      "displayName": "조병갑",
      "generation": 2,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": "조정윤",
        "mother": "이천경",
        "spouses": [
          "김명훈"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조정윤 이천경의 아들",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G1M150S",
      "name": "조정윤",
      "displayName": "조정윤",
      "generation": 1,
      "gender": "M",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "임정숙"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조정윤 (Line1) - 첫 번째 결혼으로 Line1 시작",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G1F151S",
      "name": "이천경",
      "displayName": "이천경",
      "generation": 1,
      "gender": "F",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조정윤"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조정윤의 둘째 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G1F152S",
      "name": "임정숙",
      "displayName": "임정숙",
      "generation": 1,
      "gender": "F",
      "line": "Line1",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조정윤"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조정윤의 첫째 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G1M150S_Line2",
      "name": "조정윤",
      "displayName": "조정윤",
      "generation": 1,
      "gender": "M",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "임정숙"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조정윤 (Line2) - 두 번째 결혼으로 Line2 시작",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G1M150S_Line3",
      "name": "조정윤",
      "displayName": "조정윤",
      "generation": 1,
      "gender": "M",
      "line": "Line3",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "임정숙"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "조정윤 (Line3) - 두 번째 결혼으로 Line3 시작",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    },
    {
      "id": "G1F152S_Line2",
      "name": "임정숙",
      "displayName": "임정숙",
      "generation": 1,
      "gender": "F",
      "line": "Line2",
      "birthDate": null,
      "deathDate": null,
      "status": "고인",
      "relationships": {
        "father": null,
        "mother": null,
        "spouses": [
          "조정윤"
        ],
        "children": [],
        "siblings": []
      },
      "contact": {
        "phone": null,
        "email": null,
        "address": null,
        "social": {}
      },
      "additional": {
        "job": null,
        "education": null,
        "notes": "임정숙 (Line2) - 조정윤의 첫 번째 부인",
        "photo": null,
        "burialPlace": null,
        "memorialDate": null,
        "customFields": {},
        "birthYear": null
      }
    }
  ],
  "searchIndex": {
    "byName": {
      "조영하": [
        "G3M001S"
      ],
      "조명하": [
        "G3F002S"
      ],
      "조세희": [
        "G5M003S"
      ],
      "한지영": [
        "G5F004S"
      ],
      "박초희": [
        "G5F005S"
      ],
      "임동���": [
        "G5M006S"
      ],
      "조성순": [
        "G4F007S"
      ],
      "류지민": [
        "G6F008S"
      ],
      "권민우": [
        "G6M009S"
      ],
      "류지안": [
        "G6F010S"
      ],
      "김태란": [
        "G6F011S"
      ],
      "신이솔": [
        "G6F012S"
      ],
      "조수정": [
        "G5F013S"
      ],
      "김민재": [
        "G5F014S"
      ],
      "권바": [
        "G5M015S"
      ],
      "조윤경": [
        "G5F016S"
      ],
      "조수경": [
        "G5F017S"
      ],
      "조광희": [
        "G5M018S"
      ],
      "전혜영": [
        "G5F019S"
      ],
      "전종일": [
        "G5M020S"
      ],
      "조용희": [
        "G5M021S"
      ],
      "손안세": [
        "G5M022S"
      ],
      "이민수": [
        "G5F023S"
      ],
      "조율희": [
        "G5F024S"
      ],
      "강달호": [
        "G5M025S"
      ],
      "김희수": [
        "G5F026S"
      ],
      "김승우": [
        "G5M027S"
      ],
      "강동민": [
        "G5M028S"
      ],
      "김윤형": [
        "G5F029S"
      ],
      "류현민": [
        "G5M030S"
      ],
      "장정란": [
        "G5F031S"
      ],
      "강동욱": [
        "G5M032S"
      ],
      "신유석": [
        "G5M033S"
      ],
      "김희진": [
        "G5F034S"
      ],
      "양종원": [
        "G5M035S"
      ],
      "장바우": [
        "G5M036S"
      ],
      "한지훈": [
        "G5M037S"
      ],
      "이선이": [
        "G5F038S"
      ],
      "이현섭": [
        "G5M039S"
      ],
      "장해경": [
        "G5M040S"
      ],
      "한지혜": [
        "G5F041S"
      ],
      "조윤희": [
        "G5F042S",
        "G5F065S"
      ],
      "이정연": [
        "G5M043S"
      ],
      "장일우": [
        "G5M044S"
      ],
      "유효신": [
        "G5M045S"
      ],
      "유승원": [
        "G5M046S"
      ],
      "이경희": [
        "G5F047S"
      ],
      "나준원": [
        "G5M048S"
      ],
      "이경숙": [
        "G5F049S"
      ],
      "조인희": [
        "G5F050S"
      ],
      "유승대": [
        "G5M051S"
      ],
      "유승미": [
        "G5F052S"
      ],
      "유근호": [
        "G5M053S"
      ],
      "유승철": [
        "G5M054S"
      ],
      "조가은": [
        "G5F055S"
      ],
      "유승주": [
        "G5M056S"
      ],
      "송단비": [
        "G5F057S"
      ],
      "조완희": [
        "G5F058S"
      ],
      "김수민": [
        "G5F059S"
      ],
      "이훈주": [
        "G5M060S"
      ],
      "조은호": [
        "G5M061S"
      ],
      "유철수": [
        "G5M062S"
      ],
      "조은우": [
        "G5F063S"
      ],
      "유승은": [
        "G5M064S"
      ],
      "조준희": [
        "G5M066S"
      ],
      "임성우": [
        "G5M067S"
      ],
      "조주호": [
        "G5M068S"
      ],
      "조선희": [
        "G5F069S"
      ],
      "임준성": [
        "G5M070S"
      ],
      "임성현": [
        "G5M071S"
      ],
      "조연희": [
        "G5F072S"
      ],
      "조민희": [
        "G5F073S"
      ],
      "조금희": [
        "G5F074S"
      ],
      "조태희": [
        "G5M075S"
      ],
      "조원희": [
        "G5M076S"
      ],
      "정승연": [
        "G5M077S"
      ],
      "조경민": [
        "G5M078S"
      ],
      "조은희": [
        "G5F079S"
      ],
      "조창희": [
        "G5M080S"
      ],
      "조웅희": [
        "G5M081S"
      ],
      "정승기": [
        "G5M082S"
      ],
      "조경진": [
        "G5M083S"
      ],
      "김미화": [
        "G5F084S"
      ],
      "조원상": [
        "G4M085S"
      ],
      "전승재": [
        "G4M086S"
      ],
      "조은상": [
        "G4M087S"
      ],
      "변주란": [
        "G4F088S"
      ],
      "박선영": [
        "G4F089S"
      ],
      "조야영": [
        "G4F090S"
      ],
      "배문경": [
        "G4F091S"
      ],
      "조성실": [
        "G4F092S"
      ],
      "조성원": [
        "G4M093S"
      ],
      "조성희": [
        "G4F094S"
      ],
      "조명진": [
        "G4F095S"
      ],
      "이원근": [
        "G4M096S"
      ],
      "김명진": [
        "G4M097S"
      ],
      "조성덕": [
        "G4F098S"
      ],
      "조성애": [
        "G4F099S"
      ],
      "한성택": [
        "G4M100S"
      ],
      "장학용": [
        "G4M101S"
      ],
      "조성호": [
        "G4M102S"
      ],
      "조옥영": [
        "G4F103S"
      ],
      "이경미": [
        "G4F104S"
      ],
      "조옥란": [
        "G4F105S"
      ],
      "이항열": [
        "G4M106S"
      ],
      "조명숙": [
        "G4F107S"
      ],
      "조성미": [
        "G4F108S"
      ],
      "정복선": [
        "G4F109S"
      ],
      "유시천": [
        "G4M110S"
      ],
      "조성용": [
        "G4M111S"
      ],
      "조성준": [
        "G4M112S"
      ],
      "최인자": [
        "G4F113S"
      ],
      "황선경": [
        "G4F114S"
      ],
      "조성율": [
        "G4M115S"
      ],
      "조성만": [
        "G4M116S"
      ],
      "강은희": [
        "G4F117S"
      ],
      "조성범": [
        "G4M118S"
      ],
      "조성삼": [
        "G4M119S"
      ],
      "안은숙": [
        "G4F120S"
      ],
      "조성화": [
        "G4F121S"
      ],
      "정찬건": [
        "G4M122S"
      ],
      "정순재": [
        "G4F123S"
      ],
      "신윤자": [
        "G4F124S"
      ],
      "조성욱": [
        "G4M125S"
      ],
      "조성주": [
        "G4F126S"
      ],
      "조성장": [
        "G4M127S"
      ],
      "조찬희": [
        "G4F128S"
      ],
      "조성기": [
        "G4M129S"
      ],
      "조성문": [
        "G4M130S"
      ],
      "조강하": [
        "G3M131S"
      ],
      "전흥선": [
        "G3F132S"
      ],
      "조동하": [
        "G3M133S"
      ],
      "라은실": [
        "G3F134S"
      ],
      "조광하": [
        "G3M135S"
      ],
      "조대하": [
        "G3M136S"
      ],
      "조중하": [
        "G3M137S"
      ],
      "조제하": [
        "G3M138S"
      ],
      "백창성": [
        "G3F139S"
      ],
      "허효순": [
        "G3F140S"
      ],
      "심인숙": [
        "G3F141S"
      ],
      "조일하": [
        "G3M142S"
      ],
      "Mrs제하": [
        "G3F143S"
      ],
      "이의경": [
        "G3F144S"
      ],
      "강부인": [
        "G2F145S"
      ],
      "김명훈": [
        "G2F146S"
      ],
      "민혜숙": [
        "G2F147S"
      ],
      "조병희": [
        "G2M148S"
      ],
      "조병갑": [
        "G2M149S"
      ],
      "조정윤": [
        "G1M150S",
        "G1M150S_Line2",
        "G1M150S_Line3"
      ],
      "이천경": [
        "G1F151S"
      ],
      "임정숙": [
        "G1F152S",
        "G1F152S_Line2"
      ]
    },
    "byHanja": {},
    "byGeneration": {
      "1": [
        "G1M150S",
        "G1F151S",
        "G1F152S",
        "G1M150S_Line2",
        "G1M150S_Line3",
        "G1F152S_Line2"
      ],
      "2": [
        "G2F145S",
        "G2F146S",
        "G2F147S",
        "G2M148S",
        "G2M149S"
      ],
      "3": [
        "G3M001S",
        "G3F002S",
        "G3M131S",
        "G3F132S",
        "G3M133S",
        "G3F134S",
        "G3M135S",
        "G3M136S",
        "G3M137S",
        "G3M138S",
        "G3F139S",
        "G3F140S",
        "G3F141S",
        "G3M142S",
        "G3F143S",
        "G3F144S"
      ],
      "4": [
        "G4F007S",
        "G4M085S",
        "G4M086S",
        "G4M087S",
        "G4F088S",
        "G4F089S",
        "G4F090S",
        "G4F091S",
        "G4F092S",
        "G4M093S",
        "G4F094S",
        "G4F095S",
        "G4M096S",
        "G4M097S",
        "G4F098S",
        "G4F099S",
        "G4M100S",
        "G4M101S",
        "G4M102S",
        "G4F103S",
        "G4F104S",
        "G4F105S",
        "G4M106S",
        "G4F107S",
        "G4F108S",
        "G4F109S",
        "G4M110S",
        "G4M111S",
        "G4M112S",
        "G4F113S",
        "G4F114S",
        "G4M115S",
        "G4M116S",
        "G4F117S",
        "G4M118S",
        "G4M119S",
        "G4F120S",
        "G4F121S",
        "G4M122S",
        "G4F123S",
        "G4F124S",
        "G4M125S",
        "G4F126S",
        "G4M127S",
        "G4F128S",
        "G4M129S",
        "G4M130S"
      ],
      "5": [
        "G5M003S",
        "G5F004S",
        "G5F005S",
        "G5M006S",
        "G5F013S",
        "G5F014S",
        "G5M015S",
        "G5F016S",
        "G5F017S",
        "G5M018S",
        "G5F019S",
        "G5M020S",
        "G5M021S",
        "G5M022S",
        "G5F023S",
        "G5F024S",
        "G5M025S",
        "G5F026S",
        "G5M027S",
        "G5M028S",
        "G5F029S",
        "G5M030S",
        "G5F031S",
        "G5M032S",
        "G5M033S",
        "G5F034S",
        "G5M035S",
        "G5M036S",
        "G5M037S",
        "G5F038S",
        "G5M039S",
        "G5M040S",
        "G5F041S",
        "G5F042S",
        "G5M043S",
        "G5M044S",
        "G5M045S",
        "G5M046S",
        "G5F047S",
        "G5M048S",
        "G5F049S",
        "G5F050S",
        "G5M051S",
        "G5F052S",
        "G5M053S",
        "G5M054S",
        "G5F055S",
        "G5M056S",
        "G5F057S",
        "G5F058S",
        "G5F059S",
        "G5M060S",
        "G5M061S",
        "G5M062S",
        "G5F063S",
        "G5M064S",
        "G5F065S",
        "G5M066S",
        "G5M067S",
        "G5M068S",
        "G5F069S",
        "G5M070S",
        "G5M071S",
        "G5F072S",
        "G5F073S",
        "G5F074S",
        "G5M075S",
        "G5M076S",
        "G5M077S",
        "G5M078S",
        "G5F079S",
        "G5M080S",
        "G5M081S",
        "G5M082S",
        "G5M083S",
        "G5F084S"
      ],
      "6": [
        "G6F008S",
        "G6M009S",
        "G6F010S",
        "G6F011S",
        "G6F012S"
      ]
    },
    "byLine": {
      "Line2": [
        "G3M001S",
        "G3F002S",
        "G5M003S",
        "G5F004S",
        "G5F005S",
        "G5M006S",
        "G5M025S",
        "G5M028S",
        "G5F031S",
        "G5M032S",
        "G5M036S",
        "G5M037S",
        "G5F038S",
        "G5M039S",
        "G5M040S",
        "G5F041S",
        "G5F042S",
        "G5M043S",
        "G5M044S",
        "G5M048S",
        "G5F050S",
        "G4F092S",
        "G4F095S",
        "G4M096S",
        "G4F098S",
        "G4M100S",
        "G4M101S",
        "G4M102S",
        "G4F107S",
        "G4F109S",
        "G4M111S",
        "G3F141S",
        "G3M142S",
        "G2F147S",
        "G1M150S_Line2",
        "G1F152S_Line2"
      ],
      "Line3": [
        "G4F007S",
        "G6F008S",
        "G6M009S",
        "G6F010S",
        "G6F011S",
        "G6F012S",
        "G5F013S",
        "G5F014S",
        "G5M015S",
        "G5F016S",
        "G5F017S",
        "G5M018S",
        "G5F019S",
        "G5M020S",
        "G5M021S",
        "G5M022S",
        "G5F023S",
        "G5F024S",
        "G5F026S",
        "G5M027S",
        "G5F029S",
        "G5M030S",
        "G5M033S",
        "G5F034S",
        "G4M085S",
        "G4M086S",
        "G4M087S",
        "G4F088S",
        "G4F089S",
        "G4F090S",
        "G4F091S",
        "G4M093S",
        "G4F094S",
        "G4M097S",
        "G4F099S",
        "G3M131S",
        "G3F132S",
        "G3M133S",
        "G3F134S",
        "G2F146S",
        "G2M149S",
        "G1F151S",
        "G1M150S_Line3"
      ],
      "Line1": [
        "G5M035S",
        "G5M045S",
        "G5M046S",
        "G5F047S",
        "G5F049S",
        "G5M051S",
        "G5F052S",
        "G5M053S",
        "G5M054S",
        "G5F055S",
        "G5M056S",
        "G5F057S",
        "G5F058S",
        "G5F059S",
        "G5M060S",
        "G5M061S",
        "G5M062S",
        "G5F063S",
        "G5M064S",
        "G5F065S",
        "G5M066S",
        "G5M067S",
        "G5M068S",
        "G5F069S",
        "G5M070S",
        "G5M071S",
        "G5F072S",
        "G5F073S",
        "G5F074S",
        "G5M075S",
        "G5M076S",
        "G5M077S",
        "G5M078S",
        "G5F079S",
        "G5M080S",
        "G5M081S",
        "G5M082S",
        "G5M083S",
        "G5F084S",
        "G4F103S",
        "G4F104S",
        "G4F105S",
        "G4M106S",
        "G4F108S",
        "G4M110S",
        "G4M112S",
        "G4F113S",
        "G4F114S",
        "G4M115S",
        "G4M116S",
        "G4F117S",
        "G4M118S",
        "G4M119S",
        "G4F120S",
        "G4F121S",
        "G4M122S",
        "G4F123S",
        "G4F124S",
        "G4M125S",
        "G4F126S",
        "G4M127S",
        "G4F128S",
        "G4M129S",
        "G4M130S",
        "G3M135S",
        "G3M136S",
        "G3M137S",
        "G3M138S",
        "G3F139S",
        "G3F140S",
        "G3F143S",
        "G3F144S",
        "G2F145S",
        "G2M148S",
        "G1M150S",
        "G1F152S"
      ]
    },
    "byGender": {
      "M": [
        "G3M001S",
        "G5M003S",
        "G5M006S",
        "G6M009S",
        "G5M015S",
        "G5M018S",
        "G5M020S",
        "G5M021S",
        "G5M022S",
        "G5M025S",
        "G5M027S",
        "G5M028S",
        "G5M030S",
        "G5M032S",
        "G5M033S",
        "G5M035S",
        "G5M036S",
        "G5M037S",
        "G5M039S",
        "G5M040S",
        "G5M043S",
        "G5M044S",
        "G5M045S",
        "G5M046S",
        "G5M048S",
        "G5M051S",
        "G5M053S",
        "G5M054S",
        "G5M056S",
        "G5M060S",
        "G5M061S",
        "G5M062S",
        "G5M064S",
        "G5M066S",
        "G5M067S",
        "G5M068S",
        "G5M070S",
        "G5M071S",
        "G5M075S",
        "G5M076S",
        "G5M077S",
        "G5M078S",
        "G5M080S",
        "G5M081S",
        "G5M082S",
        "G5M083S",
        "G4M085S",
        "G4M086S",
        "G4M087S",
        "G4M093S",
        "G4M096S",
        "G4M097S",
        "G4M100S",
        "G4M101S",
        "G4M102S",
        "G4M106S",
        "G4M110S",
        "G4M111S",
        "G4M112S",
        "G4M115S",
        "G4M116S",
        "G4M118S",
        "G4M119S",
        "G4M122S",
        "G4M125S",
        "G4M127S",
        "G4M129S",
        "G4M130S",
        "G3M131S",
        "G3M133S",
        "G3M135S",
        "G3M136S",
        "G3M137S",
        "G3M138S",
        "G3M142S",
        "G2M148S",
        "G2M149S",
        "G1M150S",
        "G1M150S_Line2",
        "G1M150S_Line3"
      ],
      "F": [
        "G3F002S",
        "G5F004S",
        "G5F005S",
        "G4F007S",
        "G6F008S",
        "G6F010S",
        "G6F011S",
        "G6F012S",
        "G5F013S",
        "G5F014S",
        "G5F016S",
        "G5F017S",
        "G5F019S",
        "G5F023S",
        "G5F024S",
        "G5F026S",
        "G5F029S",
        "G5F031S",
        "G5F034S",
        "G5F038S",
        "G5F041S",
        "G5F042S",
        "G5F047S",
        "G5F049S",
        "G5F050S",
        "G5F052S",
        "G5F055S",
        "G5F057S",
        "G5F058S",
        "G5F059S",
        "G5F063S",
        "G5F065S",
        "G5F069S",
        "G5F072S",
        "G5F073S",
        "G5F074S",
        "G5F079S",
        "G5F084S",
        "G4F088S",
        "G4F089S",
        "G4F090S",
        "G4F091S",
        "G4F092S",
        "G4F094S",
        "G4F095S",
        "G4F098S",
        "G4F099S",
        "G4F103S",
        "G4F104S",
        "G4F105S",
        "G4F107S",
        "G4F108S",
        "G4F109S",
        "G4F113S",
        "G4F114S",
        "G4F117S",
        "G4F120S",
        "G4F121S",
        "G4F123S",
        "G4F124S",
        "G4F126S",
        "G4F128S",
        "G3F132S",
        "G3F134S",
        "G3F139S",
        "G3F140S",
        "G3F141S",
        "G3F143S",
        "G3F144S",
        "G2F145S",
        "G2F146S",
        "G2F147S",
        "G1F151S",
        "G1F152S",
        "G1F152S_Line2"
      ]
    },
    "byStatus": {
      "미확인": [
        "G3M001S",
        "G3F002S"
      ],
      "생존": [
        "G5M003S",
        "G5F004S",
        "G5F005S",
        "G5M006S",
        "G4F007S",
        "G6F008S",
        "G6M009S",
        "G6F010S",
        "G6F011S",
        "G6F012S",
        "G5F013S",
        "G5F014S",
        "G5M015S",
        "G5F016S",
        "G5F017S",
        "G5M018S",
        "G5F019S",
        "G5M020S",
        "G5M021S",
        "G5M022S",
        "G5F023S",
        "G5F024S",
        "G5M025S",
        "G5F026S",
        "G5M027S",
        "G5M028S",
        "G5F029S",
        "G5M030S",
        "G5F031S",
        "G5M032S",
        "G5M033S",
        "G5F034S",
        "G5M035S",
        "G5M036S",
        "G5M037S",
        "G5F038S",
        "G5M039S",
        "G5M040S",
        "G5F041S",
        "G5F042S",
        "G5M043S",
        "G5M044S",
        "G5M045S",
        "G5M046S",
        "G5F047S",
        "G5M048S",
        "G5F049S",
        "G5F050S",
        "G5M051S",
        "G5F052S",
        "G5M053S",
        "G5M054S",
        "G5F055S",
        "G5M056S",
        "G5F057S",
        "G5F058S",
        "G5F059S",
        "G5M060S",
        "G5M061S",
        "G5M062S",
        "G5F063S",
        "G5M064S",
        "G5F065S",
        "G5M066S",
        "G5M067S",
        "G5M068S",
        "G5F069S",
        "G5M070S",
        "G5M071S",
        "G5F072S",
        "G5F073S",
        "G5F074S",
        "G5M075S",
        "G5M076S",
        "G5M077S",
        "G5M078S",
        "G5F079S",
        "G5M080S",
        "G5M081S",
        "G5M082S",
        "G5M083S",
        "G5F084S",
        "G4M085S",
        "G4M086S",
        "G4M087S",
        "G4F088S",
        "G4F089S",
        "G4F090S",
        "G4F091S",
        "G4F092S",
        "G4M093S",
        "G4F094S",
        "G4F095S",
        "G4M096S",
        "G4M097S",
        "G4F098S",
        "G4F099S",
        "G4M100S",
        "G4M101S",
        "G4M102S",
        "G4F103S",
        "G4F104S",
        "G4F105S",
        "G4M106S",
        "G4F107S",
        "G4F108S",
        "G4F109S",
        "G4M110S",
        "G4M111S",
        "G4M112S",
        "G4F113S",
        "G4F114S",
        "G4M115S",
        "G4M116S",
        "G4F117S",
        "G4M118S",
        "G4M119S",
        "G4F120S",
        "G4F121S",
        "G4M122S",
        "G4F123S",
        "G4F124S",
        "G4M125S",
        "G4F126S",
        "G4M127S",
        "G4F128S",
        "G4M129S",
        "G4M130S",
        "G3F134S"
      ],
      "고인": [
        "G3M131S",
        "G3F132S",
        "G3M133S",
        "G3M135S",
        "G3M136S",
        "G3M137S",
        "G3M138S",
        "G3F139S",
        "G3F140S",
        "G3F141S",
        "G3M142S",
        "G3F143S",
        "G3F144S",
        "G2F145S",
        "G2F146S",
        "G2F147S",
        "G2M148S",
        "G2M149S",
        "G1M150S",
        "G1F151S",
        "G1F152S",
        "G1M150S_Line2",
        "G1M150S_Line3",
        "G1F152S_Line2"
      ]
    }
  },
  "searchHistory": [],
  "config": {
    "version": "1.0",
    "lastUpdated": "2025-09-13T15:50:50.085Z",
    "totalPersons": 152
  }
};

// 브라우저용 데이터 로더 클래스
class CoreDataLoader {
  constructor() {
    this.data = CORE_DATA;
    this.loaded = false;
  }

  // 데이터 로드
  load() {
    if (!this.loaded) {
      this.loaded = true;
      console.log("Core Module 데이터 로드 완료 (브라우저용)");
    }
    return this.data;
  }

  // Person 조회
  getPerson(id) {
    return this.data.persons.find(p => p.id === id);
  }

  // 관리자 정보 조회
  getAdminInfo() {
    return this.data.config.admin;
  }

  // 앱 설정 조회
  getAppConfig() {
    return this.data.config.app;
  }

  // 검색 인덱스 조회
  getSearchIndex() {
    return this.data.searchIndex;
  }

  // 검색 히스토리 조회
  getSearchHistory() {
    return this.data.searchHistory;
  }

  // 이름으로 검색 (간결한 검색 함수)
  searchByName(query) {
    const results = [];
    const searchIndex = this.data.searchIndex;
    
    // 한글 이름 검색
    if (searchIndex.byName[query]) {
      results.push(...searchIndex.byName[query]);
    }
    
    // 한자 이름 검색
    if (searchIndex.byHanja[query]) {
      results.push(...searchIndex.byHanja[query]);
    }
    
    // 부분 검색 (간결한 구현)
    Object.keys(searchIndex.byName).forEach(name => {
      if (name.includes(query) && !results.includes(name)) {
        results.push(...searchIndex.byName[name]);
      }
    });
    
    return results;
  }

  // 검색 히스토리 추가
  addSearchHistory(query, resultCount) {
    const history = this.data.searchHistory;
    const newEntry = {
      query: query,
      timestamp: new Date().toISOString(),
      resultCount: resultCount
    };
    
    // 최신 검색을 맨 앞에 추가
    history.recent.unshift(newEntry);
    
    // 최대 히스토리 수 제한
    if (history.recent.length > history.maxHistory) {
      history.recent = history.recent.slice(0, history.maxHistory);
    }
  }
}

// 전역 인스턴스 생성
const coreLoader = new CoreDataLoader();

// 브라우저 전역 변수로 설정
window.CORE_DATA = CORE_DATA;
window.coreLoader = coreLoader;