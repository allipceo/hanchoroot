// 노션 데이터베이스 스키마 확인 (HTTPS 모듈 사용)
const https = require('https');
const fs = require('fs');
const path = require('path');

// .env 파일에서 API 키 로드
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const headers = {
  'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json'
};

function checkDatabaseSchema() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: '/v1/databases/2093284156fa404a911cbefa4b422994',
      method: 'GET',
      headers: headers
    };
    
    console.log('🔍 노션 데이터베이스 스키마 확인 중...');
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          console.log('\n📊 데이터베이스 정보:');
          console.log(`- 제목: ${response.title[0]?.plain_text || 'N/A'}`);
          console.log(`- ID: ${response.id}`);
          console.log(`- 생성일: ${response.created_time}`);
          console.log(`- 수정일: ${response.last_edited_time}`);

          console.log('\n🏗️ 데이터베이스 스키마 (필드 목록):');
          console.log('='.repeat(50));
          
          const properties = response.properties;
          let fieldCount = 0;
          let hasIdField = false;
          
          for (const [fieldName, fieldInfo] of Object.entries(properties)) {
            fieldCount++;
            console.log(`\n${fieldCount}. 필드명: "${fieldName}"`);
            console.log(`   타입: ${fieldInfo.type}`);
            
            // ID 필드 존재 여부 확인
            if (fieldName === 'ID' || fieldName === 'id' || fieldName === '아이디' || fieldName === 'ID_필드') {
              console.log('   ✅ ID 필드가 이미 존재합니다!');
              hasIdField = true;
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

          console.log('\n' + '='.repeat(50));
          console.log(`📈 총 필드 수: ${fieldCount}개`);
          
          if (hasIdField) {
            console.log('✅ ID 필드가 이미 존재합니다. 1.2 단계를 건너뛸 수 있습니다.');
          } else {
            console.log('❌ ID 필드가 존재하지 않습니다. 1.2 단계에서 ID 필드를 추가해야 합니다.');
          }
          
          resolve(response);
          
        } catch (error) {
          console.error('❌ JSON 파싱 오류:', error.message);
          console.error('응답 데이터:', data);
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ API 호출 오류:', error.message);
      reject(error);
    });
    
    req.end();
  });
}

// 실행
checkDatabaseSchema().catch(error => {
  console.error('❌ 스키마 확인 실패:', error.message);
});
