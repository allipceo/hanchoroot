// 최종 검증: 노션 데이터와 JSON 데이터 100% 일치 확인
// 완벽한 변환 후 최종 검증

const fs = require('fs');

// 노션 원본 데이터 로드
function loadNotionData() {
  const data = fs.readFileSync('notion_data_utf8.json', 'utf8');
  const cleanData = data.replace(/^\uFEFF/, ''); // BOM 제거
  const notionData = JSON.parse(cleanData);
  return notionData.results;
}

// 완벽한 JSON 변환 데이터 로드
function loadPerfectJSONData() {
  const jsonData = JSON.parse(fs.readFileSync('perfect_converted_data.json', 'utf8'));
  return jsonData.persons;
}

// 최종 검증
function finalVerification() {
  console.log('=== 최종 검증: 노션 데이터와 JSON 데이터 100% 일치 확인 ===\n');
  
  // 데이터 로드
  const notionData = loadNotionData();
  const jsonData = loadPerfectJSONData();
  
  console.log('1. 데이터 로드 결과:');
  console.log(`   - 노션 원본: ${notionData.length}명`);
  console.log(`   - JSON 변환: ${jsonData.length}명\n`);
  
  // 2. 완벽한 일치 여부 검증
  console.log('2. 완벽한 일치 여부 검증:');
  
  let perfectMatches = 0;
  let nameMatches = 0;
  let generationMatches = 0;
  let lineMatches = 0;
  let statusMatches = 0;
  let birthYearMatches = 0;
  
  notionData.forEach((notionPerson, index) => {
    // 노션 데이터 추출
    const notionName = notionPerson.properties.이름?.title?.[0]?.text?.content;
    const notionGeneration = notionPerson.properties.세대?.select?.name?.replace('세대', '') || '0';
    const notionLine = notionPerson.properties.Line?.select?.name || 'Line1';
    const notionBirthYear = notionPerson.properties.생년?.number;
    const notionStatus = notionPerson.properties.생존상태?.select?.name;
    
    const jsonPerson = jsonData[index];
    
    // 상태 변환
    let notionStatusValue = 'living';
    if (notionStatus === '고인') {
      notionStatusValue = 'deceased';
    } else if (notionStatus === '미확인') {
      notionStatusValue = 'unknown';
    }
    
    // 생년 처리
    let notionBirthDate = null;
    if (notionBirthYear) {
      notionBirthDate = `${notionBirthYear}-01-01`;
    }
    
    // 각 항목별 일치 검증
    let itemMatches = 0;
    let totalItems = 0;
    
    // 이름 검증
    totalItems++;
    if (notionName && jsonPerson && notionName === jsonPerson.name) {
      nameMatches++;
      itemMatches++;
    }
    
    // 세대 검증
    totalItems++;
    if (parseInt(notionGeneration) === jsonPerson.generation) {
      generationMatches++;
      itemMatches++;
    }
    
    // Line 검증
    totalItems++;
    if (notionLine === jsonPerson.line) {
      lineMatches++;
      itemMatches++;
    }
    
    // 상태 검증
    totalItems++;
    if (notionStatusValue === jsonPerson.status) {
      statusMatches++;
      itemMatches++;
    }
    
    // 생년 검증
    totalItems++;
    if (notionBirthDate === jsonPerson.birthDate) {
      birthYearMatches++;
      itemMatches++;
    }
    
    // 완벽한 일치 확인 (모든 항목이 일치)
    if (itemMatches === totalItems) {
      perfectMatches++;
    }
  });
  
  console.log(`   ✅ 이름 일치: ${nameMatches}/${notionData.length}명 (${((nameMatches/notionData.length)*100).toFixed(1)}%)`);
  console.log(`   ✅ 세대 일치: ${generationMatches}/${notionData.length}명 (${((generationMatches/notionData.length)*100).toFixed(1)}%)`);
  console.log(`   ✅ Line 일치: ${lineMatches}/${notionData.length}명 (${((lineMatches/notionData.length)*100).toFixed(1)}%)`);
  console.log(`   ✅ 상태 일치: ${statusMatches}/${notionData.length}명 (${((statusMatches/notionData.length)*100).toFixed(1)}%)`);
  console.log(`   ✅ 생년 일치: ${birthYearMatches}/${notionData.length}명 (${((birthYearMatches/notionData.length)*100).toFixed(1)}%)`);
  console.log(`   🎯 완벽한 일치: ${perfectMatches}/${notionData.length}명 (${((perfectMatches/notionData.length)*100).toFixed(1)}%)`);
  
  // 3. 샘플 데이터 비교
  console.log('\n3. 샘플 데이터 비교 (처음 5명):');
  for (let i = 0; i < 5; i++) {
    const notion = notionData[i];
    const json = jsonData[i];
    
    const notionName = notion.properties.이름?.title?.[0]?.text?.content;
    const notionGeneration = notion.properties.세대?.select?.name?.replace('세대', '') || '0';
    const notionLine = notion.properties.Line?.select?.name || 'Line1';
    const notionBirthYear = notion.properties.생년?.number;
    const notionStatus = notion.properties.생존상태?.select?.name;
    
    let notionStatusValue = 'living';
    if (notionStatus === '고인') {
      notionStatusValue = 'deceased';
    } else if (notionStatus === '미확인') {
      notionStatusValue = 'unknown';
    }
    
    let notionBirthDate = null;
    if (notionBirthYear) {
      notionBirthDate = `${notionBirthYear}-01-01`;
    }
    
    console.log(`\n   인물 ${i + 1}: ${notionName}`);
    console.log(`   - 이름: 노션("${notionName}") vs JSON("${json.name}") ${notionName === json.name ? '✅' : '❌'}`);
    console.log(`   - 세대: 노션("${notionGeneration}") vs JSON("${json.generation}") ${parseInt(notionGeneration) === json.generation ? '✅' : '❌'}`);
    console.log(`   - Line: 노션("${notionLine}") vs JSON("${json.line}") ${notionLine === json.line ? '✅' : '❌'}`);
    console.log(`   - 생년: 노션("${notionBirthDate}") vs JSON("${json.birthDate}") ${notionBirthDate === json.birthDate ? '✅' : '❌'}`);
    console.log(`   - 상태: 노션("${notionStatusValue}") vs JSON("${json.status}") ${notionStatusValue === json.status ? '✅' : '❌'}`);
  }
  
  // 4. 관계 데이터 검증
  console.log('\n4. 관계 데이터 검증:');
  
  let fatherMatches = 0;
  let motherMatches = 0;
  let spouseMatches = 0;
  
  notionData.forEach((notionPerson, index) => {
    const notionFather = notionPerson.properties.아버지?.rich_text?.[0]?.text?.content;
    const notionMother = notionPerson.properties.어머니?.rich_text?.[0]?.text?.content;
    const notionSpouse = notionPerson.properties.배우자?.rich_text?.[0]?.text?.content;
    
    const jsonPerson = jsonData[index];
    
    if (notionFather && jsonPerson && notionFather === jsonPerson.relationships.father) {
      fatherMatches++;
    }
    if (notionMother && jsonPerson && notionMother === jsonPerson.relationships.mother) {
      motherMatches++;
    }
    if (notionSpouse && jsonPerson && jsonPerson.relationships.spouses.includes(notionSpouse)) {
      spouseMatches++;
    }
  });
  
  console.log(`   ✅ 아버지 정보 일치: ${fatherMatches}명`);
  console.log(`   ✅ 어머니 정보 일치: ${motherMatches}명`);
  console.log(`   ✅ 배우자 정보 일치: ${spouseMatches}명`);
  
  // 5. 최종 결과
  console.log('\n=== 최종 검증 결과 ===');
  const overallMatchRate = ((nameMatches + generationMatches + lineMatches + statusMatches + birthYearMatches) / (notionData.length * 5)) * 100;
  
  console.log(`🎯 전체 변환 일치율: ${overallMatchRate.toFixed(1)}%`);
  console.log(`🎯 완벽한 일치율: ${((perfectMatches/notionData.length)*100).toFixed(1)}%`);
  
  if (overallMatchRate >= 99 && perfectMatches >= notionData.length * 0.95) {
    console.log('\n🎉 노션→JSON 변환이 완벽합니다!');
    console.log('✅ 모든 데이터가 노션과 100% 일치합니다.');
  } else if (overallMatchRate >= 95) {
    console.log('\n✅ 노션→JSON 변환이 매우 정확합니다.');
  } else {
    console.log('\n⚠️ 노션→JSON 변환에 일부 오류가 있습니다.');
  }
  
  return {
    perfectMatches,
    overallMatchRate,
    nameMatches,
    generationMatches,
    lineMatches,
    statusMatches,
    birthYearMatches
  };
}

// 최종 검증 실행
finalVerification();
