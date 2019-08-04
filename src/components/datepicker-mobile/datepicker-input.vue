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
	export default{
		name:"DatepickerInput",
		props:['value'],
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
		height:80%;position: relative;
	}
</style>