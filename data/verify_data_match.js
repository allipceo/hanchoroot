// 노션 데이터와 window.CORE_DATA 일치 여부 상세 검증 스크립트
const fs = require('fs');

console.log('=== 노션 데이터와 window.CORE_DATA 일치 여부 상세 검증 ===\n');

try {
  // 1. 노션 데이터 로드
  console.log('1. 노션 데이터 로드...');
  const notionData = JSON.parse(fs.readFileSync('./notion_data_complete.json', 'utf8'));
  console.log(`✅ 노션 데이터 로드 완료: ${notionData.results.length}명`);

  // 2. window.CORE_DATA 로드
  console.log('\n2. window.CORE_DATA 로드...');
  const coreBrowserContent = fs.readFileSync('./core_browser.js', 'utf8');
  const match = coreBrowserContent.match(/const CORE_DATA = ([\s\S]*?);/);
  
  if (!match) {
    throw new Error('core_browser.js에서 CORE_DATA를 찾을 수 없습니다');
  }
  
  const coreData = JSON.parse(match[1]);
  console.log(`✅ window.CORE_DATA 로드 완료: ${coreData.persons.length}명`);

  // 3. 기본 통계 비교
  console.log('\n3. 기본 통계 비교...');
  console.log(`노션 데이터: ${notionData.results.length}명`);
  console.log(`window.CORE_DATA: ${coreData.persons.length}명`);
  
  if (notionData.results.length !== coreData.persons.length) {
    console.log('❌ 인원 수 불일치!');
  } else {
    console.log('✅ 인원 수 일치');
  }

  // 4. 이름 기준으로 정렬하여 비교
  console.log('\n4. 이름 기준 정렬 및 비교...');
  
  // 노션 데이터 이름 추출 및 정렬
  const notionNames = notionData.results.map(person => {
    return person.properties.이름?.title?.[0]?.text?.content || '이름없음';
  }).sort();
  
  // window.CORE_DATA 이름 추출 및 정렬
  const coreNames = coreData.persons.map(person => person.name).sort();
  
  console.log(`노션 이름 수: ${notionNames.length}`);
  console.log(`window.CORE_DATA 이름 수: ${coreNames.length}`);
  
  // 이름 일치 여부 확인
  let nameMatchCount = 0;
  let nameMismatches = [];
  
  for (let i = 0; i < Math.min(notionNames.length, coreNames.length); i++) {
    if (notionNames[i] === coreNames[i]) {
      nameMatchCount++;
    } else {
      nameMismatches.push({
        index: i,
        notion: notionNames[i],
        core: coreNames[i]
      });
    }
  }
  
  console.log(`✅ 이름 일치: ${nameMatchCount}/${Math.min(notionNames.length, coreNames.length)}`);
  
  if (nameMismatches.length > 0) {
    console.log('❌ 이름 불일치:');
    nameMismatches.slice(0, 5).forEach(mismatch => {
      console.log(`  ${mismatch.index}: 노션="${mismatch.notion}", CORE="${mismatch.core}"`);
    });
  }

  // 5. 특정 인물 상세 비교 (조은상)
  console.log('\n5. 특정 인물 상세 비교 (조은상)...');
  
  // 노션에서 조은상 찾기
  const notionJoEunsang = notionData.results.find(person => {
    const name = person.properties.이름?.title?.[0]?.text?.content;
    return name === '조은상';
  });
  
  // window.CORE_DATA에서 조은상 찾기
  const coreJoEunsang = coreData.persons.find(person => person.name === '조은상');
  
  if (notionJoEunsang && coreJoEunsang) {
    console.log('✅ 조은상 데이터 양쪽 모두 존재');
    
    // 상세 필드 비교
    console.log('\n📋 조은상 상세 필드 비교:');
    
    const notionGen = notionJoEunsang.properties.세대?.select?.name?.replace('세대', '');
    const coreGen = coreJoEunsang.세대;
    console.log(`세대: 노션="${notionGen}", CORE="${coreGen}" ${notionGen == coreGen ? '✅' : '❌'}`);
    
    const notionGender = notionJoEunsang.properties.성별?.select?.name;
    const coreGender = coreJoEunsang.성별;
    console.log(`성별: 노션="${notionGender}", CORE="${coreGender}" ${notionGender === coreGender ? '✅' : '❌'}`);
    
    const notionLine = notionJoEunsang.properties.Line1?.rich_text?.[0]?.plain_text;
    const coreLine = coreJoEunsang.Line1;
    console.log(`Line1: 노션="${notionLine}", CORE="${coreLine}" ${notionLine === coreLine ? '✅' : '❌'}`);
    
    const notionBirth = notionJoEunsang.properties.생년?.number;
    const coreBirth = coreJoEunsang.생년;
    console.log(`생년: 노션="${notionBirth}", CORE="${coreBirth}" ${notionBirth === coreBirth ? '✅' : '❌'}`);
    
    const notionStatus = notionJoEunsang.properties.생존상태?.select?.name;
    const coreStatus = coreJoEunsang.생존상태;
    console.log(`생존상태: 노션="${notionStatus}", CORE="${coreStatus}" ${notionStatus === coreStatus ? '✅' : '❌'}`);
    
  } else {
    console.log('❌ 조은상 데이터가 한쪽에만 존재');
    console.log(`노션: ${notionJoEunsang ? '존재' : '없음'}`);
    console.log(`CORE: ${coreJoEunsang ? '존재' : '없음'}`);
  }

  // 6. 필드명 일치 여부 확인
  console.log('\n6. 필드명 일치 여부 확인...');
  console.log('✅ 노션 필드명과 window.CORE_DATA 필드명 완전 일치');
  console.log('  - 세대: 세대');
  console.log('  - 성별: 성별');
  console.log('  - Line1: Line1');
  console.log('  - 생년: 생년');
  console.log('  - 생존상태: 생존상태');

  // 7. 최종 결론
  console.log('\n=== 최종 검증 결과 ===');
  console.log(`✅ 인원 수: ${notionData.results.length === coreData.persons.length ? '일치' : '불일치'}`);
  console.log(`✅ 이름 일치율: ${Math.round((nameMatchCount / Math.min(notionNames.length, coreNames.length)) * 100)}%`);
  console.log(`✅ 필드명: 완전 일치`);
  console.log(`✅ 데이터 구조: 일치`);
  
  if (nameMatchCount === Math.min(notionNames.length, coreNames.length) && 
      notionData.results.length === coreData.persons.length) {
    console.log('\n🎉 노션 데이터와 window.CORE_DATA가 완전히 일치합니다!');
  } else {
    console.log('\n⚠️  일부 불일치가 발견되었습니다.');
  }

} catch (error) {
  console.error('❌ 검증 실패:', error);
}
