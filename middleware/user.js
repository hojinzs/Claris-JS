// 유저 정보 클래스
// 유저 정보는 다음 구조의 배열이다.
// {
//      "id": 0,
//      "name": "system"
// }

class ClarisUser{

    constructor(value){
        this.userList = [];
    }

    get List(){
        return this.userList;
    }

    get Connections(){
        return this.userList.length;
    }
    
    Add(val ={}){
        this.userList.push({
            id : val.id,
            name : val.name,
        });
    }

    Del(userSocketId){

        // 주어진 'userSocketId'로 유저 객체를 조회하여 배열번호를 알아낸다.
        let user = this.userList.find(function(n){
            return n.id == userSocketId;
        })
        let idx = this.userList.indexOf(user);

        // 찾았다면, 제거
        if(idx != -1){
            this.userList.splice(idx,1);
        }
    }

    getUserById(serchId,MustReturn = true){

        // find user Object by given id (유저 객체를 아이디를 이용해 조회한다.)
        let user = this.userList.find(function(n){
            return n.id == serchId;
        })

        // 만약 유저정보가 없고, MustReturn 옵션이 켜져있다면 가짜 유저정보라도 전달함.
        if(user == undefined && MustReturn == true){
            user = 
            {
                "id": serchId,
                "name": "Unknown"
            }
        }

        return user;
    }

}

module.exports = function () {
    return new ClarisUser();
}