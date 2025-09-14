// 패밀리 모듈 테스트 스크립트

const { familyLoader } = require('./family.js');

console.log('=== 패밀리 모듈 테스트 시작 ===\n');

try {
    // 1. 데이터 로드 테스트
    console.log('1. 데이터 로드 테스트');
    const familyData = familyLoader.load();
    console.log(`✅ 총 ${familyData.persons.length}명의 데이터 로드 완료\n`);

    // 2. Line별 분포 테스트
    console.log('2. Line별 분포 테스트');
    const lineStats = familyLoader.getLineStatistics();
    console.log('Line별 분포:');
    Object.keys(lineStats).forEach(line => {
        console.log(`  ${line}: ${lineStats[line]}명`);
    });
    console.log('');

    // 3. 세대별 분포 테스트
    console.log('3. 세대별 분포 테스트');
    const genStats = familyLoader.getGenerationStatistics();
    console.log('세대별 분포:');
    Object.keys(genStats).forEach(gen => {
        console.log(`  ${gen}세대: ${genStats[gen]}명`);
    });
    console.log('');

    // 4. Line별 필터링 테스트
    console.log('4. Line별 필터링 테스트');
    const line1Persons = familyLoader.getPersonsByLine('Line1');
    const line2Persons = familyLoader.getPersonsByLine('Line2');
    const line3Persons = familyLoader.getPersonsByLine('Line3');
    const commonPersons = familyLoader.getPersonsByLine('공통');
    
    console.log(`Line1: ${line1Persons.length}명`);
    console.log(`Line2: ${line2Persons.length}명`);
    console.log(`Line3: ${line3Persons.length}명`);
    console.log(`공통: ${commonPersons.length}명\n`);

    // 5. 세대별 필터링 테스트
    console.log('5. 세대별 필터링 테스트');
    for (let gen = 1; gen <= 6; gen++) {
        const genPersons = familyLoader.getPersonsByGeneration(gen);
        console.log(`${gen}세대: ${genPersons.length}명`);
    }
    console.log('');

    // 6. 통합 필터링 테스트
    console.log('6. 통합 필터링 테스트');
    const line1Gen3 = familyLoader.getFilteredPersons('Line1', 3);
    const line2Gen4 = familyLoader.getFilteredPersons('Line2', 4);
    const line3Gen5 = familyLoader.getFilteredPersons('Line3', 5);
    
    console.log(`Line1 + 3세대: ${line1Gen3.length}명`);
    console.log(`Line2 + 4세대: ${line2Gen4.length}명`);
    console.log(`Line3 + 5세대: ${line3Gen5.length}명\n`);

    // 7. 가족 트리 구조 테스트
    console.log('7. 가족 트리 구조 테스트');
    const familyTree = familyLoader.getFamilyTree();
    console.log('가족 트리 구조:');
    Object.keys(familyTree).forEach(gen => {
        const genData = familyTree[gen];
        const personCount = Object.keys(genData).length;
        console.log(`  ${gen}: ${personCount}명`);
    });
    console.log('');

    // 8. 샘플 데이터 확인
    console.log('8. 샘플 데이터 확인');
    if (line1Persons.length > 0) {
        const samplePerson = line1Persons[0];
        console.log('Line1 첫 번째 인물:');
        console.log(`  이름: ${samplePerson.name}`);
        console.log(`  한자: ${samplePerson.hanja || 'N/A'}`);
        console.log(`  세대: ${samplePerson.generation}세대`);
        console.log(`  Line: ${samplePerson.line}`);
        console.log(`  성별: ${samplePerson.gender === 'M' ? '남성' : '여성'}`);
        console.log(`  상태: ${samplePerson.status === 'alive' ? '생존' : '사망'}`);
    }
    console.log('');

    // 9. 통계 정보 확인
    console.log('9. 통계 정보 확인');
    const statistics = familyLoader.getStatistics();
    console.log('전체 통계:');
    console.log(`  총 인물 수: ${statistics.total}명`);
    console.log(`  남성: ${statistics.byGender.M}명`);
    console.log(`  여성: ${statistics.byGender.F}명`);
    console.log(`  생존: ${statistics.byStatus.alive}명`);
    console.log(`  사망: ${statistics.byStatus.deceased}명\n`);

    console.log('=== 패밀리 모듈 테스트 완료 ===');
    console.log('✅ 모든 테스트 통과!');

} catch (error) {
    console.error('❌ 테스트 실패:', error);
    process.exit(1);
}
