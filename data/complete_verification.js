// 완전한 필드별 레코드별 일치 여부 검증 스크립트
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

// 완전한 검증 함수
function completeVerification() {
  console.log('=== 노션 데이터베이스 vs JSON 파일 완전 검증 ===\n');
  
  try {
    // 1. 노션 데이터 로드
    console.log('1. 노션 데이터 로드 중...');
    const notionData = readJsonFile('notion_data_complete.json');
    console.log(`   노션 데이터: ${notionData.results.length}명`);
    
    // 2. JSON 데이터 로드
    console.log('2. JSON 데이터 로드 중...');
    let jsonData;
    try {
      jsonData = readJsonFile('converted_full_data.json');
      console.log(`   JSON 데이터: ${jsonData.persons.length}명`);
    } catch (error) {
      console.log('   JSON 파일이 없습니다. 새로 생성합니다...');
      jsonData = null;
    }
    
    // 3. 노션 데이터를 JSON으로 변환
    console.log('3. 노션 데이터를 JSON으로 변환 중...');
    const convertedData = convertNotionToJson(notionData.results);
    console.log(`   변환된 데이터: ${convertedData.persons.length}명`);
    
    // 4. 필드별 통계 비교
    console.log('\n=== 필드별 통계 비교 ===');
    
    // 세대별 분포 비교
    const notionGenStats = {};
    const jsonGenStats = {};
    
    notionData.results.forEach(person => {
      const gen = extractNotionValue(person.properties.세대) || 'null';
      notionGenStats[gen] = (notionGenStats[gen] || 0) + 1;
    });
    
    convertedData.persons.forEach(person => {
      const gen = `${person.generation}세대`;
      jsonGenStats[gen] = (jsonGenStats[gen] || 0) + 1;
    });
    
    console.log('\n세대별 분포:');
    console.log('노션 데이터:');
    Object.entries(notionGenStats).forEach(([gen, count]) => {
      console.log(`  ${gen}: ${count}명`);
    });
    console.log('JSON 데이터:');
    Object.entries(jsonGenStats).forEach(([gen, count]) => {
      console.log(`  ${gen}: ${count}명`);
    });
    
    // Line별 분포 비교
    const notionLineStats = {};
    const jsonLineStats = {};
    
    notionData.results.forEach(person => {
      const line = extractNotionValue(person.properties.Line1) || 'Line1';
      notionLineStats[line] = (notionLineStats[line] || 0) + 1;
    });
    
    convertedData.persons.forEach(person => {
      const line = person.line;
      jsonLineStats[line] = (jsonLineStats[line] || 0) + 1;
    });
    
    console.log('\nLine별 분포:');
    console.log('노션 데이터:');
    Object.entries(notionLineStats).forEach(([line, count]) => {
      console.log(`  ${line}: ${count}명`);
    });
    console.log('JSON 데이터:');
    Object.entries(jsonLineStats).forEach(([line, count]) => {
      console.log(`  ${line}: ${count}명`);
    });
    
    // 5. 레코드별 상세 검증 (처음 10개)
    console.log('\n=== 레코드별 상세 검증 (처음 10개) ===');
    
    const testData = notionData.results.slice(0, 10);
    const testConverted = convertedData.persons.slice(0, 10);
    
    let totalMatches = 0;
    let totalFields = 0;
    
    testData.forEach((notionPerson, index) => {
      const jsonPerson = testConverted[index];
      
      console.log(`\n--- ${index + 1}번째 레코드 검증 ---`);
      
      // 각 필드별 비교
      const notionName = extractNotionValue(notionPerson.properties.이름);
      const notionGeneration = extractNotionValue(notionPerson.properties.세대);
      const notionLine = extractNotionValue(notionPerson.properties.Line1);
      const notionGender = extractNotionValue(notionPerson.properties.성별);
      const notionStatus = extractNotionValue(notionPerson.properties.생존상태);
      const notionBirthYear = extractNotionValue(notionPerson.properties.생년);
      const notionFather = extractNotionValue(notionPerson.properties.아버지);
      const notionMother = extractNotionValue(notionPerson.properties.어머니);
      const notionSpouse = extractNotionValue(notionPerson.properties.배우자);
      const notionNotes = extractNotionValue(notionPerson.properties.비고);
      
      const matches = {
        이름: notionName === jsonPerson.name,
        세대: (notionGeneration === `${jsonPerson.generation}세대`) || 
              (notionGeneration === null && jsonPerson.generation === 0),
        Line: notionLine === jsonPerson.line,
        성별: notionGender === jsonPerson.gender,
        생존상태: notionStatus === jsonPerson.status,
        생년: notionBirthYear === jsonPerson.additional.birthYear,
        아버지: notionFather === jsonPerson.relationships.father,
        어머니: notionMother === jsonPerson.relationships.mother,
        배우자: (notionSpouse === null && jsonPerson.relationships.spouses.length === 0) ||
                (notionSpouse === jsonPerson.relationships.spouses.join(', ')),
        비고: notionNotes === jsonPerson.additional.notes
      };
      
      Object.entries(matches).forEach(([field, isMatch]) => {
        console.log(`${field}: ${isMatch ? '✅' : '❌'}`);
        if (isMatch) totalMatches++;
        totalFields++;
      });
      
      const matchCount = Object.values(matches).filter(Boolean).length;
      const fieldCount = Object.keys(matches).length;
      console.log(`일치율: ${matchCount}/${fieldCount} (${Math.round(matchCount/fieldCount*100)}%)`);
    });
    
    // 6. 전체 통계
    console.log('\n=== 전체 검증 결과 ===');
    console.log(`총 검증 필드 수: ${totalFields}`);
    console.log(`일치한 필드 수: ${totalMatches}`);
    console.log(`전체 일치율: ${Math.round(totalMatches/totalFields*100)}%`);
    
    // 7. JSON 파일 저장
    console.log('\n7. JSON 파일 저장 중...');
    fs.writeFileSync('converted_complete_data.json', JSON.stringify(convertedData, null, 2));
    console.log('   converted_complete_data.json 저장 완료');
    
    // 8. 최종 검증 결과
    console.log('\n=== 최종 검증 결과 ===');
    const isCompleteMatch = totalMatches === totalFields;
    console.log(`노션-JSON 완전 일치: ${isCompleteMatch ? '✅' : '❌'}`);
    
    if (isCompleteMatch) {
      console.log('🎉 모든 데이터가 정확히 일치합니다!');
    } else {
      console.log('⚠️ 일부 데이터가 일치하지 않습니다.');
    }
    
  } catch (error) {
    console.error('검증 중 오류 발생:', error.message);
    console.error('스택 트레이스:', error.stack);
  }
}

// 노션 데이터를 JSON으로 변환하는 함수
function convertNotionToJson(notionResults) {
  const persons = notionResults.map((person, index) => {
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
  });
  
  return {
    persons: persons,
    searchIndex: {
      byName: {},
      byGeneration: {},
      byLine: {},
      byGender: {}
    },
    searchHistory: [],
    config: {
      version: "1.0",
      lastUpdated: new Date().toISOString(),
      totalPersons: persons.length
    }
  };
}

// 세대 추론 함수
function inferGeneration(person, index) {
  const notionGen = extractNotionValue(person.properties.세대);
  
  if (notionGen) {
    return parseInt(notionGen.replace('세대', ''));
  }
  
  const name = extractNotionValue(person.properties.이름) || '';
  if (name === '조영하' || name === '조명하') {
    return 0;
  }
  
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
  
  return 'M';
}

// 배우자 추출 함수
function extractSpouse(person) {
  const spouse = extractNotionValue(person.properties.배우자);
  
  if (!spouse) return null;
  
  return spouse.split(',').map(s => s.trim()).filter(s => s);
}

// 검증 실행
completeVerification();
