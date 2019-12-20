var flag = true;

function input_onFocus(){

}
function input_bulr(){

}
function input_keyDown(){
	if(event.keyCode==13){
		jumpPage();
	}
}
function Time(){
	var date = new Date();/*
	year = date.getFullYear();
	month = date.getMonth() + 1;
	day = date.getDate();*/
	hours = date.getHours();
	minutes = date.getMinutes();
	//seconds = date.getSeconds();
	if(minutes < 10){
		minutes = "0" + minutes;
	}
	timeText.innerText = hours + ":" + minutes;
	//currentTime = year + "年" + month + "月" + day + "日 " + hours + ":" + minutes;
};
Time();
setInterval("Time()",1000);

function time_Click(){
	if (flag)
	{
		input0.style.display="none";
		flag = false;
	}
	else
	{
		input0.style.display="";
		flag =true;
	}
}
