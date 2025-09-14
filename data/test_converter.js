// 10개 데이터 테스트 변환 스크립트
// 노션→JSON 변환 문제 디버깅용

const fs = require('fs');

// 파일을 직접 읽어서 BOM 제거
function readJsonFile(filename) {
  const data = fs.readFileSync(filename, 'utf8');
  const cleanData = data.replace(/^\uFEFF/, '');
  return JSON.parse(cleanData);
}

// Line 필드 디버깅 함수
function debugLineField(person, index) {
  console.log(`\n=== 디버깅 ${index + 1}번째 데이터 ===`);
  console.log(`이름: ${person.properties.이름?.title?.[0]?.text?.content || '없음'}`);
  
  // Line 필드 상세 분석
  const lineProperty = person.properties.Line1;
  console.log('Line 속성 전체:', JSON.stringify(lineProperty, null, 2));
  
  if (lineProperty) {
    console.log('Line 속성 타입:', lineProperty.type);
    if (lineProperty.select) {
      console.log('Line select 값:', lineProperty.select);
      console.log('Line select name:', lineProperty.select.name);
    }
  } else {
    console.log('Line 속성이 없습니다!');
  }
  
  // 다른 select 필드들과 비교
  console.log('\n--- 다른 select 필드들 ---');
  Object.keys(person.properties).forEach(key => {
    const prop = person.properties[key];
    if (prop.type === 'select') {
      console.log(`${key}: ${prop.select?.name || 'null'}`);
    }
  });
}

// 메인 테스트 함수
function testConversion() {
  console.log('=== 10개 데이터 변환 테스트 시작 ===\n');
  
  try {
    // 원본 노션 데이터 로드
    const notionData = readJsonFile('notion_data_raw.json');
    console.log(`총 ${notionData.results.length}명의 데이터 중 10개 테스트`);
    
    // 처음 10개 데이터만 테스트
    const testData = notionData.results.slice(0, 10);
    
    console.log('\n=== Line 필드 디버깅 ===');
    testData.forEach((person, index) => {
      debugLineField(person, index);
    });
    
    // 변환 테스트
    console.log('\n=== 변환 테스트 ===');
    const convertedPersons = testData.map((person, index) => {
      const name = person.properties.이름?.title?.[0]?.text?.content || '';
      const generation = person.properties.세대?.select?.name?.replace('세대', '') || '0';
      const gender = inferGender(person);
      const line = person.properties.Line1?.select?.name || 'Line1'; // Line1 필드 추출
      const status = person.properties.생존상태?.select?.name || 'unknown';
      
      console.log(`${index + 1}. ${name} - Line: ${line}, 세대: ${generation}, 성별: ${gender}, 상태: ${status}`);
      
      return {
        id: `G${generation}${gender}${(index + 1).toString().padStart(3, '0')}S`,
        name: name,
        generation: parseInt(generation),
        gender: gender,
        line: line,
        status: status,
        relationships: extractRelationships(person),
        contact: extractContact(person),
        additional: extractAdditional(person)
      };
    });
    
    // Line별 통계
    const lineStats = {};
    convertedPersons.forEach(person => {
      lineStats[person.line] = (lineStats[person.line] || 0) + 1;
    });
    
    console.log('\n=== 변환 결과 ===');
    console.log('Line별 분포:', lineStats);
    console.log('총 변환된 인물 수:', convertedPersons.length);
    
    // 테스트 결과 저장
    const testResult = {
      testInfo: {
        totalRecords: notionData.results.length,
        testRecords: 10,
        testDate: new Date().toISOString()
      },
      persons: convertedPersons,
      lineStats: lineStats
    };
    
    fs.writeFileSync('test_conversion_result.json', JSON.stringify(testResult, null, 2));
    console.log('\n테스트 결과가 test_conversion_result.json에 저장되었습니다.');
    
  } catch (error) {
    console.error('테스트 중 오류 발생:', error.message);
    console.error('스택 트레이스:', error.stack);
  }
}

// 성별 추론 함수
function inferGender(person) {
  const name = person.properties.이름?.title?.[0]?.text?.content || '';
  const notes = person.properties.비고?.rich_text?.[0]?.text?.content || '';
  
  if (notes.includes('아들') || notes.includes('남성')) return 'M';
  if (notes.includes('딸') || notes.includes('여성')) return 'F';
  
  return 'M'; // 기본값
}

// 관계 데이터 추출
function extractRelationships(person) {
  const father = person.properties.아버지?.rich_text?.[0]?.text?.content;
  const mother = person.properties.어머니?.rich_text?.[0]?.text?.content;
  const spouse = person.properties.배우자?.rich_text?.[0]?.text?.content;
  
  return {
    father: father || null,
    mother: mother || null,
    spouses: spouse ? spouse.split(',').map(s => s.trim()).filter(s => s) : [],
    children: [],
    siblings: []
  };
}

// 연락처 데이터 추출
function extractContact(person) {
  return {
    phone: null,
    email: null,
    address: null,
    social: {}
  };
}

// 추가 정보 추출
function extractAdditional(person) {
  const notes = person.properties.비고?.rich_text?.[0]?.text?.content || '';
  const birthYear = person.properties.생년?.number;
  
  return {
    job: null,
    education: null,
    notes: notes,
    photo: null,
    burialPlace: null,
    memorialDate: null,
    customFields: {},
    birthYear: birthYear
  };
}

// 테스트 실행
testConversion();
