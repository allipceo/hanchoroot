// 완전한 필드 매칭 테스트 스크립트
// 노션의 모든 필드와 JSON의 모든 필드 정확한 일치 여부 검증

const fs = require('fs');

// 파일을 직접 읽어서 BOM 제거
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

// 완전한 필드 매칭 테스트
function completeFieldTest() {
  console.log('=== 완전한 필드 매칭 테스트 시작 ===\n');
  
  try {
    // 원본 노션 데이터 로드
    const notionData = readJsonFile('notion_data_raw.json');
    console.log(`총 ${notionData.results.length}명의 데이터 중 10개 테스트`);
    
    // 처음 10개 데이터만 테스트
    const testData = notionData.results.slice(0, 10);
    
    console.log('\n=== 노션 필드 구조 분석 ===');
    if (testData.length > 0) {
      const firstPerson = testData[0];
      console.log('노션의 모든 필드명:');
      Object.keys(firstPerson.properties).forEach(fieldName => {
        const property = firstPerson.properties[fieldName];
        console.log(`- ${fieldName}: ${property.type}`);
      });
    }
    
    console.log('\n=== 10개 데이터 상세 비교 ===');
    
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
      
      // JSON 변환
      const generation = notionGeneration?.replace('세대', '') || '0';
      const gender = inferGender(person);
      const line = notionLine || 'Line1';
      const status = notionStatus || 'unknown';
      
      const convertedPerson = {
        id: `G${generation}${gender}${(index + 1).toString().padStart(3, '0')}S`,
        name: notionName,
        displayName: notionName,
        generation: parseInt(generation),
        gender: gender,
        line: line,
        birthDate: null,
        deathDate: null,
        status: status,
        relationships: {
          father: notionFather || null,
          mother: notionMother || null,
          spouses: notionSpouse ? notionSpouse.split(',').map(s => s.trim()).filter(s => s) : [],
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
          notes: notionNotes || null,
          photo: null,
          burialPlace: null,
          memorialDate: null,
          customFields: {},
          birthYear: notionBirthYear
        }
      };
      
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
      console.log(`배우자: ${convertedPerson.relationships.spouses.join(', ')}`);
      console.log(`비고: ${convertedPerson.additional.notes}`);
      
      // 필드 일치 여부 검증
      console.log('\n--- 필드 일치 여부 검증 ---');
      const matches = {
        이름: notionName === convertedPerson.name,
        세대: notionGeneration === `${convertedPerson.generation}세대`,
        Line: notionLine === convertedPerson.line,
        성별: notionGender === convertedPerson.gender,
        생존상태: notionStatus === convertedPerson.status,
        생년: notionBirthYear === convertedPerson.additional.birthYear,
        아버지: notionFather === convertedPerson.relationships.father,
        어머니: notionMother === convertedPerson.relationships.mother,
        배우자: notionSpouse === convertedPerson.relationships.spouses.join(', '),
        비고: notionNotes === convertedPerson.additional.notes
      };
      
      Object.entries(matches).forEach(([field, isMatch]) => {
        console.log(`${field}: ${isMatch ? '✅' : '❌'}`);
      });
      
      const matchCount = Object.values(matches).filter(Boolean).length;
      const totalFields = Object.keys(matches).length;
      console.log(`\n일치율: ${matchCount}/${totalFields} (${Math.round(matchCount/totalFields*100)}%)`);
    });
    
    // 전체 통계
    console.log('\n=== 전체 통계 ===');
    const lineStats = {};
    const genStats = {};
    
    testData.forEach((person, index) => {
      const line = extractNotionValue(person.properties.Line1) || 'Line1';
      const generation = extractNotionValue(person.properties.세대) || '0세대';
      
      lineStats[line] = (lineStats[line] || 0) + 1;
      genStats[generation] = (genStats[generation] || 0) + 1;
    });
    
    console.log('Line별 분포:', lineStats);
    console.log('세대별 분포:', genStats);
    
  } catch (error) {
    console.error('테스트 중 오류 발생:', error.message);
    console.error('스택 트레이스:', error.stack);
  }
}

// 성별 추론 함수
function inferGender(person) {
  const name = extractNotionValue(person.properties.이름) || '';
  const notes = extractNotionValue(person.properties.비고) || '';
  const gender = extractNotionValue(person.properties.성별);
  
  if (gender) return gender;
  if (notes.includes('아들') || notes.includes('남성')) return 'M';
  if (notes.includes('딸') || notes.includes('여성')) return 'F';
  
  return 'M'; // 기본값
}

// 테스트 실행
completeFieldTest();
