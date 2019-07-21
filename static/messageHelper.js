// 메시지 JSON Helper
// 메시지를 구조화하여 파싱하는 클래스
// 서버, 클라이언트 양쪽에서 사용한다.
// {
//     "user": {
//         "id": 4,
//         "name": "김두한"
//     },
//     "outputs": [
//         {
//             "simpleText": {
//                 "text": "이보시게 심영이 나 김두한이야."
//             }
//         },
//         {
//             "simpleText": {
//                 "text": "왜 왔는지 알겠나??"
//             }
//         }
//     ]
// }

class ClarisMessage{

    constructor(value){
        //initial Values
        this.Message = {
            "user": {
                "id": 4,
                "name": ""
            },
            "outputs": []
        };

        //입력값이 있을 경우 세팅한다.
        if(value){
            console.log(value);

            // 입력값 검증 후 세팅
            try {
                this.setMessage(value);
                this.Message.user.id = value.user.id
                this.Message.user.id = value.user.id
            } catch (error) {
                throw Error('un correnct json type',error);
            }
        };
    }

    setMessage(value){
        this.Message = value;
        console.log('ClarisMessage > ','setMessage > ',this.Message);
    }
    
    getWho(){
        return this.Message.user.name;
    }

    setSimpleText(user,value){
        if(!user){
            user = {
                "id": 0,
                "name": "unknown"
            }
        }

        let json = {
            "user": user,
            "outputs": [
                {
                    "simpleText": {
                        "text": value
                    }
                },
            ]
        }
    
        return json;
    }

    setSystemMessage(value){
        let json = {
            "user": {
                "id": 0,
                "name": "system"
            },
            "outputs": [
                {
                    "simpleText": {
                        "text": value
                    }
                },
            ]
        }
    
        return json;
    }

    // 메시지 구조 예시
    forDollor() {
        let json = 
        {
            "user": {
                "id": 4,
                "name": "김두한"
            },
            "outputs": [
                {
                    "simpleText": {
                        "text": "이보시게 심영이 나 김두한이야."
                    }
                },
                {
                    "simpleText": {
                        "text": "왜 왔는지 알겠나??"
                    }
                }
            ]
        }
    
        return json;
    }

}

module.exports = function (value) {
    return new ClarisMessage(value);
}