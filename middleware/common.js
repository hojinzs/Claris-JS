// 유저 정보 클래스
// 유저 정보는 다음 구조의 배열이다.
// {
//      "id": 0,
//      "name": "system"
// }

class Clarisfns{
    //유저 토큰 생성
    makeUserToken() {
        return new Date().toISOString().slice(0,10) + "-" + Math.random().toString(36).substr(2, 9);
    }
}

module.exports = function () {
    return new Clarisfns();
}
