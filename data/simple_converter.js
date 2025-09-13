// 간단한 노션 데이터 변환 스크립트
// 3-3-2: 데이터 구조 분석 및 스키마 매핑 (간소화 버전)

const fs = require('fs');

// 파일을 직접 읽어서 BOM 제거
function readJsonFile(filename) {
  const data = fs.readFileSync(filename, 'utf8');
  // BOM 제거
  const cleanData = data.replace(/^\uFEFF/, '');
  return JSON.parse(cleanData);
}

try {
  console.log('노션 데이터 로드 중...');
  const notionData = readJsonFile('notion_data_utf8.json');
  
  console.log(`데이터 로드 성공! 총 ${notionData.results.length}명의 데이터`);
  
  // 첫 번째 인물 데이터 구조 확인
  const firstPerson = notionData.results[0];
  console.log('\n첫 번째 인물 데이터 구조:');
  console.log('이름:', firstPerson.properties.이름?.title?.[0]?.text?.content);
  console.log('세대:', firstPerson.properties.세대?.select?.name);
  console.log('Line:', firstPerson.properties.Line?.select?.name);
  console.log('생년:', firstPerson.properties.생년?.number);
  console.log('사망일:', firstPerson.properties.사망일?.date?.start);
  
  // 간단한 변환 테스트 (5명만)
  console.log('\n변환 테스트 시작 (5명만)...');
  
  const testPersons = notionData.results.slice(0, 5).map((person, index) => {
    const name = person.properties.이름?.title?.[0]?.text?.content || '';
    const generation = person.properties.세대?.select?.name?.replace('세대', '') || '0';
    const line = person.properties.Line?.select?.name || 'Line1';
    const birthYear = person.properties.생년?.number;
    const deathDate = person.properties.사망일?.date?.start;
    
    return {
      id: `G${generation}M${(index + 1).toString().padStart(3, '0')}S`,
      name: name,
      displayName: name,
      generation: parseInt(generation),
      line: line,
      birthDate: birthYear ? `${birthYear}-01-01` : null,
      deathDate: deathDate,
      status: deathDate ? 'deceased' : 'living',
      age: birthYear ? (deathDate ? parseInt(deathDate.substring(0, 4)) - birthYear : new Date().getFullYear() - birthYear) : null,
      relationships: {
        father: person.properties.아버지?.rich_text?.[0]?.text?.content || null,
        mother: person.properties.어머니?.rich_text?.[0]?.text?.content || null,
        spouses: [],
        children: [],
        siblings: []
      },
      contact: {
        phone: person.properties.연락처?.rich_text?.[0]?.text?.content || null,
        email: person.properties.이메일?.rich_text?.[0]?.text?.content || null,
        address: person.properties.주소?.rich_text?.[0]?.text?.content || null,
        social: {}
      },
      additional: {
        job: null,
        education: null,
        notes: person.properties.비고?.rich_text?.[0]?.text?.content || null,
        photo: null,
        burialPlace: null,
        memorialDate: deathDate,
        customFields: {}
      },
      tags: [generation + '세대', line, deathDate ? '고인' : '생존'],
      stats: {
        totalDescendants: 0,
        livingDescendants: 0,
        lastContact: new Date().toISOString()
      },
      access: {
        isAdmin: false,
        canEdit: false,
        lastModified: person.last_edited_time,
        modifiedBy: "notion"
      }
    };
  });
  
  // 테스트 결과 저장
  const testResult = {
    persons: testPersons,
    conversionInfo: {
      totalCount: testPersons.length,
      convertedAt: new Date().toISOString(),
      sourceFile: 'notion_data_utf8.json',
      testMode: true
    }
  };
  
  fs.writeFileSync('test_converted_data.json', JSON.stringify(testResult, null, 2), 'utf8');
  
  console.log('\n테스트 변환 완료!');
  console.log('변환된 인물들:');
  testPersons.forEach(person => {
    console.log(`- ${person.name} (${person.generation}세대, ${person.line}, ${person.status})`);
  });
  
  console.log(`\n결과 파일: test_converted_data.json`);
  console.log(`파일 크기: ${fs.statSync('test_converted_data.json').size} bytes`);
  
} catch (error) {
  console.error('오류 발생:', error.message);
  console.error('스택 트레이스:', error.stack);
}

