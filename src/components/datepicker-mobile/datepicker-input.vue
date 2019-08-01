<template>
	<article id="datepicker-input" class="clearfix" @click="show">
		<input type="text" readonly="readonly" class="picker-input" :value="value" @input="$emit('input', $event.target.value)" :title="value"/>
		<div class="picker-image-box">
			<img src="./date-picture.png" class="picker-image" >
		</div>
	</article>
</template>

<script>
	export default{
		name:"datepickerInput",
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
		width:100%;max-width:200px;height:30px;border:solid 1px #eee;border-radius:5px;display:inline-block;
	}
	#datepicker-input:active{
		background-color: #ECECEC !important;
	}
	.picker-input{
		width:80%;height:100%;border:none;float:left;padding-left: 5px;
	}
	.picker-image-box{
		width:20%;height:100%;float:left;background-color: #eee;position: relative;text-align: center;
	}
	.picker-image{
		height:80%;position: relative;
	}
</style>