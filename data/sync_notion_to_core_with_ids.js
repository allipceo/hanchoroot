// 노션의 ID 데이터를 window.CORE_DATA와 완전 동기화
const https = require('https');
const fs = require('fs');

require('dotenv').config();
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = '2093284156fa404a911cbefa4b422994';

// Node.js에서 fetch() 사용을 위한 polyfill
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

// 노션에서 최신 데이터 가져오기 (ID 포함)
async function fetchNotionDataWithIds() {
  console.log('📡 노션에서 최신 데이터 가져오는 중...');
  
  const url = `https://api.notion.com/v1/databases/${DATABASE_ID}/query`;
  
  const headers = {
    "Authorization": `Bearer ${NOTION_API_KEY}`,
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
  };

  const data = {
    "page_size": 100
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP 오류: ${response.status}, 상세: ${JSON.stringify(errorData)}`);
    }

    const responseData = await response.json();
    console.log(`✅ 노션 데이터 가져오기 성공: ${responseData.results.length}명`);
    return responseData.results;
  } catch (error) {
    console.log('❌ 노션 데이터 가져오기 실패:', error.message);
    throw error;
  }
}

// 노션 데이터를 window.CORE_DATA 형식으로 변환
function convertNotionToCoreData(notionData) {
  console.log('🔄 노션 데이터를 window.CORE_DATA 형식으로 변환 중...');
  
  const coreData = notionData.map(person => {
    const properties = person.properties;
    
    // 기본 정보 추출
    const name = properties.이름?.title?.[0]?.plain_text || '';
    const personId = properties.아이디?.rich_text?.[0]?.plain_text || '';
    const gender = properties.성별?.select?.name || '';
    const generation = properties.세대?.select?.name || '';
    const line1 = properties.Line1?.rich_text?.[0]?.plain_text || '';
    const birthYear = properties.생년?.number || null;
    const survivalStatus = properties.생존상태?.select?.name || '미확인';
    
    // 관계 정보 추출
    const father = properties.아버지?.rich_text?.[0]?.plain_text || '';
    const mother = properties.어머니?.rich_text?.[0]?.plain_text || '';
    const spouse = properties.배우자?.rich_text?.[0]?.plain_text || '';
    const contact = properties.연락처?.phone_number || null;
    const notes = properties.비고?.rich_text?.[0]?.plain_text || '';
    
    // window.CORE_DATA 형식으로 변환
    return {
      id: personId, // 새로 추가된 ID 필드
      name: name,
      displayName: name,
      성별: gender,
      세대: generation ? parseInt(generation.replace('세', '')) : null,
      Line1: line1,
      생년: birthYear,
      사망일: null, // 노션에 없음
      생존상태: survivalStatus,
      age: birthYear ? new Date().getFullYear() - birthYear : null,
      relationships: {
        father: father,
        mother: mother,
        spouses: spouse ? [spouse] : [],
        children: [],
        siblings: []
      },
      contact: {
        phone: contact,
        email: null,
        address: null,
        social: {}
      },
      additional: {
        job: null,
        education: null,
        notes: notes,
        photo: null,
        burialPlace: null,
        memorialDate: null,
        customFields: {}
      },
      tags: generation ? [`${generation}세대`] : [],
      stats: {
        totalDescendants: 0,
        livingDescendants: 0,
        lastContact: new Date().toISOString()
      },
      access: {
        isAdmin: false,
        canEdit: false,
        lastModified: new Date().toISOString(),
        modifiedBy: "notion"
      }
    };
  });

  console.log(`✅ 변환 완료: ${coreData.length}명`);
  return coreData;
}

// window.CORE_DATA 파일 생성
function createWindowCoreData(coreData) {
  console.log('💾 window.CORE_DATA 파일 생성 중...');
  
  const windowCoreDataContent = `// 한양조씨 족보 앱 - 통합 데이터 소스
// 생성일: ${new Date().toISOString()}
// 데이터 수: ${coreData.length}명
// 노션 데이터베이스와 완전 동기화됨

window.CORE_DATA = ${JSON.stringify(coreData, null, 2)};

// 데이터 통계
console.log('📊 CORE_DATA 로드 완료:', {
  총인원: window.CORE_DATA.length,
  생성일: '${new Date().toISOString()}',
  데이터소스: '노션 데이터베이스 (ID 포함)'
});`;

  // 파일 저장
  const fileName = `window_core_data_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.js`;
  fs.writeFileSync(fileName, windowCoreDataContent, 'utf8');
  
  // 기본 파일명으로도 저장
  fs.writeFileSync('window_core_data.js', windowCoreDataContent, 'utf8');
  
  console.log(`✅ window.CORE_DATA 파일 생성 완료: ${fileName}`);
  console.log(`✅ 기본 파일도 생성됨: window_core_data.js`);
  
  return fileName;
}

// 메인 동기화 함수
async function syncNotionToCoreData() {
  try {
    console.log('🚀 노션-윈도우코어 데이터 동기화 시작...');
    
    // 1단계: 노션에서 최신 데이터 가져오기
    const notionData = await fetchNotionDataWithIds();
    
    // 2단계: window.CORE_DATA 형식으로 변환
    const coreData = convertNotionToCoreData(notionData);
    
    // 3단계: window.CORE_DATA 파일 생성
    const fileName = createWindowCoreData(coreData);
    
    // 4단계: 통계 출력
    console.log('\n📊 동기화 완료 통계:');
    console.log(`✅ 총 인원: ${coreData.length}명`);
    console.log(`✅ ID가 있는 인원: ${coreData.filter(p => p.id).length}명`);
    console.log(`✅ ID가 없는 인원: ${coreData.filter(p => !p.id).length}명`);
    
    // ID가 없는 인원 목록
    const noIdPersons = coreData.filter(p => !p.id);
    if (noIdPersons.length > 0) {
      console.log('\n⚠️ ID가 없는 인원:');
      noIdPersons.forEach(person => {
        console.log(`- ${person.name} (${person.Line1}, ${person.세대}세대)`);
      });
    }
    
    console.log('\n🎉 노션-윈도우코어 데이터 동기화 완료!');
    console.log('이제 앱에서 window.CORE_DATA를 사용할 수 있습니다.');
    
    return {
      success: true,
      totalPersons: coreData.length,
      personsWithId: coreData.filter(p => p.id).length,
      personsWithoutId: coreData.filter(p => !p.id).length,
      fileName: fileName
    };
    
  } catch (error) {
    console.log('\n❌ 동기화 실패:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// 실행
syncNotionToCoreData()
  .then(result => {
    if (result.success) {
      console.log('\n✅ 동기화 성공!');
      console.log(`📁 생성된 파일: ${result.fileName}`);
    } else {
      console.log('\n❌ 동기화 실패!');
    }
  })
  .catch(error => {
    console.log('\n❌ 실행 오류:', error);
  });
