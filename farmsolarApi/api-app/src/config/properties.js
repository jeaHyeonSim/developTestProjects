let config = {};

// server env dev, prod
config.env = "dev"

// Server info
config.server_ip = "localhost";
config.server_port = "7592";
config.session_time = 1 * 30 * 1000;
config.cookie_time = 1 * 30 * 1000;

// DB info
// config.connection_info = {
//     host: "192.168.0.38",
//     port: ,
//     user: "",
//     password:"",
//     database:"",
//     connectionLimit: 10,
//     multipleStatements: true
// };

// 공공데이터 포털
config.key = "";
// 카카오 REST_API KEY
config.kakaoAKkey = "5396bdb11af5af0741cf1ce924f30d27";
// 주소기반산업지원서비스 - 검색API
config.confmKey = 'devU01TX0FVVEgyMDIzMDkyNTE0MDk1MDExNDEyODQ=';
// 공공데이터포털 - 국토교통부_건축물대장 표제부
config.bldKey = 'rFQGSmKC0okekhO4D79Zw0QJugOvcbC3gvWgQHOCeDm7sskr7Nru3gUQ0bp2G%2FlS7lgrx0xqI3fszVbEilxHwg%3D%3D';
// 국가공간 - 개별공시지가속성 (발급 ID : simjh7601)
config.nsdi_indvdLandKey = "8f6b977a5c750917ea1956";
// 국가공간 - 토지소유정보속성 (발급 ID : simjh7601)
config.nsdi_possessionKey = "32d8bec0a1b921174ef409";
// 국가공간 - 토지특성속성조회 (발급 ID : simjh7601)
config.nsdi_landCharacteristicsKey = "348bb576db231e470a60aa";
// 국가공간 - 토지이동이력속성조회 (발급 ID : simjh7601)
config.nsdi_landMoveAttrKey = "a3aed635a1400b0e0be93e";
// 국가공간 - 토지특성WFS조회 (발급 ID : simjh7601)
config.nsdi_landCharacteristicsWfsKey = "41417e27f43a26c0b7e85e";



module.exports = config;