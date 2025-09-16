// 노션 데이터베이스에 ID 필드 추가 스크립트
// Notion API를 통해 데이터베이스 스키마에 ID 필드 추가

const { Client } = require('@notionhq/client');
const path = require('path');

// .env 파일 로드
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// 환경변수에서 API 키 로드
const notion = new Client({
    auth: process.env.NOTION_API_KEY
});

// 데이터베이스 ID
const DATABASE_ID = '2093284156fa404a911cbefa4b422994';

// ID 필드 추가 함수
async function addIdFieldToNotion() {
    console.log('🔄 노션 데이터베이스에 ID 필드 추가 시작...');
    
    try {
        // 현재 데이터베이스 스키마 조회
        console.log('📋 현재 데이터베이스 스키마 조회 중...');
        const database = await notion.databases.retrieve({
            database_id: DATABASE_ID
        });
        
        console.log('현재 필드들:', Object.keys(database.properties));
        
        // ID 필드가 이미 있는지 확인
        if (database.properties['ID']) {
            console.log('✅ ID 필드가 이미 존재합니다.');
            return;
        }
        
        // ID 필드 추가
        console.log('➕ ID 필드 추가 중...');
        const updatedDatabase = await notion.databases.update({
            database_id: DATABASE_ID,
            properties: {
                'ID': {
                    title: {
                        type: 'rich_text'
                    }
                }
            }
        });
        
        console.log('✅ ID 필드 추가 완료!');
        console.log('새로운 필드:', Object.keys(updatedDatabase.properties));
        
    } catch (error) {
        console.error('❌ ID 필드 추가 실패:', error.message);
        
        if (error.code === 'validation_error') {
            console.log('💡 해결 방법:');
            console.log('   1. 노션에서 수동으로 ID 필드 추가');
            console.log('   2. 필드 타입: 텍스트 (Text)');
            console.log('   3. 필드명: ID');
        }
        
        throw error;
    }
}

// ID 값들을 노션에 업데이트하는 함수
async function updateIdsInNotion() {
    console.log('🔄 노션에 ID 값 업데이트 시작...');
    
    try {
        // 생성된 ID 데이터 로드
        const fs = require('fs');
        const path = require('path');
        const idDataPath = path.join(__dirname, 'notion_data_with_ids.json');
        const idData = JSON.parse(fs.readFileSync(idDataPath, 'utf8'));
        
        console.log(`📊 총 ${idData.length}명의 ID 업데이트 시작`);
        
        // 배치 처리 (한 번에 100개씩)
        const batchSize = 100;
        let successCount = 0;
        let errorCount = 0;
        
        for (let i = 0; i < idData.length; i += batchSize) {
            const batch = idData.slice(i, i + batchSize);
            
            console.log(`📦 배치 ${Math.floor(i / batchSize) + 1} 처리 중... (${i + 1}-${Math.min(i + batchSize, idData.length)})`);
            
            // 각 배치의 페이지들을 병렬로 업데이트
            const updatePromises = batch.map(async (person) => {
                try {
                    // 노션 페이지 ID 찾기 (이름으로 검색)
                    const searchResponse = await notion.databases.query({
                        database_id: DATABASE_ID,
                        filter: {
                            property: '이름',
                            title: {
                                equals: person.name
                            }
                        }
                    });
                    
                    if (searchResponse.results.length === 0) {
                        console.log(`⚠️  ${person.name} 페이지를 찾을 수 없습니다.`);
                        return false;
                    }
                    
                    const pageId = searchResponse.results[0].id;
                    
                    // ID 필드 업데이트
                    await notion.pages.update({
                        page_id: pageId,
                        properties: {
                            'ID': {
                                rich_text: [
                                    {
                                        text: {
                                            content: person.id
                                        }
                                    }
                                ]
                            }
                        }
                    });
                    
                    console.log(`✅ ${person.name} → ${person.id}`);
                    return true;
                    
                } catch (error) {
                    console.error(`❌ ${person.name} 업데이트 실패:`, error.message);
                    return false;
                }
            });
            
            // 배치 결과 대기
            const results = await Promise.all(updatePromises);
            successCount += results.filter(r => r).length;
            errorCount += results.filter(r => !r).length;
            
            // API 제한을 위한 대기
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        console.log(`✅ ID 업데이트 완료!`);
        console.log(`📈 성공: ${successCount}명, 실패: ${errorCount}명`);
        
    } catch (error) {
        console.error('❌ ID 업데이트 실패:', error.message);
        throw error;
    }
}

// 메인 실행 함수
async function main() {
    console.log('🏠 노션 ID 필드 추가 및 업데이트 시스템');
    console.log('==========================================');
    
    try {
        // 1. ID 필드 추가
        await addIdFieldToNotion();
        console.log('');
        
        // 2. ID 값 업데이트
        await updateIdsInNotion();
        
        console.log('');
        console.log('🎉 노션 ID 시스템 구축 완료!');
        console.log('📋 다음 단계:');
        console.log('   1. 윈도우코어 데이터 동기화');
        console.log('   2. ID 시스템 검증 및 테스트');
        
    } catch (error) {
        console.error('💥 작업 실패:', error.message);
        process.exit(1);
    }
}

// 스크립트 실행
if (require.main === module) {
    main();
}

module.exports = {
    addIdFieldToNotion,
    updateIdsInNotion
};
