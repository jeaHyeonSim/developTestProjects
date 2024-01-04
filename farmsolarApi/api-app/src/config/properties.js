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
// 공공데이터포털
config.openApiKey = 'rFQGSmKC0okekhO4D79Zw0QJugOvcbC3gvWgQHOCeDm7sskr7Nru3gUQ0bp2G%2FlS7lgrx0xqI3fszVbEilxHwg%3D%3D';
// 국가법령 API (가입한 ID)
config.lawKey = "simjh7601";



module.exports = config;