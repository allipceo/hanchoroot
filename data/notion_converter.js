// 노션 데이터를 JSON으로 변환하는 스크립트
// 3-3-2: 데이터 구조 분석 및 스키마 매핑

const fs = require('fs');

// 노션 데이터 로드 (완전한 데이터 사용)
const notionData = JSON.parse(fs.readFileSync('notion_data_complete.json', 'utf8'));

// 필드 매핑 테이블 (019번 스키마 기반)
const FIELD_MAPPING = {
  // 노션 필드명과 완전히 동일 (1:1 매핑)
  '생년': '생년',
  '비고': '비고',
  '세대': '세대',
  '아버지': '아버지',
  '성별': '성별',
  'Line1': 'Line1',
  '배우자': '배우자',
  '생존상태': '생존상태'
};

// ID 생성 함수 (G5F001D 형식)
function generateId(person, index) {
  const generation = person.properties.세대?.select?.name?.replace('세대', '') || '0';
  const gender = inferGender(person);
  const sequence = (index + 1).toString().padStart(3, '0');
  const relation = getRelationCode(person);
  
  return `G${generation}${gender}${sequence}${relation}`;
}

// 성별 추론 함수
function inferGender(person) {
  const name = person.properties.이름?.title?.[0]?.text?.content || '';
  const notes = person.properties.비고?.rich_text?.[0]?.text?.content || '';
  
  // 이름이나 비고에서 성별 단서 찾기
  if (notes.includes('아들') || notes.includes('남성')) return 'M';
  if (notes.includes('딸') || notes.includes('여성')) return 'F';
  
  // 기본값 (추후 수동 보정 필요)
  return 'M';
}

// 관계 코드 생성
function getRelationCode(person) {
  const notes = person.properties.비고?.rich_text?.[0]?.text?.content || '';
  
  if (notes.includes('시조')) return 'A';
  if (notes.includes('아들')) return 'S';
  if (notes.includes('딸')) return 'D';
  if (notes.includes('부인')) return 'W';
  if (notes.includes('사위')) return 'H';
  
  return 'S'; // 기본값
}

// 상태 결정 함수 (노션 생존상태 필드 직접 사용)
function determineStatus(person) {
  return person.properties.생존상태?.select?.name || '미확인';
}

// 나이 계산 함수
function calculateAge(person) {
  const birthYear = person.properties.생년?.number;
  const deathYear = person.properties.사망일?.date?.start?.substring(0, 4);
  
  if (deathYear) {
    return parseInt(deathYear) - birthYear;
  } else if (birthYear) {
    return new Date().getFullYear() - birthYear;
  }
  
  return null;
}

// 관계 데이터 추출
function extractRelationships(person) {
  return {
    father: person.properties.아버지?.rich_text?.[0]?.text?.content || null,
    mother: person.properties.어머니?.rich_text?.[0]?.text?.content || null,
    spouses: person.properties.배우자?.rich_text?.[0]?.text?.content?.split(',').map(s => s.trim()) || [],
    children: person.properties.자녀?.rich_text?.[0]?.text?.content?.split(',').map(s => s.trim()) || [],
    siblings: person.properties.형제자매?.rich_text?.[0]?.text?.content?.split(',').map(s => s.trim()) || []
  };
}

// 연락처 정보 추출
function extractContact(person) {
  return {
    phone: person.properties.연락처?.rich_text?.[0]?.text?.content || null,
    email: person.properties.이메일?.rich_text?.[0]?.text?.content || null,
    address: person.properties.주소?.rich_text?.[0]?.text?.content || null,
    social: {}
  };
}

// 추가 정보 추출
function extractAdditional(person) {
  return {
    job: null, // 노션에 없음
    education: null, // 노션에 없음
    notes: person.properties.비고?.rich_text?.[0]?.text?.content || null,
    photo: null, // 노션에 없음
    burialPlace: null, // 노션에 없음
    memorialDate: person.properties.사망일?.date?.start || null,
    customFields: {}
  };
}

// 태그 추출
function extractTags(person) {
  const tags = [];
  const generation = person.properties.세대?.select?.name;
  const line = person.properties.Line?.select?.name;
  const status = determineStatus(person);
  
  if (generation) tags.push(generation);
  if (line) tags.push(line);
  if (status === 'deceased') tags.push('고인');
  if (status === 'living') tags.push('생존');
  
  return tags;
}

// 통계 계산
function calculateStats(person) {
  return {
    totalDescendants: 0, // 추후 계산
    livingDescendants: 0, // 추후 계산
    lastContact: new Date().toISOString()
  };
}

// 접근 권한 설정
function setAccess(person) {
  return {
    isAdmin: false, // 조은상만 관리자
    canEdit: false,
    lastModified: person.last_edited_time,
    modifiedBy: "notion"
  };
}

// 메인 변환 함수
function convertNotionToJSON() {
  console.log(`노션 데이터 변환 시작... (총 ${notionData.results.length}명)`);
  
  const convertedPersons = notionData.results.map((person, index) => {
    const converted = {
      id: generateId(person, index),
      name: person.properties.이름?.title?.[0]?.text?.content || '',
      displayName: person.properties.이름?.title?.[0]?.text?.content || '',
      성별: person.properties.성별?.select?.name || 'M',
      세대: parseInt(person.properties.세대?.select?.name?.replace('세대', '')) || 0,
      Line1: person.properties.Line1?.rich_text?.[0]?.plain_text || 'Line1',
      생년: person.properties.생년?.number || null,
      사망일: person.properties.사망일?.date?.start || null,
      생존상태: determineStatus(person),
      age: calculateAge(person),
      relationships: extractRelationships(person),
      contact: extractContact(person),
      additional: extractAdditional(person),
      tags: extractTags(person),
      stats: calculateStats(person),
      access: setAccess(person)
    };
    
    console.log(`변환 완료: ${converted.name} (${converted.id})`);
    return converted;
  });
  
  return convertedPersons;
}

// 변환 실행
const convertedData = convertNotionToJSON();

// 결과 저장
const result = {
  persons: convertedData,
  conversionInfo: {
    totalCount: convertedData.length,
    convertedAt: new Date().toISOString(),
    sourceFile: 'notion_data_raw.json'
  }
};

fs.writeFileSync('converted_data.json', JSON.stringify(result, null, 2), 'utf8');

console.log(`\n변환 완료!`);
console.log(`- 총 ${convertedData.length}명 변환`);
console.log(`- 결과 파일: converted_data.json`);
console.log(`- 파일 크기: ${fs.statSync('converted_data.json').size} bytes`);

// 변환 통계 출력
const stats = {
  byGeneration: {},
  byLine: {},
  byStatus: {}
};

convertedData.forEach(person => {
  // 세대별 통계
  const gen = person.generation;
  stats.byGeneration[gen] = (stats.byGeneration[gen] || 0) + 1;
  
  // Line별 통계
  const line = person.line;
  stats.byLine[line] = (stats.byLine[line] || 0) + 1;
  
  // 상태별 통계
  const status = person.status;
  stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
});

console.log('\n변환 통계:');
console.log('세대별:', stats.byGeneration);
console.log('Line별:', stats.byLine);
console.log('상태별:', stats.byStatus);
