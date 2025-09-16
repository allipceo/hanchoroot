// CSV 파일 상세 분석 스크립트
// CSV 구조를 정확히 파악하여 검증 정확도 향상

const fs = require('fs');

function analyzeCSVStructure() {
  const csvContent = fs.readFileSync('000_족보기초자료_v1.0.csv', 'utf8');
  const lines = csvContent.split('\n');
  
  console.log('=== CSV 파일 구조 분석 ===\n');
  
  lines.forEach((line, index) => {
    if (line.trim()) {
      console.log(`라인 ${index + 1}: ${line}`);
    }
  });
  
  console.log('\n=== CSV 데이터 추출 ===\n');
  
  const extractedData = [];
  let currentLine = null;
  let generationIndex = 0;
  
  lines.forEach((line, index) => {
    line = line.trim();
    
    // Line 구분자 확인
    if (line.startsWith('Line1')) {
      currentLine = 'Line1';
      generationIndex = 0;
      console.log(`\n--- ${currentLine} 시작 ---`);
      return;
    }
    if (line.startsWith('Line2')) {
      currentLine = 'Line2';
      generationIndex = 0;
      console.log(`\n--- ${currentLine} 시작 ---`);
      return;
    }
    if (line.startsWith('Line3')) {
      currentLine = 'Line3';
      generationIndex = 0;
      console.log(`\n--- ${currentLine} 시작 ---`);
      return;
    }
    
    // 세대 헤더 건너뛰기
    if (line.includes('세대')) {
      generationIndex = 0;
      return;
    }
    
    // 데이터 라인 처리
    if (currentLine && line && !line.includes('세대') && !line.startsWith('Line')) {
      const cells = line.split(',');
      console.log(`\n${currentLine} ${generationIndex + 1}세대:`);
      
      cells.forEach((cell, cellIndex) => {
        if (cell.trim()) {
          console.log(`  셀 ${cellIndex + 1}: "${cell}"`);
          
          // 이름 추출 (따옴표와 줄바꿈 처리)
          const names = cell.split('\n').map(name => name.trim().replace(/"/g, ''));
          names.forEach(name => {
            if (name && name !== '자녀1' && name !== '자녀2' && name !== '미확인') {
              // 탄생연도 추출
              const yearMatch = name.match(/\((\d{2})\)/);
              let birthYear = null;
              let cleanName = name;
              
              if (yearMatch) {
                const year = parseInt(yearMatch[1]);
                if (year >= 0 && year <= 99) {
                  // 5세대까지는 1900년대, 6세대부터는 2000년대
                  if (generationIndex >= 5) {
                    birthYear = 2000 + year;
                  } else {
                    birthYear = 1900 + year;
                  }
                }
                cleanName = name.replace(/\(\d{2}\)/, '').trim();
              }
              
              extractedData.push({
                name: cleanName,
                line: currentLine,
                generation: generationIndex + 1,
                birthYear: birthYear,
                originalText: name,
                cellIndex: cellIndex
              });
              
              console.log(`    - ${cleanName}${birthYear ? ` (${birthYear}년생)` : ''}`);
            }
          });
        }
      });
      generationIndex++;
    }
  });
  
  console.log(`\n=== 추출 결과 요약 ===`);
  console.log(`총 추출된 인물 수: ${extractedData.length}명`);
  
  const lineCount = {};
  const generationCount = {};
  
  extractedData.forEach(person => {
    lineCount[person.line] = (lineCount[person.line] || 0) + 1;
    generationCount[person.generation] = (generationCount[person.generation] || 0) + 1;
  });
  
  console.log('Line별 분포:', lineCount);
  console.log('세대별 분포:', generationCount);
  
  return extractedData;
}

// CSV 분석 실행
const csvData = analyzeCSVStructure();


