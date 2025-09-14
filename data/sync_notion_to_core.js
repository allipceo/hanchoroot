// 노션 데이터와 window.CORE_DATA 완전 동기화 스크립트
const fs = require('fs');

console.log('=== 노션 데이터와 window.CORE_DATA 완전 동기화 시작 ===\n');

try {
  // 1. 노션 데이터 로드
  console.log('1. 노션 데이터 로드...');
  const notionData = JSON.parse(fs.readFileSync('./notion_data_complete.json', 'utf8'));
  console.log(`✅ 노션 데이터 로드 완료: ${notionData.results.length}명`);

  // 2. 노션 데이터를 이름 기준으로 정렬
  console.log('\n2. 노션 데이터 이름 기준 정렬...');
  notionData.results.sort((a, b) => {
    const nameA = a.properties.이름?.title?.[0]?.text?.content || '';
    const nameB = b.properties.이름?.title?.[0]?.text?.content || '';
    return nameA.localeCompare(nameB, 'ko');
  });
  console.log('✅ 노션 데이터 정렬 완료');

  // 3. 노션 데이터를 window.CORE_DATA 형식으로 변환 (필드명 완전 일치)
  console.log('\n3. 노션 데이터를 window.CORE_DATA 형식으로 변환...');
  
  const convertedPersons = notionData.results.map((person, index) => {
    // 이름 추출
    const name = person.properties.이름?.title?.[0]?.text?.content || '이름없음';
    
    // ID 생성 (기존 로직 유지)
    const generation = person.properties.세대?.select?.name?.replace('세대', '') || '0';
    const gender = person.properties.성별?.select?.name || 'M';
    const id = `G${generation}${gender}${String(index + 1).padStart(3, '0')}S`;
    
    // 필드명을 노션과 완전히 일치시키기
    const converted = {
      id: id,
      name: name,
      displayName: name,
      // 노션 필드명과 완전히 일치
      세대: parseInt(generation) || 0,
      성별: gender,
      Line1: person.properties.Line1?.rich_text?.[0]?.plain_text || 'Line1',
      생년: person.properties.생년?.number || null,
      사망일: person.properties.사망일?.date?.start || null,
      생존상태: person.properties.생존상태?.select?.name || '미확인',
      
      // 관계 정보 (기존 로직 유지)
      relationships: {
        father: person.properties.아버지?.rich_text?.[0]?.plain_text || null,
        mother: person.properties.어머니?.rich_text?.[0]?.plain_text || null,
        spouses: person.properties.배우자?.rich_text?.map(item => item.plain_text) || [],
        children: [],
        siblings: []
      },
      
      // 연락처 정보
      contact: {
        phone: person.properties.연락처?.phone_number || null,
        email: null,
        address: null,
        social: {}
      },
      
      // 추가 정보
      additional: {
        job: null,
        education: null,
        notes: person.properties.비고?.rich_text?.[0]?.plain_text || null,
        photo: null,
        burialPlace: null,
        memorialDate: null,
        customFields: {}
      },
      
      // 태그
      tags: [generation + '세대'],
      
      // 통계
      stats: {
        totalDescendants: 0,
        livingDescendants: 0,
        lastContact: new Date().toISOString()
      },
      
      // 접근 권한
      access: {
        isAdmin: false,
        canEdit: false,
        lastModified: person.last_edited_time,
        modifiedBy: 'notion'
      }
    };
    
    console.log(`변환 완료: ${converted.name} (${converted.id})`);
    return converted;
  });

  // 4. 이름 기준으로 정렬
  console.log('\n4. 변환된 데이터 이름 기준 정렬...');
  convertedPersons.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  console.log('✅ 변환된 데이터 정렬 완료');

  // 5. window.CORE_DATA 형식으로 구성
  console.log('\n5. window.CORE_DATA 형식으로 구성...');
  const coreData = {
    persons: convertedPersons,
    searchIndex: {
      byName: {},
      byHanja: {}
    },
    config: {
      version: "1.0",
      lastUpdated: new Date().toISOString(),
      totalPersons: convertedPersons.length
    }
  };

  // 6. 검색 인덱스 생성
  console.log('\n6. 검색 인덱스 생성...');
  convertedPersons.forEach(person => {
    if (!coreData.searchIndex.byName[person.name]) {
      coreData.searchIndex.byName[person.name] = [];
    }
    coreData.searchIndex.byName[person.name].push(person.id);
  });
  console.log('✅ 검색 인덱스 생성 완료');

  // 7. core_browser.js 파일 생성
  console.log('\n7. core_browser.js 파일 생성...');
  const coreBrowserContent = `// 한양조씨 족보앱 Core Module V3.0 - 브라우저용
// 브라우저 환경에서 직접 사용할 수 있는 데이터

// 실제 노션 데이터 (${convertedPersons.length}명 완전 데이터 - 검색 인덱스 포함)
const CORE_DATA = ${JSON.stringify(coreData, null, 2)};

// 브라우저용 데이터 로더 클래스
class CoreDataLoader {
  constructor() {
    this.data = CORE_DATA;
    this.loaded = false;
  }

  load() {
    if (!this.loaded) {
      console.log('Core 데이터 로드:', this.data);
      this.loaded = true;
    }
    return this.data;
  }

  getPersonById(id) {
    return this.data.persons.find(person => person.id === id);
  }

  searchByName(name) {
    const personIds = this.data.searchIndex.byName[name] || [];
    return personIds.map(id => this.getPersonById(id)).filter(Boolean);
  }
}

// 전역 인스턴스 생성
const coreLoader = new CoreDataLoader();

// 브라우저 전역 변수로 설정
window.CORE_DATA = CORE_DATA;
window.coreLoader = coreLoader;

console.log('Core Module 로드 완료:', CORE_DATA.persons.length + '명');
`;

  fs.writeFileSync('./core_browser.js', coreBrowserContent, 'utf8');
  console.log('✅ core_browser.js 파일 생성 완료');

  // 8. 통계 출력
  console.log('\n=== 동기화 완료 통계 ===');
  console.log(`총 인원: ${convertedPersons.length}명`);
  console.log(`세대별 분포:`, getGenerationStats(convertedPersons));
  console.log(`Line별 분포:`, getLineStats(convertedPersons));
  console.log(`생존상태별 분포:`, getStatusStats(convertedPersons));
  
  console.log('\n=== 필드명 일치 확인 ===');
  console.log('✅ 노션 필드명과 window.CORE_DATA 필드명 완전 일치');
  console.log('- 세대: 세대');
  console.log('- 성별: 성별');
  console.log('- Line1: Line1');
  console.log('- 생년: 생년');
  console.log('- 생존상태: 생존상태');

} catch (error) {
  console.error('❌ 동기화 실패:', error);
}

// 통계 함수들
function getGenerationStats(persons) {
  const stats = {};
  persons.forEach(person => {
    const gen = person.세대 + '세대';
    stats[gen] = (stats[gen] || 0) + 1;
  });
  return stats;
}

function getLineStats(persons) {
  const stats = {};
  persons.forEach(person => {
    const line = person.Line1;
    stats[line] = (stats[line] || 0) + 1;
  });
  return stats;
}

function getStatusStats(persons) {
  const stats = {};
  persons.forEach(person => {
    const status = person.생존상태;
    stats[status] = (stats[status] || 0) + 1;
  });
  return stats;
}
