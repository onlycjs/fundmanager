class App {
    
    constructor(){
        //펀드 리스트
        this.fundList = [];
        this.fundCnt = 1; //현재 펀드번호
        this.nav = document.querySelectorAll("nav a");
        this.nav.forEach(x => {
            x.addEventListener("click", this.changeMenu.bind(this));
        });

        this.articleList = document.querySelectorAll("article");

        this.loadingMethod = {
            "list": this.loadingList.bind(this),
            "register": this.loadingRegister.bind(this),
            "investor": this.loadingInvestor.bind(this)
        }

        document.querySelector("#register button")
                .addEventListener("click", this.registerFund.bind(this));
    }

    changeMenu(e){
        e.preventDefault();
        let target = e.target.dataset.target;

        this.articleList.forEach(x => x.classList.remove("active"));
        document.querySelector("#" + target).classList.add("active");
        
        this.nav.forEach(x => x.classList.remove("active"));
        e.target.classList.add("active");

        this.loadingMethod[target]();
    }

    //펀드 등록페이지
    loadingRegister(){
        let no = "00000" + this.fundCnt;
        no = no.substring(no.length - 5);

        document.querySelector("#fundNo").value = no;
        document.querySelector("#fundName").value = "";
        document.querySelector("#endDate").value = "";
        document.querySelector("#total").value = "";
    }

    //펀드 등록하는 로직
    registerFund(){
        let no = document.querySelector("#fundNo").value;
        let name = document.querySelector("#fundName").value;
        let endDate = document.querySelector("#endDate").value;
        let total = document.querySelector("#total").value;
        if(name == "" || endDate == "" || total == ""){
            this.showMsg("값이 누락되어 있습니다.");
            return;
        }

        let fund = new Fund(no, name, endDate, total);
        this.fundList.push(fund);
        this.showMsg("등록되었습니다.");
        this.fundCnt++;
        this.nav[0].click();
    }

    //펀드 리스트 페이지
    loadingList(){
        console.log("리스트페이지");
    }

    //투자자 보는 페이지
    loadingInvestor(){
        console.log("투자자페이지");
    }

    showMsg(msg){
        alert(msg);
    }
}



window.onload = function(){
    const app = new App();
}