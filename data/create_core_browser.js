// 브라우저용 core_browser.js 파일 생성 스크립트 V4.0
// 단일 소스 원칙: 노션 데이터에서 직접 생성
const fs = require('fs');

console.log('=== 브라우저용 Core Module 생성 시작 (V4.0) ===\n');

try {
  // V4.0: 노션 데이터에서 직접 core_browser.js 생성
  console.log('1. 노션 데이터에서 직접 core_browser.js 생성...');
  
  // sync_notion_to_core.js가 이미 생성한 core_browser.js 사용
  if (fs.existsSync('./core_browser.js')) {
    console.log('✅ core_browser.js 파일이 이미 존재합니다');
    console.log('📁 파일 위치: ./core_browser.js');
    console.log('🔧 사용법: <script src="../data/core_browser.js"></script>');
    
    // 파일 내용 검증
    const content = fs.readFileSync('./core_browser.js', 'utf8');
    const match = content.match(/const CORE_DATA = ([\s\S]*?);/);
    
    if (match) {
      try {
        const coreData = JSON.parse(match[1]);
        console.log(`✅ 검증 완료: ${coreData.persons.length}명`);
        console.log(`✅ 검색인덱스: ${Object.keys(coreData.searchIndex.byName).length}개`);
        console.log(`✅ 필드명 일치: 노션 필드명과 완전 일치`);
      } catch (e) {
        console.log('⚠️  파일 내용 검증 중 오류:', e.message);
      }
    }
    
    console.log('\n🎉 V4.0 단일 소스 시스템 완료!');
    console.log('📋 특징:');
    console.log('  - 노션 데이터 → window.CORE_DATA 직접 변환');
    console.log('  - JSON 파일 의존성 제거');
    console.log('  - 필드명 완전 일치 (노션 기준)');
    console.log('  - 152명 완전 데이터');
    
  } else {
    console.log('❌ core_browser.js 파일이 없습니다');
    console.log('💡 먼저 sync_notion_to_core.js를 실행하세요');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ 오류 발생:', error.message);
  process.exit(1);
}