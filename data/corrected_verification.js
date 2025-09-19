// 수정된 노션 데이터와 JSON 파일 일치 여부 검증 스크립트
// 정확한 노션 필드명으로 재검증

const fs = require('fs');

// 노션 원본 데이터 로드
function loadNotionData() {
  const data = fs.readFileSync('notion_data_utf8.json', 'utf8');
  const cleanData = data.replace(/^\uFEFF/, ''); // BOM 제거
  const notionData = JSON.parse(cleanData);
  return notionData.results;
}

// JSON 변환 데이터 로드
function loadJSONData() {
  const jsonData = JSON.parse(fs.readFileSync('converted_full_data.json', 'utf8'));
  return jsonData.persons;
}

// 데이터 일치 여부 검증
function verifyCorrectedConsistency() {
  console.log('=== 수정된 노션 데이터와 JSON 파일 일치 여부 검증 ===\n');
  
  // 데이터 로드
  const notionData = loadNotionData();
  const jsonData = loadJSONData();
  
  console.log('1. 데이터 로드 결과:');
  console.log(`   - 노션 원본: ${notionData.length}명`);
  console.log(`   - JSON 변환: ${jsonData.length}명\n`);
  
  // 노션 필드명 확인
  console.log('2. 노션 필드명 확인:');
  const firstPerson = notionData[0];
  console.log('   노션 필드명:', Object.keys(firstPerson.properties));
  console.log('   JSON 필드명:', Object.keys(jsonData[0]));
  
  // 3. 기본 정보 일치 여부 검증 (정확한 필드명 사용)
  console.log('\n3. 기본 정보 일치 여부 검증:');
  
  let nameMatches = 0;
  let nameMismatches = [];
  let generationMatches = 0;
  let generationMismatches = [];
  let lineMatches = 0;
  let lineMismatches = [];
  let birthYearMatches = 0;
  let birthYearMismatches = [];
  let statusMatches = 0;
  let statusMismatches = [];
  
  notionData.forEach((notionPerson, index) => {
    // 정확한 노션 필드명 사용
    const notionName = notionPerson.properties.이름?.title?.[0]?.text?.content;
    const notionGeneration = notionPerson.properties.세대?.select?.name?.replace('세대', '');
    const notionLine = notionPerson.properties.Line1?.select?.name; // Line1 필드 사용
    const notionBirthYear = notionPerson.properties.생년?.number;
    const notionStatus = notionPerson.properties.생존상태?.select?.name; // 생존상태 필드 사용
    
    const jsonPerson = jsonData[index];
    
    // 이름 일치 검증
    if (notionName && jsonPerson && notionName === jsonPerson.name) {
      nameMatches++;
    } else {
      nameMismatches.push({
        index: index,
        notionName: notionName,
        jsonName: jsonPerson?.name
      });
    }
    
    // 세대 일치 검증
    if (notionGeneration && jsonPerson && parseInt(notionGeneration) === jsonPerson.generation) {
      generationMatches++;
    } else {
      generationMismatches.push({
        index: index,
        notionName: notionName,
        notionGeneration: notionGeneration,
        jsonGeneration: jsonPerson?.generation
      });
    }
    
    // Line 일치 검증
    if (notionLine && jsonPerson && notionLine === jsonPerson.line) {
      lineMatches++;
    } else {
      lineMismatches.push({
        index: index,
        notionName: notionName,
        notionLine: notionLine,
        jsonLine: jsonPerson?.line
      });
    }
    
    // 생년 일치 검증
    if (notionBirthYear && jsonPerson && jsonPerson.birthDate) {
      const jsonBirthYear = parseInt(jsonPerson.birthDate.substring(0, 4));
      if (notionBirthYear === jsonBirthYear) {
        birthYearMatches++;
      } else {
        birthYearMismatches.push({
          index: index,
          notionName: notionName,
          notionBirthYear: notionBirthYear,
          jsonBirthYear: jsonBirthYear
        });
      }
    }
    
    // 상태 일치 검증
    let notionStatusValue = 'living'; // 기본값
    if (notionStatus === '고인') {
      notionStatusValue = 'deceased';
    }
    
    if (jsonPerson && notionStatusValue === jsonPerson.status) {
      statusMatches++;
    } else {
      statusMismatches.push({
        index: index,
        notionName: notionName,
        notionStatus: notionStatus,
        notionStatusValue: notionStatusValue,
        jsonStatus: jsonPerson?.status
      });
    }
  });
  
  console.log(`   ✅ 이름 일치: ${nameMatches}/${notionData.length}명 (${((nameMatches/notionData.length)*100).toFixed(1)}%)`);
  console.log(`   ✅ 세대 일치: ${generationMatches}/${notionData.length}명 (${((generationMatches/notionData.length)*100).toFixed(1)}%)`);
  console.log(`   ✅ Line 일치: ${lineMatches}/${notionData.length}명 (${((lineMatches/notionData.length)*100).toFixed(1)}%)`);
  console.log(`   ✅ 생년 일치: ${birthYearMatches}/${notionData.length}명 (${((birthYearMatches/notionData.length)*100).toFixed(1)}%)`);
  console.log(`   ✅ 상태 일치: ${statusMatches}/${notionData.length}명 (${((statusMatches/notionData.length)*100).toFixed(1)}%)`);
  
  // 4. 불일치 사례 상세 분석
  if (nameMismatches.length > 0) {
    console.log('\n4. 이름 불일치 사례 (처음 5개):');
    nameMismatches.slice(0, 5).forEach(mismatch => {
      console.log(`   - 인덱스 ${mismatch.index}: 노션("${mismatch.notionName}") vs JSON("${mismatch.jsonName}")`);
    });
  }
  
  if (generationMismatches.length > 0) {
    console.log('\n5. 세대 불일치 사례 (처음 5개):');
    generationMismatches.slice(0, 5).forEach(mismatch => {
      console.log(`   - ${mismatch.notionName}: 노션("${mismatch.notionGeneration}") vs JSON("${mismatch.jsonGeneration}")`);
    });
  }
  
  if (lineMismatches.length > 0) {
    console.log('\n6. Line 불일치 사례 (처음 5개):');
    lineMismatches.slice(0, 5).forEach(mismatch => {
      console.log(`   - ${mismatch.notionName}: 노션("${mismatch.notionLine}") vs JSON("${mismatch.jsonLine}")`);
    });
  }
  
  if (birthYearMismatches.length > 0) {
    console.log('\n7. 생년 불일치 사례 (처음 5개):');
    birthYearMismatches.slice(0, 5).forEach(mismatch => {
      console.log(`   - ${mismatch.notionName}: 노션("${mismatch.notionBirthYear}") vs JSON("${mismatch.jsonBirthYear}")`);
    });
  }
  
  if (statusMismatches.length > 0) {
    console.log('\n8. 상태 불일치 사례 (처음 5개):');
    statusMismatches.slice(0, 5).forEach(mismatch => {
      console.log(`   - ${mismatch.notionName}: 노션("${mismatch.notionStatus}") vs JSON("${mismatch.jsonStatus}")`);
    });
  }
  
  // 5. 관계 데이터 검증
  console.log('\n9. 관계 데이터 검증:');
  
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
  
  // 6. 연락처 정보 검증
  console.log('\n10. 연락처 정보 검증:');
  
  let phoneMatches = 0;
  let emailMatches = 0;
  let addressMatches = 0;
  
  notionData.forEach((notionPerson, index) => {
    const notionPhone = notionPerson.properties.연락처?.rich_text?.[0]?.text?.content;
    const notionEmail = notionPerson.properties.이메일?.rich_text?.[0]?.text?.content;
    const notionAddress = notionPerson.properties.주소?.rich_text?.[0]?.text?.content;
    
    const jsonPerson = jsonData[index];
    
    if (notionPhone && jsonPerson && notionPhone === jsonPerson.contact.phone) {
      phoneMatches++;
    }
    if (notionEmail && jsonPerson && notionEmail === jsonPerson.contact.email) {
      emailMatches++;
    }
    if (notionAddress && jsonPerson && notionAddress === jsonPerson.contact.address) {
      addressMatches++;
    }
  });
  
  console.log(`   ✅ 전화번호 일치: ${phoneMatches}명`);
  console.log(`   ✅ 이메일 일치: ${emailMatches}명`);
  console.log(`   ✅ 주소 일치: ${addressMatches}명`);
  
  // 7. 검증 결과 요약
  console.log('\n=== 검증 결과 요약 ===');
  console.log(`✅ 노션→JSON 변환 일치율: ${((nameMatches/notionData.length)*100).toFixed(1)}%`);
  console.log(`✅ 세대 정보 일치율: ${((generationMatches/notionData.length)*100).toFixed(1)}%`);
  console.log(`✅ Line 정보 일치율: ${((lineMatches/notionData.length)*100).toFixed(1)}%`);
  console.log(`✅ 생년 정보 일치율: ${((birthYearMatches/notionData.length)*100).toFixed(1)}%`);
  console.log(`✅ 상태 정보 일치율: ${((statusMatches/notionData.length)*100).toFixed(1)}%`);
  
  // 8. 전체 일치율 계산
  const totalMatches = nameMatches + generationMatches + lineMatches + birthYearMatches + statusMatches;
  const totalPossible = notionData.length * 5; // 이름, 세대, Line, 생년, 상태
  const overallMatchRate = (totalMatches / totalPossible) * 100;
  
  console.log(`\n🎯 전체 변환 일치율: ${overallMatchRate.toFixed(1)}%`);
  
  if (overallMatchRate >= 95) {
    console.log('\n🎉 노션→JSON 변환이 매우 정확합니다!');
  } else if (overallMatchRate >= 90) {
    console.log('\n✅ 노션→JSON 변환이 정확합니다.');
  } else if (overallMatchRate >= 80) {
    console.log('\n⚠️ 노션→JSON 변환에 일부 오류가 있습니다.');
  } else {
    console.log('\n❌ 노션→JSON 변환에 심각한 오류가 있습니다.');
  }
  
  // 9. 샘플 데이터 비교
  console.log('\n11. 샘플 데이터 비교 (처음 3명):');
  for (let i = 0; i < 3; i++) {
    const notion = notionData[i];
    const json = jsonData[i];
    
    console.log(`\n   인물 ${i + 1}:`);
    console.log(`   - 이름: 노션("${notion.properties.이름?.title?.[0]?.text?.content}") vs JSON("${json.name}")`);
    console.log(`   - 세대: 노션("${notion.properties.세대?.select?.name}") vs JSON("${json.generation}")`);
    console.log(`   - Line: 노션("${notion.properties.Line1?.select?.name}") vs JSON("${json.line}")`);
    console.log(`   - 생년: 노션("${notion.properties.생년?.number}") vs JSON("${json.birthDate}")`);
    console.log(`   - 상태: 노션("${notion.properties.생존상태?.select?.name}") vs JSON("${json.status}")`);
  }
  
  return {
    nameMatches,
    generationMatches,
    lineMatches,
    birthYearMatches,
    statusMatches,
    overallMatchRate
  };
}

// 검증 실행
verifyCorrectedConsistency();



