// 두 API 키에 대한 종합적인 검증 테스트
const https = require('https');

// API 키 정의
const API_KEYS = {
  'GIA_KEY_01': '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',
  'GIA_KEY_02': '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'
};

const DATABASE_ID = '2093284156fa404a911cbefa4b422994';

// Node.js에서 fetch() 사용을 위한 polyfill
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

// 테스트 결과 저장
const testResults = {
  timestamp: new Date().toISOString(),
  database_id: DATABASE_ID,
  keys: {}
};

// 1. 데이터베이스 스키마 조회 테스트
async function testDatabaseSchema(apiKey, keyName) {
  console.log(`\n🔍 ${keyName} - 데이터베이스 스키마 조회 테스트`);
  
  const url = `https://api.notion.com/v1/databases/${DATABASE_ID}`;
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    const result = {
      status: response.status,
      success: response.ok,
      error: null,
      data: null
    };

    if (response.ok) {
      const data = await response.json();
      result.data = {
        title: data.title[0]?.plain_text,
        properties_count: Object.keys(data.properties).length,
        properties: Object.keys(data.properties)
      };
      console.log(`✅ 성공: ${result.data.title} (${result.data.properties_count}개 속성)`);
    } else {
      const errorData = await response.json();
      result.error = errorData;
      console.log(`❌ 실패: HTTP ${result.status} - ${errorData.message || 'Unknown error'}`);
    }

    return result;
  } catch (error) {
    console.log(`❌ 예외 발생: ${error.message}`);
    return {
      status: 0,
      success: false,
      error: error.message,
      data: null
    };
  }
}

// 2. 데이터베이스 쿼리 테스트
async function testDatabaseQuery(apiKey, keyName) {
  console.log(`\n📊 ${keyName} - 데이터베이스 쿼리 테스트`);
  
  const url = `https://api.notion.com/v1/databases/${DATABASE_ID}/query`;
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
  };

  const data = {
    "page_size": 5
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    const result = {
      status: response.status,
      success: response.ok,
      error: null,
      data: null
    };

    if (response.ok) {
      const responseData = await response.json();
      result.data = {
        results_count: responseData.results.length,
        has_more: responseData.has_more,
        sample_names: responseData.results.slice(0, 3).map(r => 
          r.properties.이름?.title?.[0]?.plain_text || '이름없음'
        )
      };
      console.log(`✅ 성공: ${result.data.results_count}개 결과, 샘플: ${result.data.sample_names.join(', ')}`);
    } else {
      const errorData = await response.json();
      result.error = errorData;
      console.log(`❌ 실패: HTTP ${result.status} - ${errorData.message || 'Unknown error'}`);
    }

    return result;
  } catch (error) {
    console.log(`❌ 예외 발생: ${error.message}`);
    return {
      status: 0,
      success: false,
      error: error.message,
      data: null
    };
  }
}

// 3. 페이지 업데이트 테스트 (ID 필드 업데이트)
async function testPageUpdate(apiKey, keyName) {
  console.log(`\n✏️ ${keyName} - 페이지 업데이트 테스트`);
  
  // 테스트용 페이지 ID (조영하)
  const testPageId = 'L2-G3-M-S-527'; // 실제 page ID가 아닌 person ID이므로 실패할 것임
  
  const url = `https://api.notion.com/v1/pages/${testPageId}`;
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
  };

  const data = {
    "properties": {
      "아이디": {
        "rich_text": [
          {
            "text": {
              "content": "TEST_UPDATE"
            }
          }
        ]
      }
    }
  };

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data)
    });

    const result = {
      status: response.status,
      success: response.ok,
      error: null,
      data: null
    };

    if (response.ok) {
      const responseData = await response.json();
      result.data = responseData;
      console.log(`✅ 성공: 페이지 업데이트 완료`);
    } else {
      const errorData = await response.json();
      result.error = errorData;
      console.log(`❌ 실패: HTTP ${result.status} - ${errorData.message || 'Unknown error'}`);
    }

    return result;
  } catch (error) {
    console.log(`❌ 예외 발생: ${error.message}`);
    return {
      status: 0,
      success: false,
      error: error.message,
      data: null
    };
  }
}

// 4. 실제 페이지 ID로 업데이트 테스트
async function testRealPageUpdate(apiKey, keyName) {
  console.log(`\n🔧 ${keyName} - 실제 페이지 업데이트 테스트`);
  
  // 먼저 실제 페이지 ID를 찾기 위해 쿼리 실행
  const queryUrl = `https://api.notion.com/v1/databases/${DATABASE_ID}/query`;
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
  };

  const queryData = {
    "page_size": 1,
    "filter": {
      "property": "이름",
      "title": {
        "equals": "조영하"
      }
    }
  };

  try {
    // 1단계: 조영하 페이지 찾기
    const queryResponse = await fetch(queryUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(queryData)
    });

    if (!queryResponse.ok) {
      const errorData = await queryResponse.json();
      return {
        status: queryResponse.status,
        success: false,
        error: `쿼리 실패: ${errorData.message}`,
        data: null
      };
    }

    const queryResult = await queryResponse.json();
    if (queryResult.results.length === 0) {
      return {
        status: 404,
        success: false,
        error: "조영하 페이지를 찾을 수 없음",
        data: null
      };
    }

    const pageId = queryResult.results[0].id;
    console.log(`📄 조영하 페이지 ID: ${pageId}`);

    // 2단계: 페이지 업데이트 시도
    const updateUrl = `https://api.notion.com/v1/pages/${pageId}`;
    const updateData = {
      "properties": {
        "아이디": {
          "rich_text": [
            {
              "text": {
                "content": "TEST_UPDATE_REAL"
              }
            }
          ]
        }
      }
    };

    const updateResponse = await fetch(updateUrl, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(updateData)
    });

    const result = {
      status: updateResponse.status,
      success: updateResponse.ok,
      error: null,
      data: null
    };

    if (updateResponse.ok) {
      const responseData = await updateResponse.json();
      result.data = responseData;
      console.log(`✅ 성공: 실제 페이지 업데이트 완료`);
    } else {
      const errorData = await updateResponse.json();
      result.error = errorData;
      console.log(`❌ 실패: HTTP ${result.status} - ${errorData.message || 'Unknown error'}`);
    }

    return result;
  } catch (error) {
    console.log(`❌ 예외 발생: ${error.message}`);
    return {
      status: 0,
      success: false,
      error: error.message,
      data: null
    };
  }
}

// 메인 테스트 함수
async function runComprehensiveTest() {
  console.log('🚀 API 키 종합 검증 테스트 시작...');
  console.log(`📅 테스트 시간: ${new Date().toISOString()}`);
  console.log(`🗄️ 데이터베이스 ID: ${DATABASE_ID}`);

  for (const [keyName, apiKey] of Object.entries(API_KEYS)) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🔑 ${keyName} 테스트 시작`);
    console.log(`API Key: ${apiKey.substring(0, 20)}...`);
    console.log(`${'='.repeat(50)}`);

    const keyResults = {
      api_key: apiKey.substring(0, 20) + '...',
      tests: {}
    };

    // 1. 데이터베이스 스키마 조회
    keyResults.tests.database_schema = await testDatabaseSchema(apiKey, keyName);

    // 2. 데이터베이스 쿼리
    keyResults.tests.database_query = await testDatabaseQuery(apiKey, keyName);

    // 3. 페이지 업데이트 (테스트)
    keyResults.tests.page_update_test = await testPageUpdate(apiKey, keyName);

    // 4. 실제 페이지 업데이트
    keyResults.tests.real_page_update = await testRealPageUpdate(apiKey, keyName);

    testResults.keys[keyName] = keyResults;

    // API 제한을 고려한 지연
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // 결과 요약
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 테스트 결과 요약');
  console.log(`${'='.repeat(60)}`);

  for (const [keyName, keyResults] of Object.entries(testResults.keys)) {
    console.log(`\n🔑 ${keyName}:`);
    console.log(`  📋 스키마 조회: ${keyResults.tests.database_schema.success ? '✅' : '❌'} (${keyResults.tests.database_schema.status})`);
    console.log(`  📊 데이터 쿼리: ${keyResults.tests.database_query.success ? '✅' : '❌'} (${keyResults.tests.database_query.status})`);
    console.log(`  ✏️ 페이지 업데이트: ${keyResults.tests.real_page_update.success ? '✅' : '❌'} (${keyResults.tests.real_page_update.status})`);
  }

  // 결과를 파일로 저장
  const fs = require('fs');
  const resultFile = `api_key_test_results_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
  fs.writeFileSync(resultFile, JSON.stringify(testResults, null, 2));
  console.log(`\n💾 상세 결과가 ${resultFile}에 저장되었습니다.`);

  return testResults;
}

// 실행
runComprehensiveTest()
  .then(results => {
    console.log('\n🎉 종합 테스트 완료!');
  })
  .catch(error => {
    console.log('\n❌ 테스트 실행 오류:', error);
  });
