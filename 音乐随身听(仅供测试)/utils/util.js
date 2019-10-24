export default {
	listennum:number=>{
		if(number > 10000){
					return parseInt(number / 100) / 10 +'万';
		}else{
					return number;
		}
	}
}