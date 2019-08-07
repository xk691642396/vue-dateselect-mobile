<template>
	<article id="datepicker-input" class="clearfix" @click="show">
		<slot>
			<input type="text" readonly="readonly" class="picker-input" :value="value" />
			<div class="picker-image-box">
				<img src="./date-picture.png" class="picker-image" >
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
		name:"DatepickerInput",
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
				var datepicker=this.datepicker;
				datepicker.$off("confirm");
				datepicker.$emit("mShow",this.value);
				datepicker.show();
				datepicker.$on("confirm",(val)=>{
					this.$emit('change-value',val);
				})
			}
		},
		computed:{
			datepicker(){
				return window.DATEPICKER_MOBILE_BUS;
			}
		}
	}
</script>

<style scoped>
	#datepicker-input{
		width:100%;height:100%;display:inline-block;
	}
	.picker-input{
		width:80%;height:100%;border:none;float:left;padding-left: 5px;
	}
	.picker-image-box{
		width:20%;height:100%;;background-color: #eee;position: relative;text-align: center;display:inline-block;
	}
	.picker-image{
		height:100%;position: relative;
	}
</style>