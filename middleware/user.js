/**
 * Claris_User :: 접속한 유저들의 데이터를 관리하는 클래스.
 * 유저 Object의 배열 및 접근 메소드로 이루어짐.
 * @class
 */

const uuidv4 = require('uuid/v4');

let Common = require('./common')();
class ClarisUser{

    constructor(){
        this.userList = [];
        this.seq = 0;
    };

    /**
     * 연결, 인증 정보를 제외한 유저 목록을 반환한다.
     * @returns {Array} 유저 목록 배열
     */
    get List(){
        let UserArray = new Array;
        
        this.userList.forEach(user => {
            UserArray.push({
                id : user.id,
                name : user.name,
                connect : user.connect,
                logindate : user.logindate,
                logoutdate : user.logoutdate,
            })
        });

        return this.userList;
    };

    /**
     * 현재 접속중인 (status = 'LIVE') 사람수를 반환한다
     * @returns {Number} 접속중인 사람 수
     */
    get Connections(){
        return this.userList.filter(u => u.status == 'LIVE').length;
    };
    
    /**
     * 메모리의 유저 목록에 유저 정보를 추가한다.
     * @param {Object} _val user 객체 
     * @returns {Object} 생성된 유저 정보
     */
    Add(_val = Object){
        this.seq = this.seq + 1

        // User 객체 생성
        let newUser = {
            id : this.seq,
            name : _val.name, // 이름
            token: uuidv4(), // 토큰
            socketid : _val.socketid, // 접속중인 소켓 id
            connect : 1, // 접속 상태. (LIVE|DISCONNECT)
            logindate : new Date(), // 접속 일시
            logoutdate : null, // 접속이 끊긴 일시
        }

        // userList 배열에 넣는다
        this.userList.push(newUser);

        console.log("HERE COMES A NEW USER => ",newUser);

        return newUser;
    };

    /**
     * 메모리의 유저 목록에서 유저 정보를 삭제한다.
     * @param {Number} _id 유저 아이디
     */
    Del(_id){

        // 주어진 '_id'로 유저 객체를 조회하여 배열번호를 알아낸다.
        let user = this.userList.find(function(n){
            return n.id == _id;
        })
        let idx = this.userList.indexOf(user);

        // 찾았다면, 제거
        if(idx != -1){
            this.userList.splice(idx,1);
        }
    };

    /**
     * 메모리의 유저 목록에서 token이 일치하는 유저의 접속 상태(connect)를 1로 변경하고 소켓id와 로그인 일시를 기록한다.
     * @param {String} _token 유저 토큰
     * @param {String} _socketId 소켓 id
     * @returns {Object} 유저 정보 반환
     */
    Connect(_token,_socketId){
        // 유저 배열에서 토큰이 일치하는 유저의 인덱스를 가져온다.
        let idx = this.userList.findIndex(i => i.token == _token);

        // 찾았다면, 상태를 갱신함.
        if(idx != -1){
            this.userList[idx].connect = 1;
            this.userList[idx].logindate = new Date();
            this.userList[idx].socketid = _socketId;
        }

        console.log("USER reCONNECT => ",this.userList[idx]);

        return this.userList[idx];
    };

    
    /**
     * 메모리의 유저 목록에서 sockectId와 일치하는 유저의 접속 상태(connect)를 0으로 변경하고 연결해제 일시를 기록한다.
     * @param {String} _socketId 소켓 아이디
     * @returns {Object} 유저 정보 반환
     */
    Disconnect(_socketId){

        // 유저 배열에서 소켓 아이디가 일치하는 유저의 인덱스를 가져온다.
        let idx = this.userList.findIndex(i => i.socketid == _socketId);

        // 찾았다면, 상태를 갱신함.
        if(idx != -1){
            this.userList[idx].connect = 0;
            this.userList[idx].logoutdate = new Date();
        }

        console.log("USER DISCONNECT => ",this.userList[idx]);

        return this.userList[idx];
    };

    /**
     * 메모리의 유저 목록에서 socketId와 일치하는 유저를 가져온다.
     * @param {String} _socketId 유저의 소켓 id string
     * @param {Boolean} _MustReturn 필수 리턴 여부
     * @returns {Object} 유저 정보 반환
     */
    getUserBySocketId(_socketId,_MustReturn = true){

        // 유저 배열에서 소켓 아이디가 일치하는 유저 정보를 가져온다.
        let user = this.userList.find(function(n){
            return n.socketid == _socketId;
        })

        // 만약 유저정보가 없고, MustReturn 옵션이 켜져있다면 가짜 유저정보라도 전달함.
        if(user == undefined && _MustReturn == true){
            user = 
            {
                "id": "undefined",
                "name": "undefined"
            }

            return user;
        }

        return user;
    };

    /**
     * 메모리의 유저 목록에서 토큰값과 일치하는 유저 정보를 가져온다.
     * @param {String} _token 유저 토큰값
     * @returns {Object} 유저 정보 반환
     */
    getUserByToken(_token){
        // 유저 배열에서 토큰값과 일치하는 유저 정보를 가져온다.
        let user = this.userList.find(function(n){
            return n.token == _token;
        })

        // 없다면 null을 리턴
        return user;
    };

}

module.exports = function () {
    return new ClarisUser();
}