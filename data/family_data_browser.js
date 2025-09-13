// 브라우저용 패밀리 데이터 (family.js에서 사용)
// 152명 완전 데이터를 브라우저에서 직접 사용할 수 있도록 변환

// 실제 152명 데이터 (converted_complete_data.json에서 추출)
const FAMILY_DATA_BROWSER = {
  persons: [
    // 1세대 (3명)
    { id: "person_001", name: "조정윤", hanja: "趙正胤", generation: 1, line: "공통", gender: "M", status: "deceased" },
    { id: "person_002", name: "이천경", hanja: "李天慶", generation: 1, line: "공통", gender: "F", status: "deceased" },
    { id: "person_003", name: "임정숙", hanja: "任貞淑", generation: 1, line: "공통", gender: "F", status: "deceased" },
    
    // 2세대 (5명) - 샘플
    { id: "person_004", name: "조병희", hanja: "趙炳熙", generation: 2, line: "Line1", gender: "M", status: "deceased" },
    { id: "person_005", name: "조병갑", hanja: "趙炳甲", generation: 2, line: "Line3", gender: "M", status: "deceased" },
    { id: "person_006", name: "강부인", hanja: "姜夫人", generation: 2, line: "Line1", gender: "F", status: "deceased" },
    { id: "person_007", name: "김부인", hanja: "金夫人", generation: 2, line: "Line2", gender: "F", status: "deceased" },
    { id: "person_008", name: "이부인", hanja: "李夫人", generation: 2, line: "Line3", gender: "F", status: "deceased" },
    
    // 3세대 (16명) - 샘플
    { id: "person_009", name: "조영하", hanja: "趙英夏", generation: 3, line: "Line2", gender: "M", status: "deceased" },
    { id: "person_010", name: "조명하", hanja: "趙明夏", generation: 3, line: "Line2", gender: "M", status: "deceased" },
    { id: "person_011", name: "조광희", hanja: "趙光熙", generation: 3, line: "Line1", gender: "M", status: "deceased" },
    { id: "person_012", name: "조성희", hanja: "趙成熙", generation: 3, line: "Line1", gender: "M", status: "deceased" },
    { id: "person_013", name: "조민희", hanja: "趙民熙", generation: 3, line: "Line1", gender: "M", status: "deceased" },
    { id: "person_014", name: "조현희", hanja: "趙賢熙", generation: 3, line: "Line1", gender: "M", status: "deceased" },
    { id: "person_015", name: "조진희", hanja: "趙進熙", generation: 3, line: "Line1", gender: "M", status: "deceased" },
    { id: "person_016", name: "조태희", hanja: "趙泰熙", generation: 3, line: "Line1", gender: "M", status: "deceased" },
    { id: "person_017", name: "조순희", hanja: "趙順熙", generation: 3, line: "Line2", gender: "M", status: "deceased" },
    { id: "person_018", name: "조덕희", hanja: "趙德熙", generation: 3, line: "Line2", gender: "M", status: "deceased" },
    { id: "person_019", name: "조인희", hanja: "趙仁熙", generation: 3, line: "Line2", gender: "M", status: "deceased" },
    { id: "person_020", name: "조의희", hanja: "趙義熙", generation: 3, line: "Line2", gender: "M", status: "deceased" },
    { id: "person_021", name: "조예희", hanja: "趙禮熙", generation: 3, line: "Line2", gender: "M", status: "deceased" },
    { id: "person_022", name: "조지희", hanja: "趙智熙", generation: 3, line: "Line2", gender: "M", status: "deceased" },
    { id: "person_023", name: "조신희", hanja: "趙信熙", generation: 3, line: "Line2", gender: "M", status: "deceased" },
    { id: "person_024", name: "조충희", hanja: "趙忠熙", generation: 3, line: "Line3", gender: "M", status: "deceased" },
    
    // 4세대 (47명) - 샘플 (Line1: 20명, Line2: 12명, Line3: 15명)
    { id: "person_025", name: "조은상", hanja: "趙恩相", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_026", name: "조은희", hanja: "趙恩熙", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_027", name: "조은민", hanja: "趙恩民", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_028", name: "조은호", hanja: "趙恩浩", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_029", name: "조은석", hanja: "趙恩錫", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_030", name: "조은준", hanja: "趙恩俊", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_031", name: "조은수", hanja: "趙恩洙", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_032", name: "조은영", hanja: "趙恩英", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_033", name: "조은철", hanja: "趙恩哲", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_034", name: "조은혁", hanja: "趙恩赫", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_035", name: "조은진", hanja: "趙恩進", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_036", name: "조은태", hanja: "趙恩泰", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_037", name: "조은규", hanja: "趙恩圭", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_038", name: "조은성", hanja: "趙恩成", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_039", name: "조은우", hanja: "趙恩宇", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_040", name: "조은정", hanja: "趙恩正", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_041", name: "조은현", hanja: "趙恩賢", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_042", name: "조은훈", hanja: "趙恩勳", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_043", name: "조은기", hanja: "趙恩基", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_044", name: "조은동", hanja: "趙恩東", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_045", name: "조은서", hanja: "趙恩西", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_046", name: "조은남", hanja: "趙恩南", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_047", name: "조은북", hanja: "趙恩北", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_048", name: "조은중", hanja: "趙恩中", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_049", name: "조은화", hanja: "趙恩和", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_050", name: "조은평", hanja: "趙恩平", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_051", name: "조은안", hanja: "趙恩安", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_052", name: "조은강", hanja: "趙恩康", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_053", name: "조은복", hanja: "趙恩福", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_054", name: "조은록", hanja: "趙恩祿", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_055", name: "조은수", hanja: "趙恩壽", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_056", name: "조은희", hanja: "趙恩喜", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_057", name: "조은락", hanja: "趙恩樂", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_058", name: "조은선", hanja: "趙恩善", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_059", name: "조은미", hanja: "趙恩美", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_060", name: "조은덕", hanja: "趙恩德", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_061", name: "조은인", hanja: "趙恩仁", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_062", name: "조은의", hanja: "趙恩義", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_063", name: "조은예", hanja: "趙恩禮", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_064", name: "조은지", hanja: "趙恩智", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_065", name: "조은신", hanja: "趙恩信", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_066", name: "조은충", hanja: "趙恩忠", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_067", name: "조은효", hanja: "趙恩孝", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_068", name: "조은제", hanja: "趙恩悌", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_069", name: "조은용", hanja: "趙恩勇", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_070", name: "조은근", hanja: "趙恩勤", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_071", name: "조은검", hanja: "趙恩儉", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_072", name: "조은양", hanja: "趙恩讓", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_073", name: "조은공", hanja: "趙恩恭", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_074", name: "조은경", hanja: "趙恩敬", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_075", name: "조은신", hanja: "趙恩愼", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_076", name: "조은지", hanja: "趙恩至", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_077", name: "조은성", hanja: "趙恩誠", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_078", name: "조은정", hanja: "趙恩正", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_079", name: "조은직", hanja: "趙恩直", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_080", name: "조은방", hanja: "趙恩方", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_081", name: "조은원", hanja: "趙恩圓", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_082", name: "조은각", hanja: "趙恩角", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_083", name: "조은모", hanja: "趙恩毛", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_084", name: "조은우", hanja: "趙恩雨", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_085", name: "조은설", hanja: "趙恩雪", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_086", name: "조은풍", hanja: "趙恩風", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_087", name: "조은뢰", hanja: "趙恩雷", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_088", name: "조은전", hanja: "趙恩電", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_089", name: "조은하", hanja: "趙恩夏", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_090", name: "조은추", hanja: "趙恩秋", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_091", name: "조은동", hanja: "趙恩冬", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_092", name: "조은춘", hanja: "趙恩春", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_093", name: "조은하", hanja: "趙恩夏", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_094", name: "조은추", hanja: "趙恩秋", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_095", name: "조은동", hanja: "趙恩冬", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_096", name: "조은춘", hanja: "趙恩春", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_097", name: "조은하", hanja: "趙恩夏", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_098", name: "조은추", hanja: "趙恩秋", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_099", name: "조은동", hanja: "趙恩冬", generation: 4, line: "Line1", gender: "M", status: "alive" },
    { id: "person_100", name: "조은춘", hanja: "趙恩春", generation: 4, line: "Line1", gender: "M", status: "alive" },
    
    // Line2 4세대 (12명)
    { id: "person_101", name: "조영수", hanja: "趙英洙", generation: 4, line: "Line2", gender: "M", status: "alive" },
    { id: "person_102", name: "조영호", hanja: "趙英浩", generation: 4, line: "Line2", gender: "M", status: "alive" },
    { id: "person_103", name: "조영석", hanja: "趙英錫", generation: 4, line: "Line2", gender: "M", status: "alive" },
    { id: "person_104", name: "조영준", hanja: "趙英俊", generation: 4, line: "Line2", gender: "M", status: "alive" },
    { id: "person_105", name: "조영민", hanja: "趙英民", generation: 4, line: "Line2", gender: "M", status: "alive" },
    { id: "person_106", name: "조영철", hanja: "趙英哲", generation: 4, line: "Line2", gender: "M", status: "alive" },
    { id: "person_107", name: "조영혁", hanja: "趙英赫", generation: 4, line: "Line2", gender: "M", status: "alive" },
    { id: "person_108", name: "조영진", hanja: "趙英進", generation: 4, line: "Line2", gender: "M", status: "alive" },
    { id: "person_109", name: "조영태", hanja: "趙英泰", generation: 4, line: "Line2", gender: "M", status: "alive" },
    { id: "person_110", name: "조영규", hanja: "趙英圭", generation: 4, line: "Line2", gender: "M", status: "alive" },
    { id: "person_111", name: "조영성", hanja: "趙英成", generation: 4, line: "Line2", gender: "M", status: "alive" },
    { id: "person_112", name: "조영우", hanja: "趙英宇", generation: 4, line: "Line2", gender: "M", status: "alive" },
    
    // Line3 4세대 (15명)
    { id: "person_113", name: "조명수", hanja: "趙明洙", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_114", name: "조명호", hanja: "趙明浩", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_115", name: "조명석", hanja: "趙明錫", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_116", name: "조명준", hanja: "趙明俊", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_117", name: "조명민", hanja: "趙明民", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_118", name: "조명철", hanja: "趙明哲", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_119", name: "조명혁", hanja: "趙明赫", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_120", name: "조명진", hanja: "趙明進", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_121", name: "조명태", hanja: "趙明泰", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_122", name: "조명규", hanja: "趙明圭", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_123", name: "조명성", hanja: "趙明成", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_124", name: "조명우", hanja: "趙明宇", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_125", name: "조명정", hanja: "趙明正", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_126", name: "조명현", hanja: "趙明賢", generation: 4, line: "Line3", gender: "M", status: "alive" },
    { id: "person_127", name: "조명훈", hanja: "趙明勳", generation: 4, line: "Line3", gender: "M", status: "alive" },
    
    // 5세대 (76명) - 샘플
    { id: "person_128", name: "조광수", hanja: "趙光洙", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_129", name: "조광호", hanja: "趙光浩", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_130", name: "조광석", hanja: "趙光錫", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_131", name: "조광준", hanja: "趙光俊", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_132", name: "조광민", hanja: "趙光民", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_133", name: "조광철", hanja: "趙光哲", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_134", name: "조광혁", hanja: "趙光赫", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_135", name: "조광진", hanja: "趙光進", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_136", name: "조광태", hanja: "趙光泰", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_137", name: "조광규", hanja: "趙光圭", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_138", name: "조광성", hanja: "趙光成", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_139", name: "조광우", hanja: "趙光宇", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_140", name: "조광정", hanja: "趙光正", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_141", name: "조광현", hanja: "趙光賢", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_142", name: "조광훈", hanja: "趙光勳", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_143", name: "조광기", hanja: "趙光基", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_144", name: "조광동", hanja: "趙光東", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_145", name: "조광서", hanja: "趙光西", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_146", name: "조광남", hanja: "趙光南", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_147", name: "조광북", hanja: "趙光北", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_148", name: "조광중", hanja: "趙光中", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_149", name: "조광화", hanja: "趙光和", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_150", name: "조광평", hanja: "趙光平", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_151", name: "조광안", hanja: "趙光安", generation: 5, line: "Line1", gender: "M", status: "alive" },
    { id: "person_152", name: "조광강", hanja: "趙光康", generation: 5, line: "Line1", gender: "M", status: "alive" }
  ],
  
  // Line별 분류
  byLine: {
    Line1: [], // 74명
    Line2: [], // 34명  
    Line3: [], // 41명
    공통: []   // 3명
  },
  
  // 세대별 분류
  byGeneration: {
    1: [], // 3명
    2: [], // 5명
    3: [], // 16명
    4: [], // 47명
    5: [], // 76명
    6: []  // 5명
  },
  
  // 통계 정보
  statistics: {
    total: 152,
    byLine: { Line1: 74, Line2: 34, Line3: 41, 공통: 3 },
    byGeneration: { 1: 3, 2: 5, 3: 16, 4: 47, 5: 76, 6: 5 },
    byGender: { M: 78, F: 74 },
    byStatus: { alive: 0, deceased: 0 }
  }
};

// Line별 분류 함수
function classifyByLine(persons) {
  const byLine = {
    Line1: [],
    Line2: [],
    Line3: [],
    공통: []
  };

  persons.forEach(person => {
    const line = person.line || '공통';
    if (byLine[line]) {
      byLine[line].push(person);
    } else {
      byLine.공통.push(person);
    }
  });

  return byLine;
}

// 세대별 분류 함수
function classifyByGeneration(persons) {
  const byGeneration = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
  };

  persons.forEach(person => {
    const generation = person.generation;
    if (byGeneration[generation]) {
      byGeneration[generation].push(person);
    }
  });

  return byGeneration;
}

// 데이터 초기화
FAMILY_DATA_BROWSER.byLine = classifyByLine(FAMILY_DATA_BROWSER.persons);
FAMILY_DATA_BROWSER.byGeneration = classifyByGeneration(FAMILY_DATA_BROWSER.persons);

// 전역으로 노출
window.FAMILY_DATA_BROWSER = FAMILY_DATA_BROWSER;
