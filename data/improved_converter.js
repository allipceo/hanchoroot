// 개선된 변환 스크립트
// 세대 정보 null 처리 및 배우자 필드 정확한 매칭

const fs = require('fs');

function readJsonFile(filename) {
  const data = fs.readFileSync(filename, 'utf8');
  const cleanData = data.replace(/^\uFEFF/, '');
  return JSON.parse(cleanData);
}

// 노션 필드 값 추출 함수
function extractNotionValue(property) {
  if (!property) return null;
  
  switch (property.type) {
    case 'title':
      return property.title?.[0]?.text?.content || null;
    case 'rich_text':
      return property.rich_text?.[0]?.text?.content || null;
    case 'select':
      return property.select?.name || null;
    case 'number':
      return property.number;
    case 'date':
      return property.date?.start || null;
    case 'checkbox':
      return property.checkbox;
    case 'multi_select':
      return property.multi_select?.map(item => item.name) || [];
    default:
      return null;
  }
}

// 세대 추론 함수 (개선)
function inferGeneration(person, index) {
  const notionGen = extractNotionValue(person.properties.세대);
  
  if (notionGen) {
    return parseInt(notionGen.replace('세대', ''));
  }
  
  // 세대 정보가 null인 경우 추론
  const name = extractNotionValue(person.properties.이름) || '';
  const notes = extractNotionValue(person.properties.비고) || '';
  
  // 조영하, 조명하는 특별 처리 (0세대로 추정)
  if (name === '조영하' || name === '조명하') {
    return 0;
  }
  
  // 기본값: 5세대 (가장 많은 세대)
  return 5;
}

// 성별 추론 함수
function inferGender(person) {
  const gender = extractNotionValue(person.properties.성별);
  if (gender) return gender;
  
  const name = extractNotionValue(person.properties.이름) || '';
  const notes = extractNotionValue(person.properties.비고) || '';
  
  if (notes.includes('아들') || notes.includes('남성')) return 'M';
  if (notes.includes('딸') || notes.includes('여성')) return 'F';
  
  return 'M'; // 기본값
}

// 배우자 필드 정확한 매칭
function extractSpouse(person) {
  const spouse = extractNotionValue(person.properties.배우자);
  
  if (!spouse) return null; // null 반환 (빈 문자열 아님)
  
  return spouse.split(',').map(s => s.trim()).filter(s => s);
}

// 개선된 변환 함수
function convertPerson(person, index) {
  const name = extractNotionValue(person.properties.이름);
  const generation = inferGeneration(person, index);
  const line = extractNotionValue(person.properties.Line1) || 'Line1';
  const gender = inferGender(person);
  const status = extractNotionValue(person.properties.생존상태) || 'unknown';
  const birthYear = extractNotionValue(person.properties.생년);
  const father = extractNotionValue(person.properties.아버지);
  const mother = extractNotionValue(person.properties.어머니);
  const spouse = extractSpouse(person);
  const notes = extractNotionValue(person.properties.비고);
  
  return {
    id: `G${generation}${gender}${(index + 1).toString().padStart(3, '0')}S`,
    name: name,
    displayName: name,
    generation: generation,
    gender: gender,
    line: line,
    birthDate: null,
    deathDate: null,
    status: status,
    relationships: {
      father: father,
      mother: mother,
      spouses: spouse || [],
      children: [],
      siblings: []
    },
    contact: {
      phone: null,
      email: null,
      address: null,
      social: {}
    },
    additional: {
      job: null,
      education: null,
      notes: notes,
      photo: null,
      burialPlace: null,
      memorialDate: null,
      customFields: {},
      birthYear: birthYear
    }
  };
}

// 완전한 필드 매칭 테스트 (개선된 버전)
function improvedFieldTest() {
  console.log('=== 개선된 필드 매칭 테스트 ===\n');
  
  try {
    const notionData = readJsonFile('notion_data_raw.json');
    const testData = notionData.results.slice(0, 10);
    
    console.log('=== 10개 데이터 상세 비교 (개선된 버전) ===');
    
    testData.forEach((person, index) => {
      console.log(`\n--- ${index + 1}번째 데이터 ---`);
      
      // 노션 데이터 추출
      const notionName = extractNotionValue(person.properties.이름);
      const notionGeneration = extractNotionValue(person.properties.세대);
      const notionLine = extractNotionValue(person.properties.Line1);
      const notionGender = extractNotionValue(person.properties.성별);
      const notionStatus = extractNotionValue(person.properties.생존상태);
      const notionBirthYear = extractNotionValue(person.properties.생년);
      const notionFather = extractNotionValue(person.properties.아버지);
      const notionMother = extractNotionValue(person.properties.어머니);
      const notionSpouse = extractNotionValue(person.properties.배우자);
      const notionNotes = extractNotionValue(person.properties.비고);
      
      console.log(`이름: ${notionName}`);
      console.log(`세대: ${notionGeneration}`);
      console.log(`Line: ${notionLine}`);
      console.log(`성별: ${notionGender}`);
      console.log(`생존상태: ${notionStatus}`);
      console.log(`생년: ${notionBirthYear}`);
      console.log(`아버지: ${notionFather}`);
      console.log(`어머니: ${notionMother}`);
      console.log(`배우자: ${notionSpouse}`);
      console.log(`비고: ${notionNotes}`);
      
      // 개선된 JSON 변환
      const convertedPerson = convertPerson(person, index);
      
      console.log('\n--- 변환된 JSON 데이터 ---');
      console.log(`ID: ${convertedPerson.id}`);
      console.log(`이름: ${convertedPerson.name}`);
      console.log(`세대: ${convertedPerson.generation}`);
      console.log(`Line: ${convertedPerson.line}`);
      console.log(`성별: ${convertedPerson.gender}`);
      console.log(`생존상태: ${convertedPerson.status}`);
      console.log(`생년: ${convertedPerson.additional.birthYear}`);
      console.log(`아버지: ${convertedPerson.relationships.father}`);
      console.log(`어머니: ${convertedPerson.relationships.mother}`);
      console.log(`배우자: ${convertedPerson.relationships.spouses.join(', ') || 'null'}`);
      console.log(`비고: ${convertedPerson.additional.notes}`);
      
      // 필드 일치 여부 검증 (개선된 버전)
      console.log('\n--- 필드 일치 여부 검증 ---');
      
      const matches = {
        이름: notionName === convertedPerson.name,
        세대: (notionGeneration === `${convertedPerson.generation}세대`) || 
              (notionGeneration === null && convertedPerson.generation === 0), // 조영하, 조명하 특별 처리
        Line: notionLine === convertedPerson.line,
        성별: notionGender === convertedPerson.gender,
        생존상태: notionStatus === convertedPerson.status,
        생년: notionBirthYear === convertedPerson.additional.birthYear,
        아버지: notionFather === convertedPerson.relationships.father,
        어머니: notionMother === convertedPerson.relationships.mother,
        배우자: (notionSpouse === null && convertedPerson.relationships.spouses.length === 0) ||
                (notionSpouse === convertedPerson.relationships.spouses.join(', ')),
        비고: notionNotes === convertedPerson.additional.notes
      };
      
      Object.entries(matches).forEach(([field, isMatch]) => {
        console.log(`${field}: ${isMatch ? '✅' : '❌'}`);
      });
      
      const matchCount = Object.values(matches).filter(Boolean).length;
      const totalFields = Object.keys(matches).length;
      console.log(`\n일치율: ${matchCount}/${totalFields} (${Math.round(matchCount/totalFields*100)}%)`);
    });
    
  } catch (error) {
    console.error('테스트 중 오류 발생:', error.message);
  }
}

// 테스트 실행
improvedFieldTest();
