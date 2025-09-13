// 노션 데이터와 100% 일치하는 JSON 변환 스크립트
// 노션이 정확한 소스이므로 JSON을 노션에 맞춤

const fs = require('fs');

// 파일을 직접 읽어서 BOM 제거
function readJsonFile(filename) {
  const data = fs.readFileSync(filename, 'utf8');
  const cleanData = data.replace(/^\uFEFF/, '');
  return JSON.parse(cleanData);
}

// 성별 추론 함수
function inferGender(person) {
  const name = person.properties.이름?.title?.[0]?.text?.content || '';
  const notes = person.properties.비고?.rich_text?.[0]?.text?.content || '';
  
  if (notes.includes('아들') || notes.includes('남성')) return 'M';
  if (notes.includes('딸') || notes.includes('여성')) return 'F';
  
  return 'M'; // 기본값
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

// 관계 데이터 추출
function extractRelationships(person) {
  const father = person.properties.아버지?.rich_text?.[0]?.text?.content;
  const mother = person.properties.어머니?.rich_text?.[0]?.text?.content;
  const spouse = person.properties.배우자?.rich_text?.[0]?.text?.content;
  const children = person.properties.자녀?.rich_text?.[0]?.text?.content;
  const siblings = person.properties.형제자매?.rich_text?.[0]?.text?.content;
  
  return {
    father: father || null,
    mother: mother || null,
    spouses: spouse ? spouse.split(',').map(s => s.trim()).filter(s => s) : [],
    children: children ? children.split(',').map(s => s.trim()).filter(s => s) : [],
    siblings: siblings ? siblings.split(',').map(s => s.trim()).filter(s => s) : []
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
    job: null,
    education: null,
    notes: person.properties.비고?.rich_text?.[0]?.text?.content || null,
    photo: null,
    burialPlace: null,
    memorialDate: person.properties.사망일?.date?.start || null,
    customFields: {}
  };
}

// 태그 추출
function extractTags(person) {
  const tags = [];
  const generation = person.properties.세대?.select?.name;
  const line = person.properties.Line?.select?.name; // Line 필드 사용
  const status = person.properties.생존상태?.select?.name;
  
  if (generation) tags.push(generation);
  if (line) tags.push(line);
  if (status) tags.push(status);
  
  return tags;
}

// 메인 변환 함수 - 노션 데이터와 100% 일치
function convertToPerfectJSON() {
  console.log('노션 데이터와 100% 일치하는 JSON 변환 시작...');
  
  const notionData = readJsonFile('notion_data_utf8.json');
  console.log(`총 ${notionData.results.length}명의 데이터 변환 중...`);
  
  const convertedPersons = notionData.results.map((person, index) => {
    // 노션 데이터에서 정확히 추출
    const name = person.properties.이름?.title?.[0]?.text?.content || '';
    const generation = person.properties.세대?.select?.name?.replace('세대', '') || '0';
    const line = person.properties.Line?.select?.name || 'Line1'; // Line 필드 사용
    const birthYear = person.properties.생년?.number;
    const deathDate = person.properties.사망일?.date?.start;
    const status = person.properties.생존상태?.select?.name;
    const gender = inferGender(person);
    const relationCode = getRelationCode(person);
    
    // 상태 변환 (노션 데이터 그대로)
    let statusValue = 'living'; // 기본값
    if (status === '고인') {
      statusValue = 'deceased';
    } else if (status === '미확인') {
      statusValue = 'unknown';
    }
    
    // 생년 처리 (노션 데이터 그대로)
    let birthDate = null;
    if (birthYear) {
      birthDate = `${birthYear}-01-01`;
    }
    
    // 나이 계산
    let age = null;
    if (birthYear) {
      if (deathDate) {
        age = parseInt(deathDate.substring(0, 4)) - birthYear;
      } else {
        age = new Date().getFullYear() - birthYear;
      }
    }
    
    const converted = {
      id: `G${generation}${gender}${(index + 1).toString().padStart(3, '0')}${relationCode}`,
      name: name,
      displayName: name,
      gender: gender,
      generation: parseInt(generation),
      line: line, // 노션 Line 필드 그대로 사용
      birthDate: birthDate, // 노션 생년 그대로 사용
      deathDate: deathDate, // 노션 사망일 그대로 사용
      status: statusValue, // 노션 생존상태 그대로 사용
      age: age,
      relationships: extractRelationships(person),
      contact: extractContact(person),
      additional: extractAdditional(person),
      tags: extractTags(person),
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
    
    if (index % 10 === 0) {
      console.log(`변환 진행: ${index + 1}/${notionData.results.length} - ${converted.name} (${converted.generation}세대, ${converted.line}, ${converted.status})`);
    }
    
    return converted;
  });
  
  // 검색 인덱스 생성
  const searchIndex = {
    byName: {},
    byHanja: {},
    byGeneration: {},
    byLine: {},
    byStatus: {},
    byTags: {}
  };
  
  convertedPersons.forEach(person => {
    // 이름 인덱스
    if (person.name) {
      searchIndex.byName[person.name] = searchIndex.byName[person.name] || [];
      searchIndex.byName[person.name].push(person.id);
    }
    
    // 세대 인덱스
    const gen = person.generation.toString();
    searchIndex.byGeneration[gen] = searchIndex.byGeneration[gen] || [];
    searchIndex.byGeneration[gen].push(person.id);
    
    // Line 인덱스
    searchIndex.byLine[person.line] = searchIndex.byLine[person.line] || [];
    searchIndex.byLine[person.line].push(person.id);
    
    // 상태 인덱스
    searchIndex.byStatus[person.status] = searchIndex.byStatus[person.status] || [];
    searchIndex.byStatus[person.status].push(person.id);
    
    // 태그 인덱스
    person.tags.forEach(tag => {
      searchIndex.byTags[tag] = searchIndex.byTags[tag] || [];
      searchIndex.byTags[tag].push(person.id);
    });
  });
  
  // 최종 결과 구성
  const result = {
    persons: convertedPersons,
    searchIndex: searchIndex,
    searchHistory: {
      recent: [],
      maxHistory: 10
    },
    config: {
      app: {
        version: "1.0.0",
        dataVersion: "v3.0",
        lastUpdate: new Date().toISOString(),
        buildNumber: "100"
      },
      admin: {
        name: "조은상",
        phone: "010-2067-6442",
        email: "choeunsang@gmail.com",
        accessPassword: "01020676442"
      },
      settings: {
        defaultLine: "Line1",
        maxExportSize: 100,
        cacheTimeout: 3600,
        autoSave: true,
        offlineMode: true
      },
      features: {
        searchEnabled: true,
        calculatorEnabled: true,
        exportEnabled: true,
        adminModeEnabled: true,
        futureFeatures: {
          photoUpload: false,
          socialSharing: false,
          multiLanguage: false
        }
      }
    },
    conversionInfo: {
      totalCount: convertedPersons.length,
      convertedAt: new Date().toISOString(),
      sourceFile: 'notion_data_utf8.json',
      version: 'perfect-match'
    }
  };
  
  // 결과 저장
  fs.writeFileSync('perfect_converted_data.json', JSON.stringify(result, null, 2), 'utf8');
  
  console.log(`\n완벽한 변환 완료!`);
  console.log(`- 총 ${convertedPersons.length}명 변환`);
  console.log(`- 결과 파일: perfect_converted_data.json`);
  console.log(`- 파일 크기: ${fs.statSync('perfect_converted_data.json').size} bytes`);
  
  // 변환 통계 출력
  const stats = {
    byGeneration: {},
    byLine: {},
    byStatus: {}
  };
  
  convertedPersons.forEach(person => {
    const gen = person.generation;
    stats.byGeneration[gen] = (stats.byGeneration[gen] || 0) + 1;
    
    const line = person.line;
    stats.byLine[line] = (stats.byLine[line] || 0) + 1;
    
    const status = person.status;
    stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
  });
  
  console.log('\n변환 통계:');
  console.log('세대별:', stats.byGeneration);
  console.log('Line별:', stats.byLine);
  console.log('상태별:', stats.byStatus);
  
  return result;
}

// 변환 실행
convertToPerfectJSON();

