// 한양조씨 족보 ID 생성 스크립트
// L1-G3-M-S-001 형식으로 ID 생성

const fs = require('fs');
const path = require('path');

// ID 생성 규칙에 따른 함수
function generatePersonId(person) {
    // Line 코드 변환
    let lineCode;
    if (person.Line1 === 'Line1') {
        lineCode = 'L1';
    } else if (person.Line1 === 'Line2') {
        lineCode = 'L2';
    } else if (person.Line1 === 'Line3') {
        lineCode = 'L3';
    } else {
        lineCode = 'L1'; // 기본값
    }
    
    // 세대 코드
    const genCode = `G${person.세대}`;
    
    // 성별 코드
    const genderCode = person.성별 === 'M' ? 'M' : 'F';
    
    // 관계 코드 결정
    let relationCode;
    const name = person.이름 || person.name;
    if (name && name.startsWith('조')) {
        // 조씨인 경우
        relationCode = person.성별 === 'M' ? 'S' : 'D'; // S=아들, D=딸
    } else {
        // 조씨가 아닌 경우 (배우자)
        relationCode = person.성별 === 'M' ? 'H' : 'W'; // H=남편, W=부인
    }
    
    // 순번 생성 (임시로 랜덤 사용, 나중에 체계적으로 수정)
    const sequence = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `${lineCode}-${genCode}-${genderCode}-${relationCode}-${sequence}`;
}

// 기존 데이터에 ID 추가하는 함수
function addIdsToExistingData() {
    console.log('🔄 ID 생성 작업 시작...');
    
    try {
        // 변환된 데이터 로드 (converted_data.json 사용)
        const convertedDataPath = path.join(__dirname, 'converted_data.json');
        const convertedData = JSON.parse(fs.readFileSync(convertedDataPath, 'utf8'));
        const notionData = convertedData.persons || convertedData;
        
        console.log(`📊 총 ${notionData.length}명의 데이터 처리 시작`);
        
        // 각 사람에게 ID 부여
        const updatedData = notionData.map((person, index) => {
            const id = generatePersonId(person);
            const name = person.이름 || person.name;
            
            console.log(`${index + 1}. ${name} → ${id}`);
            
            return {
                ...person,
                id: id
            };
        });
        
        // ID가 추가된 데이터를 새 파일로 저장
        const outputPath = path.join(__dirname, 'notion_data_with_ids.json');
        fs.writeFileSync(outputPath, JSON.stringify(updatedData, null, 2), 'utf8');
        
        console.log(`✅ ID 생성 완료! 결과 파일: ${outputPath}`);
        console.log(`📈 총 ${updatedData.length}명에 ID 부여 완료`);
        
        return updatedData;
        
    } catch (error) {
        console.error('❌ ID 생성 중 오류 발생:', error.message);
        throw error;
    }
}

// ID 생성 규칙 검증 함수
function validateIdRules() {
    console.log('🔍 ID 생성 규칙 검증...');
    
    const testCases = [
        { 이름: '조정윤', 세대: 1, Line1: 'Line1', 성별: 'M', 예상: 'L1-G1-M-S-' },
        { 이름: '임정숙', 세대: 1, Line1: 'Line1', 성별: 'F', 예상: 'L1-G1-F-W-' },
        { 이름: '조은상', 세대: 4, Line1: 'Line1', 성별: 'M', 예상: 'L1-G4-M-S-' },
        { 이름: '변주란', 세대: 4, Line1: 'Line1', 성별: 'F', 예상: 'L1-G4-F-W-' }
    ];
    
    testCases.forEach((testCase, index) => {
        const generatedId = generatePersonId(testCase);
        const isValid = generatedId.startsWith(testCase.예상);
        
        console.log(`${index + 1}. ${testCase.이름}: ${generatedId} ${isValid ? '✅' : '❌'}`);
    });
}

// 메인 실행 함수
function main() {
    console.log('🏠 한양조씨 족보 ID 생성 시스템');
    console.log('=====================================');
    
    try {
        // 1. ID 생성 규칙 검증
        validateIdRules();
        console.log('');
        
        // 2. 기존 데이터에 ID 추가
        const result = addIdsToExistingData();
        
        console.log('');
        console.log('🎉 ID 생성 작업 완료!');
        console.log('📋 다음 단계:');
        console.log('   1. 노션에 ID 필드 추가');
        console.log('   2. 생성된 ID를 노션에 입력');
        console.log('   3. 윈도우코어 데이터 동기화');
        
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
    generatePersonId,
    addIdsToExistingData,
    validateIdRules
};
