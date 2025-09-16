const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');
const path = require('path');

// .env 파일 로드
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Notion 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function checkNotionSchema() {
  try {
    console.log('🔍 노션 데이터베이스 스키마 확인 중...');
    
    // 데이터베이스 정보 조회
    const databaseId = process.env.NOTION_DATABASE_ID;
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });

    console.log('\n📊 데이터베이스 정보:');
    console.log(`- 제목: ${response.title[0]?.plain_text || 'N/A'}`);
    console.log(`- ID: ${response.id}`);
    console.log(`- 생성일: ${response.created_time}`);
    console.log(`- 수정일: ${response.last_edited_time}`);

    console.log('\n🏗️ 데이터베이스 스키마 (필드 목록):');
    console.log('=' * 50);
    
    const properties = response.properties;
    let fieldCount = 0;
    
    for (const [fieldName, fieldInfo] of Object.entries(properties)) {
      fieldCount++;
      console.log(`\n${fieldCount}. 필드명: "${fieldName}"`);
      console.log(`   타입: ${fieldInfo.type}`);
      
      // ID 필드 존재 여부 확인
      if (fieldName === 'ID' || fieldName === 'id') {
        console.log('   ✅ ID 필드가 이미 존재합니다!');
      }
      
      // 필드별 상세 정보
      switch (fieldInfo.type) {
        case 'title':
          console.log('   설명: 제목 필드 (기본)');
          break;
        case 'rich_text':
          console.log('   설명: 텍스트 필드');
          break;
        case 'select':
          console.log('   설명: 선택 필드');
          if (fieldInfo.select?.options) {
            console.log(`   옵션: ${fieldInfo.select.options.map(opt => opt.name).join(', ')}`);
          }
          break;
        case 'multi_select':
          console.log('   설명: 다중 선택 필드');
          if (fieldInfo.multi_select?.options) {
            console.log(`   옵션: ${fieldInfo.multi_select.options.map(opt => opt.name).join(', ')}`);
          }
          break;
        case 'number':
          console.log('   설명: 숫자 필드');
          break;
        case 'date':
          console.log('   설명: 날짜 필드');
          break;
        case 'checkbox':
          console.log('   설명: 체크박스 필드');
          break;
        default:
          console.log(`   설명: ${fieldInfo.type} 타입`);
      }
    }

    console.log('\n' + '=' * 50);
    console.log(`📈 총 필드 수: ${fieldCount}개`);
    
    // ID 필드 존재 여부 최종 확인
    const hasIdField = Object.keys(properties).some(name => 
      name === 'ID' || name === 'id' || name === '아이디' || name === 'ID_필드'
    );
    
    if (hasIdField) {
      console.log('✅ ID 필드가 이미 존재합니다. 1.2 단계를 건너뛸 수 있습니다.');
    } else {
      console.log('❌ ID 필드가 존재하지 않습니다. 1.2 단계에서 ID 필드를 추가해야 합니다.');
    }

  } catch (error) {
    console.error('❌ 스키마 확인 중 오류 발생:', error.message);
    if (error.code === 'unauthorized') {
      console.error('💡 API 키가 유효하지 않거나 권한이 없습니다.');
    } else if (error.code === 'object_not_found') {
      console.error('💡 데이터베이스 ID가 올바르지 않습니다.');
    }
  }
}

// 실행
checkNotionSchema();
