<template>
	<article id="dateselect-input" class="clearfix" @click="show">
		<slot>
			<input type="text" readonly="readonly" class="select-input" :value="value" />
			<div class="select-image-box">
				<img src="./date-picture.png" class="select-image" >
			</div>
		</slot>
	</article>
</template>

<script>
	import {
		getNowFormatDate,
		formatDate
	} from './format-date.js'
	export default{
		name:"DateselectInput",
		props:{
			value:String,
			today:{
				type:Boolean,
				default:false
			}
		},
		mounted(){
			const _this = this;
			var regExp = /\d{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])/g;
			if(!regExp.test(_this.value)&&_this.today){
				_this.$emit('change-value',formatDate(getNowFormatDate(),"yyyy-MM-dd"));
			}
		},
		methods:{
			show:function(){
				var dateselect=this.dateselect;
				dateselect.$off("confirm");
				dateselect.$emit("mShow",this.value);
				dateselect.show();
				dateselect.$on("confirm",(val)=>{
					this.$emit('input',val);
				})
			}
		},
		computed:{
			dateselect(){
				return window.DATESELECT_MOBILE_BUS;
			}
		}
	}
</script>

<style scoped>
	#dateselect-input{
		width:100%;height:100%;display:inline-block;
	}
	.select-input{
		width:80%;height:100%;border:none;float:left;padding-left: 5px;
	}
	.select-image-box{
		width:20%;height:100%;;background-color: #eee;position: relative;text-align: center;display:inline-block;
	}
	.select-image{
		height:100%;position: relative;
	}
</style>