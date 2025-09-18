/**
 * 한양조씨 족보 - 노션 167건 데이터 동기화 시스템
 * 작성자: 서대리 (노팀장 코드 기반)
 * 작성일: 2025.09.18
 * 목적: 노션 167건 최신 데이터를 윈도우 코어데이터 형식으로 변환 및 동기화
 */

const fs = require('fs');

class NotionDataSyncSystem {
    constructor() {
        this.existingData = [];
        this.syncLog = [];
        this.stats = {
            total: 0,
            added: 0,
            updated: 0,
            unchanged: 0,
            errors: 0
        };
        
        console.log('🔄 노션-윈도우 데이터 동기화 시스템 초기화');
    }
    
    /**
     * 메인 동기화 실행 함수
     * @param {Array} notionData - 노션에서 가져온 최신 데이터
     * @returns {Object} 동기화 결과
     */
    async syncData(notionData) {
        console.log('🚀 데이터 동기화 시작...');
        console.log('📥 노션 데이터:', notionData.length, '명');
        
        try {
            // 1단계: 데이터 전처리
            const processedData = this.preprocessNotionData(notionData);
            
            // 2단계: 기존 데이터와 비교 및 변환
            const syncedData = this.compareAndSync(processedData);
            
            // 3단계: 윈도우 코어데이터 형식으로 변환
            const finalData = this.convertToWindowCoreFormat(syncedData);
            
            // 4단계: 결과 검증
            this.validateSyncResult(finalData);
            
            // 5단계: 새로운 윈도우 코어데이터 생성
            const newWindowCoreData = this.generateNewWindowCore(finalData);
            
            return {
                success: true,
                data: newWindowCoreData,
                stats: this.stats,
                log: this.syncLog,
                timestamp: new Date().toISOString()
            };
            
        } catch (error) {
            console.error('❌ 동기화 실패:', error);
            return {
                success: false,
                error: error.message,
                stats: this.stats,
                log: this.syncLog
            };
        }
    }
    
    /**
     * 1단계: 노션 데이터 전처리
     * @param {Array} notionData 
     * @returns {Array} 전처리된 데이터
     */
    preprocessNotionData(notionData) {
        console.log('📋 1단계: 노션 데이터 전처리 시작');
        
        const processed = notionData.map(person => {
            // 노션 API 응답에서 실제 데이터 추출
            const properties = person.properties || {};
            
            // 필수 필드 검증
            const name = this.extractText(properties['이름'] || properties['name']);
            let generation = this.extractNumber(properties['세대'] || properties['generation']);
            
            // 세대가 없으면 기본값 설정
            if (!generation) {
                generation = 1; // 기본값
            }
            
            if (!name) {
                console.warn('⚠️ 이름 필드 누락:', person);
                return null;
            }
            
            return {
                // 기본 정보
                name: name.trim(),
                displayName: name.trim(),
                generation: parseInt(generation) || 0,
                line: this.normalizeLineInfo(this.extractText(properties['Line1'] || properties['line'])),
                gender: this.determineGender(name, properties),
                birthYear: this.extractNumber(properties['생년'] || properties['birthYear']),
                deathDate: this.extractDate(properties['사망일'] || properties['deathDate']),
                status: this.determineStatus(properties),
                
                // 관계 정보
                relationships: this.normalizeRelationships(properties),
                
                // 연락처 정보
                contact: this.normalizeContact(properties),
                
                // 추가 정보
                additional: this.normalizeAdditional(properties),
                
                // 메타데이터
                lastModified: person.last_edited_time || new Date().toISOString(),
                modifiedBy: 'notion_sync',
                
                // 원본 데이터 보존
                _original: person
            };
        }).filter(Boolean);
        
        console.log('✅ 전처리 완료:', processed.length, '명');
        return processed;
    }
    
    /**
     * 노션 API 텍스트 필드 추출
     */
    extractText(property) {
        if (!property) return null;
        if (property.title) return property.title[0]?.plain_text || '';
        if (property.rich_text) return property.rich_text[0]?.plain_text || '';
        if (property.select) return property.select.name || '';
        if (typeof property === 'string') return property;
        return '';
    }
    
    /**
     * 노션 API 숫자 필드 추출
     */
    extractNumber(property) {
        if (!property) return null;
        if (property.number !== undefined) return property.number;
        if (typeof property === 'number') return property;
        return null;
    }
    
    /**
     * 노션 API 날짜 필드 추출
     */
    extractDate(property) {
        if (!property) return null;
        if (property.date) return property.date.start || null;
        if (typeof property === 'string') return property;
        return null;
    }
    
    /**
     * Line 정보 정규화
     * @param {string} lineInfo 
     * @returns {string}
     */
    normalizeLineInfo(lineInfo) {
        if (!lineInfo) return 'Line1';
        
        const lineMap = {
            'Line1': 'Line1',
            'Line2': 'Line2', 
            'Line3': 'Line3',
            'L1': 'Line1',
            'L2': 'Line2',
            'L3': 'Line3',
            'LC': '공통',
            '공통': '공통',
            'common': '공통'
        };
        
        return lineMap[lineInfo] || 'Line1';
    }
    
    /**
     * 성별 추론
     * @param {string} name 
     * @param {Object} properties 
     * @returns {string}
     */
    determineGender(name, properties = {}) {
        // 조씨 = 남성
        if (name.startsWith('조')) return 'M';
        
        // 성별 필드가 있으면 사용
        const genderField = this.extractText(properties['성별'] || properties['gender']);
        if (genderField) {
            if (genderField.includes('남') || genderField === 'M') return 'M';
            if (genderField.includes('여') || genderField === 'F') return 'F';
        }
        
        // 관계로 추론
        const relationships = this.normalizeRelationships(properties);
        if (relationships.spouses && relationships.spouses.length > 0) {
            const spouse = relationships.spouses[0];
            if (spouse && spouse.startsWith('조')) return 'F'; // 조씨와 결혼 = 여성
        }
        
        return 'M'; // 기본값
    }
    
    /**
     * 생존 상태 결정
     * @param {Object} properties 
     * @returns {string}
     */
    determineStatus(properties) {
        const statusField = this.extractText(properties['생존상태'] || properties['status']);
        if (statusField) return statusField;
        
        const deathDate = this.extractDate(properties['사망일'] || properties['deathDate']);
        if (deathDate) return '고인';
        
        // 세대별 추론
        const generation = this.extractNumber(properties['세대'] || properties['generation']);
        if (generation <= 3) return '고인';
        if (generation >= 6) return '생존';
        
        return '미확인';
    }
    
    /**
     * 관계 정보 정규화
     * @param {Object} properties 
     * @returns {Object}
     */
    normalizeRelationships(properties) {
        return {
            father: this.extractText(properties['부'] || properties['father']),
            mother: this.extractText(properties['모'] || properties['mother']),
            spouses: this.extractMultiSelect(properties['배우자'] || properties['spouses']),
            children: this.extractMultiSelect(properties['자녀'] || properties['children']),
            siblings: this.extractMultiSelect(properties['형제자매'] || properties['siblings'])
        };
    }
    
    /**
     * 노션 API 다중 선택 필드 추출
     */
    extractMultiSelect(property) {
        if (!property) return [];
        if (property.multi_select) {
            return property.multi_select.map(item => item.name).filter(Boolean);
        }
        if (Array.isArray(property)) return property;
        if (typeof property === 'string') return [property];
        return [];
    }
    
    /**
     * 연락처 정보 정규화
     * @param {Object} properties 
     * @returns {Object}
     */
    normalizeContact(properties) {
        return {
            phone: this.extractText(properties['전화번호'] || properties['phone']),
            email: this.extractText(properties['이메일'] || properties['email']),
            address: this.extractText(properties['주소'] || properties['address']),
            social: {}
        };
    }
    
    /**
     * 추가 정보 정규화
     * @param {Object} properties 
     * @returns {Object}
     */
    normalizeAdditional(properties) {
        return {
            job: this.extractText(properties['직업'] || properties['job']),
            education: this.extractText(properties['학력'] || properties['education']),
            notes: this.extractText(properties['비고'] || properties['notes']),
            photo: this.extractText(properties['사진'] || properties['photo']),
            burialPlace: this.extractText(properties['묘소'] || properties['burialPlace']),
            memorialDate: this.extractDate(properties['기일'] || properties['memorialDate']),
            customFields: {}
        };
    }
    
    /**
     * 2단계: 기존 데이터와 비교 및 동기화
     * @param {Array} processedData 
     * @returns {Array}
     */
    compareAndSync(processedData) {
        console.log('🔍 2단계: 데이터 비교 및 동기화 시작');
        
        const syncedData = [];
        
        // 노션 데이터 처리 (모두 신규로 처리)
        processedData.forEach(notionPerson => {
            const newPerson = this.createNewPerson(notionPerson);
            syncedData.push(newPerson);
            this.stats.added++;
            this.syncLog.push(`➕ 신규 추가: ${notionPerson.name}`);
        });
        
        this.stats.total = syncedData.length;
        console.log('✅ 동기화 완료:', this.stats);
        
        return syncedData;
    }
    
    /**
     * 신규 인물 생성
     * @param {Object} notionPerson 
     * @returns {Object}
     */
    createNewPerson(notionPerson) {
        // 노션에서 기존 ID가 있으면 사용, 없으면 새로 생성
        const existingId = this.extractText(notionPerson._original.properties['아이디']);
        const newId = existingId || this.generateId(notionPerson);
        
        return {
            id: newId,
            name: notionPerson.name,
            displayName: notionPerson.displayName,
            성별: notionPerson.gender,
            세대: notionPerson.generation,
            Line1: notionPerson.line,
            생년: notionPerson.birthYear,
            사망일: notionPerson.deathDate,
            생존상태: notionPerson.status,
            age: notionPerson.birthYear ? (new Date().getFullYear() - notionPerson.birthYear) : null,
            relationships: notionPerson.relationships,
            contact: notionPerson.contact,
            additional: notionPerson.additional,
            tags: [`${notionPerson.generation}세대`],
            stats: {
                totalDescendants: 0,
                livingDescendants: 0,
                lastContact: new Date().toISOString()
            },
            access: {
                isAdmin: false,
                canEdit: false,
                lastModified: notionPerson.lastModified,
                modifiedBy: 'notion_sync'
            }
        };
    }
    
    /**
     * ID 생성 (기존 패턴 유지)
     * @param {Object} person 
     * @returns {string}
     */
    generateId(person) {
        const line = person.line === '공통' ? 'C' : person.line.replace('Line', 'L');
        const generation = `G${person.generation}`;
        const gender = person.gender;
        const relation = person.gender === 'M' ? 'S' : 'W'; // Son/Wife 구분
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        return `${line}-${generation}-${gender}-${relation}-${random}`;
    }
    
    /**
     * 3단계: 윈도우 코어데이터 형식으로 변환
     * @param {Array} syncedData 
     * @returns {Array}
     */
    convertToWindowCoreFormat(syncedData) {
        console.log('🔄 3단계: 윈도우 코어데이터 형식 변환 시작');
        
        // 기존 CORE_DATA 형식에 맞춰 변환
        const converted = syncedData.map(person => ({
            ...person,
            // 필수 필드 보장
            id: person.id || this.generateId(person),
            name: person.name,
            displayName: person.displayName || person.name,
            성별: person.성별 || person.gender || 'M',
            세대: person.세대 || person.generation || 0,
            Line1: person.Line1 || person.line || 'Line1',
            생년: person.생년 || person.birthYear,
            사망일: person.사망일 || person.deathDate,
            생존상태: person.생존상태 || person.status || '미확인',
            age: person.age || (person.생년 ? new Date().getFullYear() - person.생년 : null),
            
            // 구조 통일
            relationships: person.relationships || {},
            contact: person.contact || {},
            additional: person.additional || {},
            tags: person.tags || [`${person.세대 || person.generation}세대`],
            stats: person.stats || {
                totalDescendants: 0,
                livingDescendants: 0,
                lastContact: new Date().toISOString()
            },
            access: person.access || {
                isAdmin: false,
                canEdit: false,
                lastModified: new Date().toISOString(),
                modifiedBy: 'notion_sync'
            }
        }));
        
        console.log('✅ 형식 변환 완료:', converted.length, '명');
        return converted;
    }
    
    /**
     * 4단계: 결과 검증
     * @param {Array} finalData 
     */
    validateSyncResult(finalData) {
        console.log('🔍 4단계: 결과 검증 시작');
        
        const validation = {
            totalCount: finalData.length,
            missingIds: [],
            missingNames: [],
            duplicateNames: [],
            generationStats: {},
            lineStats: {}
        };
        
        const nameCount = {};
        
        finalData.forEach(person => {
            // ID 확인
            if (!person.id) {
                validation.missingIds.push(person.name);
            }
            
            // 이름 확인
            if (!person.name) {
                validation.missingNames.push(person.id);
            } else {
                nameCount[person.name] = (nameCount[person.name] || 0) + 1;
            }
            
            // 세대 통계
            const gen = person.세대 || 0;
            validation.generationStats[gen] = (validation.generationStats[gen] || 0) + 1;
            
            // Line 통계
            const line = person.Line1 || 'Unknown';
            validation.lineStats[line] = (validation.lineStats[line] || 0) + 1;
        });
        
        // 중복 이름 찾기
        Object.entries(nameCount).forEach(([name, count]) => {
            if (count > 1) {
                validation.duplicateNames.push(`${name} (${count}회)`);
            }
        });
        
        console.log('📊 검증 결과:', validation);
        
        if (validation.missingIds.length > 0) {
            console.warn('⚠️ ID 누락:', validation.missingIds);
        }
        
        if (validation.duplicateNames.length > 0) {
            console.warn('⚠️ 중복 이름:', validation.duplicateNames);
        }
        
        this.syncLog.push(`📊 검증 완료 - 총 ${validation.totalCount}명`);
        this.syncLog.push(`   세대별: ${Object.entries(validation.generationStats).map(([g, c]) => `${g}세대(${c}명)`).join(', ')}`);
        this.syncLog.push(`   Line별: ${Object.entries(validation.lineStats).map(([l, c]) => `${l}(${c}명)`).join(', ')}`);
    }
    
    /**
     * 5단계: 새로운 윈도우 코어데이터 생성
     * @param {Array} finalData 
     * @returns {string}
     */
    generateNewWindowCore(finalData) {
        console.log('📝 5단계: 새로운 윈도우 코어데이터 생성');
        
        const timestamp = new Date().toISOString();
        const header = `// 한양조씨 족보 앱 - 통합 데이터 소스 (노션 167건 동기화 완료)
// 생성일: ${timestamp}
// 데이터 수: ${finalData.length}명
// 동기화 통계: 신규 ${this.stats.added}명, 업데이트 ${this.stats.updated}명, 유지 ${this.stats.unchanged}명

window.CORE_DATA = ${JSON.stringify(finalData, null, 2)};

console.log('📊 CORE_DATA 로드 완료:', {
  총인원: window.CORE_DATA.length,
  노션동기화: '167건 완료',
  생성일: '${timestamp}'
});`;
        
        console.log('✅ 새로운 윈도우 코어데이터 생성 완료');
        return header;
    }
}

// 실행 함수
async function executeSync167() {
    console.log('🚀 노션 167건-윈도우 코어데이터 동기화 시작');
    
    try {
        // 노션 167건 데이터 로드
        const notionData = JSON.parse(fs.readFileSync('notion_export_167_complete.json', 'utf8'));
        console.log('📥 노션 데이터 로드:', notionData.length, '건');
        
        // 동기화 시스템 초기화
        const syncSystem = new NotionDataSyncSystem();
        
        // 동기화 실행
        const result = await syncSystem.syncData(notionData);
        
        if (result.success) {
            console.log('✅ 동기화 성공!');
            console.log('📊 통계:', result.stats);
            
            // 새로운 윈도우 코어데이터 파일 생성
            const newCoreData = result.data;
            const filename = `data/window_core_data_167_${new Date().toISOString().replace(/[:.]/g,'-')}.js`;
            fs.writeFileSync(filename, newCoreData, 'utf8');
            console.log('📝 새로운 윈도우 코어데이터 생성:', filename);
            
            return {
                success: true,
                filename,
                stats: result.stats,
                log: result.log
            };
            
        } else {
            console.error('❌ 동기화 실패:', result.error);
            return {
                success: false,
                error: result.error,
                stats: result.stats
            };
        }
        
    } catch (error) {
        console.error('💥 시스템 오류:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// 실행
executeSync167().then(result => {
    if (result.success) {
        console.log('🎉 167건 동기화 완료!');
        console.log('📁 파일:', result.filename);
        console.log('📊 통계:', result.stats);
    } else {
        console.log('😞 동기화 실패:', result.error);
    }
}).catch(console.error);

module.exports = NotionDataSyncSystem;
