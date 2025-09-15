// 동일한 이름을 가진 인원들 확인
const fs = require('fs');

console.log('🔍 동일한 이름을 가진 인원들 확인...');

// 노션 데이터 로드
const notionData = JSON.parse(fs.readFileSync('notion_data_with_ids.json', 'utf8'));
console.log(`📊 노션 데이터: ${notionData.length}명`);

// 이름별로 그룹화
const nameGroups = {};
notionData.forEach(person => {
  const name = person.name;
  if (!nameGroups[name]) {
    nameGroups[name] = [];
  }
  nameGroups[name].push(person);
});

// 중복 이름 찾기
const duplicateNames = Object.keys(nameGroups).filter(name => nameGroups[name].length > 1);

console.log(`\n📊 중복 이름 통계:`);
console.log(`총 인원: ${notionData.length}명`);
console.log(`고유 이름: ${Object.keys(nameGroups).length}개`);
console.log(`중복 이름: ${duplicateNames.length}개`);

if (duplicateNames.length > 0) {
  console.log('\n🔍 중복 이름 상세:');
  duplicateNames.forEach(name => {
    const persons = nameGroups[name];
    console.log(`\n📝 ${name} (${persons.length}명):`);
    persons.forEach((person, index) => {
      console.log(`  ${index + 1}. ID: ${person.id}`);
      console.log(`     부모: ${person.relationships?.father || '미상'} - ${person.relationships?.mother || '미상'}`);
      console.log(`     Line1: ${person.Line1}, 세대: ${person.세대}`);
    });
  });
}

// 조윤희 특별 확인
if (nameGroups['조윤희']) {
  console.log('\n🎯 조윤희 상세 정보:');
  nameGroups['조윤희'].forEach((person, index) => {
    console.log(`\n${index + 1}. 조윤희 (ID: ${person.id}):`);
    console.log(`   부모: ${person.relationships?.father || '미상'} - ${person.relationships?.mother || '미상'}`);
    console.log(`   Line1: ${person.Line1}, 세대: ${person.세대}`);
    console.log(`   성별: ${person.성별}`);
  });
}

console.log('\n✅ 중복 이름 확인 완료!');
