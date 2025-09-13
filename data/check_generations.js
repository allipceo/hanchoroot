// 세대별 명단 확인 스크립트
const fs = require('fs');

function readJsonFile(filename) {
  const data = fs.readFileSync(filename, 'utf8');
  const cleanData = data.replace(/^\uFEFF/, '');
  return JSON.parse(cleanData);
}

function checkGenerations() {
  console.log('=== 노션 데이터베이스 세대별 명단 확인 ===\n');
  
  const data = readJsonFile('notion_data_updated.json');
  
  // 세대별 분포 확인
  const genStats = {};
  data.results.forEach(person => {
    const gen = person.properties.세대?.select?.name || 'null';
    genStats[gen] = (genStats[gen] || 0) + 1;
  });
  
  console.log('세대별 분포:');
  Object.entries(genStats).forEach(([gen, count]) => {
    console.log(`${gen}: ${count}명`);
  });
  
  // 1세대 명단 확인
  console.log('\n=== 1세대 명단 ===');
  const firstGen = data.results.filter(person => person.properties.세대?.select?.name === '1세대');
  
  if (firstGen.length > 0) {
    console.log(`1세대 인물 수: ${firstGen.length}명\n`);
    firstGen.forEach((person, i) => {
      const name = person.properties.이름?.title?.[0]?.text?.content || '이름없음';
      const line = person.properties.Line1?.rich_text?.[0]?.text?.content || 'Line1';
      const gender = person.properties.성별?.select?.name || 'M';
      const status = person.properties.생존상태?.select?.name || '미확인';
      const birthYear = person.properties.생년?.number || null;
      const father = person.properties.아버지?.rich_text?.[0]?.text?.content || null;
      const mother = person.properties.어머니?.rich_text?.[0]?.text?.content || null;
      
      console.log(`${i+1}. ${name}`);
      console.log(`   Line: ${line}`);
      console.log(`   성별: ${gender}`);
      console.log(`   상태: ${status}`);
      console.log(`   생년: ${birthYear || '미상'}`);
      console.log(`   아버지: ${father || '미상'}`);
      console.log(`   어머니: ${mother || '미상'}`);
      console.log('');
    });
  } else {
    console.log('1세대 데이터가 없습니다.');
  }
  
  // 2세대, 3세대도 확인
  console.log('\n=== 2세대 명단 ===');
  const secondGen = data.results.filter(person => person.properties.세대?.select?.name === '2세대');
  if (secondGen.length > 0) {
    console.log(`2세대 인물 수: ${secondGen.length}명`);
    secondGen.forEach((person, i) => {
      const name = person.properties.이름?.title?.[0]?.text?.content || '이름없음';
      const line = person.properties.Line1?.rich_text?.[0]?.text?.content || 'Line1';
      console.log(`${i+1}. ${name} (Line: ${line})`);
    });
  } else {
    console.log('2세대 데이터가 없습니다.');
  }
  
  console.log('\n=== 3세대 명단 ===');
  const thirdGen = data.results.filter(person => person.properties.세대?.select?.name === '3세대');
  if (thirdGen.length > 0) {
    console.log(`3세대 인물 수: ${thirdGen.length}명`);
    thirdGen.forEach((person, i) => {
      const name = person.properties.이름?.title?.[0]?.text?.content || '이름없음';
      const line = person.properties.Line1?.rich_text?.[0]?.text?.content || 'Line1';
      console.log(`${i+1}. ${name} (Line: ${line})`);
    });
  } else {
    console.log('3세대 데이터가 없습니다.');
  }
}

checkGenerations();
