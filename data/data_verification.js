// 노션 데이터와 JSON 파일 일치 여부 검증 스크립트
// CSV 파일과 비교하여 데이터 정확성 검증

const fs = require('fs');

// CSV 파일 파싱
function parseCSVFile() {
  const csvContent = fs.readFileSync('000_족보기초자료_v1.0.csv', 'utf8');
  const lines = csvContent.split('\n');
  
  const csvData = {
    Line1: [],
    Line2: [],
    Line3: []
  };
  
  let currentLine = null;
  let generationIndex = 0;
  
  lines.forEach((line, index) => {
    line = line.trim();
    
    if (line.startsWith('Line1')) {
      currentLine = 'Line1';
      generationIndex = 0;
      return;
    }
    if (line.startsWith('Line2')) {
      currentLine = 'Line2';
      generationIndex = 0;
      return;
    }
    if (line.startsWith('Line3')) {
      currentLine = 'Line3';
      generationIndex = 0;
      return;
    }
    
    if (line.includes('세대')) {
      generationIndex = 0;
      return;
    }
    
    if (currentLine && line && !line.includes('세대')) {
      const cells = line.split(',');
      cells.forEach((cell, cellIndex) => {
        if (cell.trim()) {
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
              
              csvData[currentLine].push({
                name: cleanName,
                line: currentLine,
                generation: generationIndex + 1,
                birthYear: birthYear,
                originalText: name
              });
            }
          });
        }
      });
      generationIndex++;
    }
  });
  
  return csvData;
}

// JSON 데이터 로드
function loadJSONData() {
  const jsonData = JSON.parse(fs.readFileSync('converted_full_data.json', 'utf8'));
  return jsonData.persons;
}

// 노션 원본 데이터 로드
function loadNotionData() {
  const data = fs.readFileSync('notion_data_utf8.json', 'utf8');
  const cleanData = data.replace(/^\uFEFF/, ''); // BOM 제거
  const notionData = JSON.parse(cleanData);
  return notionData.results;
}

// 데이터 비교 및 검증
function verifyDataConsistency() {
  console.log('=== 노션 데이터와 JSON 파일 일치 여부 검증 ===\n');
  
  // 데이터 로드
  const csvData = parseCSVFile();
  const jsonData = loadJSONData();
  const notionData = loadNotionData();
  
  console.log('1. 데이터 로드 결과:');
  console.log(`   - CSV 데이터: Line1(${csvData.Line1.length}명), Line2(${csvData.Line2.length}명), Line3(${csvData.Line3.length}명)`);
  console.log(`   - JSON 데이터: ${jsonData.length}명`);
  console.log(`   - 노션 원본: ${notionData.length}명\n`);
  
  // 2. 노션 원본과 JSON 변환 데이터 비교
  console.log('2. 노션 원본과 JSON 변환 데이터 비교:');
  
  let notionToJsonMatches = 0;
  let notionToJsonMismatches = [];
  
  notionData.forEach((notionPerson, index) => {
    const notionName = notionPerson.properties.이름?.title?.[0]?.text?.content;
    const jsonPerson = jsonData[index];
    
    if (notionName && jsonPerson && notionName === jsonPerson.name) {
      notionToJsonMatches++;
    } else {
      notionToJsonMismatches.push({
        index: index,
        notionName: notionName,
        jsonName: jsonPerson?.name,
        notionGeneration: notionPerson.properties.세대?.select?.name,
        jsonGeneration: jsonPerson?.generation
      });
    }
  });
  
  console.log(`   ✅ 일치: ${notionToJsonMatches}명`);
  console.log(`   ⚠️ 불일치: ${notionToJsonMismatches.length}명`);
  
  if (notionToJsonMismatches.length > 0) {
    console.log('\n   불일치 사례 (처음 5개):');
    notionToJsonMismatches.slice(0, 5).forEach(mismatch => {
      console.log(`   - 인덱스 ${mismatch.index}: 노션(${mismatch.notionName}) vs JSON(${mismatch.jsonName})`);
    });
  }
  
  // 3. CSV 데이터와 JSON 데이터 비교
  console.log('\n3. CSV 데이터와 JSON 데이터 비교:');
  
  const allCsvNames = [...csvData.Line1, ...csvData.Line2, ...csvData.Line3];
  const allJsonNames = jsonData.map(person => person.name);
  
  let csvToJsonMatches = 0;
  let csvToJsonMismatches = [];
  
  allCsvNames.forEach(csvPerson => {
    const jsonPerson = jsonData.find(p => p.name === csvPerson.name);
    if (jsonPerson) {
      csvToJsonMatches++;
    } else {
      csvToJsonMismatches.push(csvPerson);
    }
  });
  
  console.log(`   ✅ CSV에서 JSON으로 찾은 인물: ${csvToJsonMatches}명`);
  console.log(`   ⚠️ CSV에 있지만 JSON에 없는 인물: ${csvToJsonMismatches.length}명`);
  
  if (csvToJsonMismatches.length > 0) {
    console.log('\n   CSV에만 있는 인물 (처음 10개):');
    csvToJsonMismatches.slice(0, 10).forEach(person => {
      console.log(`   - ${person.name} (${person.line}, ${person.generation}세대)`);
    });
  }
  
  // 4. JSON에 있지만 CSV에 없는 인물
  let jsonToCsvMismatches = [];
  allJsonNames.forEach(jsonName => {
    const csvPerson = allCsvNames.find(p => p.name === jsonName);
    if (!csvPerson) {
      const jsonPerson = jsonData.find(p => p.name === jsonName);
      jsonToCsvMismatches.push(jsonPerson);
    }
  });
  
  console.log(`   ⚠️ JSON에 있지만 CSV에 없는 인물: ${jsonToCsvMismatches.length}명`);
  
  if (jsonToCsvMismatches.length > 0) {
    console.log('\n   JSON에만 있는 인물 (처음 10개):');
    jsonToCsvMismatches.slice(0, 10).forEach(person => {
      console.log(`   - ${person.name} (${person.line}, ${person.generation}세대)`);
    });
  }
  
  // 5. 세대별 분포 비교
  console.log('\n4. 세대별 분포 비교:');
  
  const csvGenerationCount = {};
  const jsonGenerationCount = {};
  
  allCsvNames.forEach(person => {
    csvGenerationCount[person.generation] = (csvGenerationCount[person.generation] || 0) + 1;
  });
  
  jsonData.forEach(person => {
    jsonGenerationCount[person.generation] = (jsonGenerationCount[person.generation] || 0) + 1;
  });
  
  console.log('   CSV 세대별 분포:', csvGenerationCount);
  console.log('   JSON 세대별 분포:', jsonGenerationCount);
  
  // 6. Line별 분포 비교
  console.log('\n5. Line별 분포 비교:');
  
  const csvLineCount = { Line1: csvData.Line1.length, Line2: csvData.Line2.length, Line3: csvData.Line3.length };
  const jsonLineCount = {};
  
  jsonData.forEach(person => {
    jsonLineCount[person.line] = (jsonLineCount[person.line] || 0) + 1;
  });
  
  console.log('   CSV Line별 분포:', csvLineCount);
  console.log('   JSON Line별 분포:', jsonLineCount);
  
  // 7. 탄생연도 검증
  console.log('\n6. 탄생연도 검증:');
  
  let birthYearMatches = 0;
  let birthYearMismatches = [];
  
  allCsvNames.forEach(csvPerson => {
    if (csvPerson.birthYear) {
      const jsonPerson = jsonData.find(p => p.name === csvPerson.name);
      if (jsonPerson && jsonPerson.birthDate) {
        const jsonBirthYear = parseInt(jsonPerson.birthDate.substring(0, 4));
        if (csvPerson.birthYear === jsonBirthYear) {
          birthYearMatches++;
        } else {
          birthYearMismatches.push({
            name: csvPerson.name,
            csvYear: csvPerson.birthYear,
            jsonYear: jsonBirthYear
          });
        }
      }
    }
  });
  
  console.log(`   ✅ 탄생연도 일치: ${birthYearMatches}명`);
  console.log(`   ⚠️ 탄생연도 불일치: ${birthYearMismatches.length}명`);
  
  if (birthYearMismatches.length > 0) {
    console.log('\n   탄생연도 불일치 사례 (처음 5개):');
    birthYearMismatches.slice(0, 5).forEach(mismatch => {
      console.log(`   - ${mismatch.name}: CSV(${mismatch.csvYear}) vs JSON(${mismatch.jsonYear})`);
    });
  }
  
  // 8. 검증 결과 요약
  console.log('\n=== 검증 결과 요약 ===');
  console.log(`✅ 노션→JSON 변환 일치율: ${((notionToJsonMatches / notionData.length) * 100).toFixed(1)}%`);
  console.log(`✅ CSV→JSON 일치율: ${((csvToJsonMatches / allCsvNames.length) * 100).toFixed(1)}%`);
  console.log(`✅ 탄생연도 일치율: ${birthYearMatches > 0 ? ((birthYearMatches / (birthYearMatches + birthYearMismatches.length)) * 100).toFixed(1) : 0}%`);
  
  if (notionToJsonMismatches.length === 0 && csvToJsonMismatches.length === 0 && birthYearMismatches.length === 0) {
    console.log('\n🎉 모든 데이터가 완벽하게 일치합니다!');
  } else {
    console.log('\n⚠️ 일부 데이터 불일치가 발견되었습니다. 상세 내용을 확인해주세요.');
  }
  
  return {
    notionToJsonMatches,
    notionToJsonMismatches,
    csvToJsonMatches,
    csvToJsonMismatches,
    jsonToCsvMismatches,
    birthYearMatches,
    birthYearMismatches
  };
}

// 검증 실행
verifyDataConsistency();
