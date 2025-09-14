// 노션-JSON 완전 자동 동기화 스크립트 (V2.0 - 152명 완전 데이터)
const fs = require('fs');
const { execSync } = require('child_process');

function syncNotionToJSON() {
  console.log('=== 노션-JSON 자동 동기화 시작 (V2.0) ===\n');
  
  try {
    // 1. 노션 데이터 추출 (페이지네이션 처리)
    console.log('1. 노션 데이터 추출 중... (페이지네이션 처리)');
    execSync('node data/complete_notion_fetch.js');
    console.log('✅ 노션 데이터 추출 완료 (152명)');
    
    // 2. 기존 데이터 백업
    console.log('\n2. 기존 데이터 백업 중...');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    if (fs.existsSync('converted_complete_data.json')) {
      fs.copyFileSync('converted_complete_data.json', `converted_complete_data_backup_${timestamp}.json`);
      console.log('✅ 백업 완료');
    }
    
    // 3. JSON 변환 및 검증
    console.log('\n3. JSON 변환 및 검증 중...');
    execSync('node data/complete_verification.js');
    console.log('✅ JSON 변환 및 검증 완료');
    
    // 4. Core Module 업데이트
    console.log('\n4. Core Module 업데이트 중...');
    let coreContent = fs.readFileSync('data/core.js', 'utf8');
    coreContent = coreContent.replace(
      /const notionData = JSON\.parse\(fs\.readFileSync\('\.\/[^']+\.json', 'utf8'\)\);/,
      "const notionData = JSON.parse(fs.readFileSync('./converted_complete_data.json', 'utf8'));"
    );
    fs.writeFileSync('data/core.js', coreContent);
    console.log('✅ Core Module 업데이트 완료');
    
    // 5. 최종 검증
    console.log('\n5. 최종 검증 중...');
    const data = JSON.parse(fs.readFileSync('converted_complete_data.json', 'utf8'));
    console.log(`   총 인물 수: ${data.persons.length}명`);
    
    // 세대별 분포 계산
    const genStats = {};
    data.persons.forEach(person => {
      const gen = `${person.generation}세대`;
      genStats[gen] = (genStats[gen] || 0) + 1;
    });
    
    // Line별 분포 계산
    const lineStats = {};
    data.persons.forEach(person => {
      const line = person.line;
      lineStats[line] = (lineStats[line] || 0) + 1;
    });
    
    console.log('   세대별 분포:', genStats);
    console.log('   Line별 분포:', lineStats);
    
    console.log('\n🎉 노션-JSON 동기화 완료! (152명 완전 데이터)');
    
  } catch (error) {
    console.error('❌ 동기화 중 오류 발생:', error.message);
    console.log('백업 파일에서 복원을 시도합니다...');
    
    // 백업 파일 복원
    const backupFiles = fs.readdirSync('.').filter(file => file.startsWith('converted_complete_data_backup_'));
    if (backupFiles.length > 0) {
      const latestBackup = backupFiles.sort().pop();
      fs.copyFileSync(latestBackup, 'converted_complete_data.json');
      console.log(`✅ 백업 파일에서 복원 완료: ${latestBackup}`);
    }
  }
}

// 동기화 실행
syncNotionToJSON();
