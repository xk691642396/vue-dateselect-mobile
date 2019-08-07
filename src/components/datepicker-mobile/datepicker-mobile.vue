<template>
	<article id="datepicker-mobile">
		<div class="datepicker-mobile-cover" v-if="datepicker.isShow" @click="cancel" @touchmove.prevent></div>
		<transition name="datepicker">
			<div class="datepicker-mobile-box" v-show="datepicker.isShow" @touchmove.prevent>
				<div class="header">
					<a class="btn-cancel" @click="cancel">取消</a>
					<span class="choose-txt">请选择时间</span>
					<a class="btn-confirm" @click="confirm">确认</a>
				</div>
				<div class="datepicker-box clearfix">
					<div class="unit-box clearfix">
						<div class="unit">
							年
						</div>
						<div class="unit">
							月
						</div>
						<div class="unit">
							日
						</div>
					</div>
					<div class="mtop-mask"></div>
					<div class="mbottom-mask"></div>
					<div class="year">
						<ul class="year-list" :style="{transform:'translateY(-'+(perHeight*year.thisIndex+year.moveLen)+'px)',transition:'all '+duration+'s cubic-bezier(.05,0.25,0.06,1.1)'}">
							<li class="tooth" v-for="(item,index) of year.list" :key="index" :class="{'top-mask':index==year.thisIndex,'center-choose':index==year.thisIndex+1,'bottom-mask':index==year.thisIndex+2,}">{{item}}</li>
						</ul>
					</div>
					<div class="month">
						<ul class="month-list" :style="{transform:'translateY(-'+(perHeight*month.thisIndex+month.moveLen)+'px)',transition:'all '+duration+'s cubic-bezier(.05,0.25,0.06,1.1)'}">
							<li class="tooth" v-for="(item,index) of month.list" :key="index" :class="{'top-mask':index==month.thisIndex,'center-choose':index==month.thisIndex+1,'bottom-mask':index==month.thisIndex+2,}">{{item}}</li>
						</ul>						
					</div>
					<div class="date">
						<ul class="date-list" :style="{transform:'translateY(-'+(perHeight*mDate.thisIndex+mDate.moveLen)+'px)',transition:'all '+duration+'s cubic-bezier(.05,0.25,0.06,1.1)'}">
							<li class="tooth" v-for="(item,index) of mDate.list" :key="index" :class="{'top-mask':index==mDate.thisIndex,'center-choose':index==mDate.thisIndex+1,'bottom-mask':index==mDate.thisIndex+2,}">{{item}}</li>
						</ul>
					</div>
				</div>
			</div>
		</transition>
	</article>
</template>

<script>
	function arrIndex(arr,item){
		for( var i=0;i<arr.length;i++){
		    if(arr[i]==item)
		    return i;
		}
		return -1;
	}
	import {
		getNowFormatDate,
    	changeDoubleStr,
		formatDate
	} from './format-date.js'
	export default{
		name:"DatepickerMobile",
		data(){
			return{
				value:getNowFormatDate(),//初始值
				perHeight:50,//每次移动距离
				duration:0.5,//移动时间
				year:{
					len:200,
					list:[""],
					thisIndex:0,//列表当前索引
					add:10,//加速下拉，每次下拉条数
					moveLen:0,//缓慢下拉，列表跟着滑动距离
					addNum:0,//缓慢下拉，下拉的数据条数
					direct:"",//滑动方向
					startPos:null,//开始节点
					endPos:null,//结束节点
				},
				month:{
					len:12,
					list:[""],
					thisIndex:0,//列表当前索引
					add:4,//加速下拉，每次下拉条数
					moveLen:0,//缓慢下拉，列表跟着滑动距离
					addNum:0,//缓慢下拉，下拉的数据条数
					direct:"",//滑动方向
					startPos:null,//开始节点
					endPos:null,//结束节点
				},
				mDate:{
					len:31,
					list:[""],
					thisIndex:0,//列表当前索引
					add:7,//加速下拉，每次下拉条数
					moveLen:0,//缓慢下拉，列表跟着滑动距离
					addNum:0,//缓慢下拉，下拉的数据条数
					direct:"",//滑动方向
					startPos:null,//开始节点
					endPos:null,//结束节点
				},
				yearSelect:"1900",//选中的年份
				monthSelect:"01",//选中月份
				dateSelect:"01",//选中日期
			}
		},
		mounted:function(){
			var _this=this;
			_this.initYearMonth();
			_this.eventBind();
			_this.onShow();
		},
		methods:{
			onShow(){
				var _this=this;
				_this.datepicker.$off("show");
				_this.datepicker.$on('mShow',(val)=>{
					_this.duration=0;
					if(isNaN(val)&&!isNaN(Date.parse(val))){
					　　_this.value=val;
					}
					var dateArr=formatDate(this.value,"yyyy-MM-dd").split("-");
					_this.year.thisIndex=arrIndex(this.year.list,dateArr[0])-1;
					_this.month.thisIndex=arrIndex(this.month.list,dateArr[1])-1;
					_this.mDate.thisIndex=arrIndex(this.mDate.list,dateArr[2])-1;
					setTimeout(function(){
						_this.duration=0.5;
					},500)
				})
			},
			cancel:function(){
				this.datepicker.hide();
				this.onShow();
			},
			confirm:function(){
				this.datepicker.$emit("confirm",this.yearSelect+"-"+this.monthSelect+"-"+this.dateSelect);
				this.datepicker.hide();
				this.onShow();
			},
			initYearMonth:function(){
				var _this=this;
				var year=this.year;
				var month=this.month;
				var mDate=this.mDate;
				for(var i=1900;i<1900+year.len;i++){
					year.list.push(i);
				}
				year.list.push("");
				for(var i=1;i<1+month.len;i++){
					month.list.push(changeDoubleStr(i));
				}
				month.list.push("");
				for(var i=1;i<1+mDate.len;i++){
					mDate.list.push(changeDoubleStr(i));
				}
				mDate.list.push("");
			},
			//绑定touch事件
			eventBind:function(){
				var _this=this;
				var mDom={
					year:document.querySelector(".year-list"),
					month:document.querySelector(".month-list"),
					mDate:document.querySelector(".date-list")
				}
				for(var key in mDom){
					var currentObj=this[key];
					_this.touchBind(currentObj,mDom[key]);
					
				}
			},
			touchBind:function(currentObj,currentDom){
				var _this=this;
				currentDom.addEventListener("touchstart",function(event){
					var touch = event.targetTouches[0];
					currentObj.startPos = {x:touch.pageX,y:touch.pageY,time:+new Date};
				},false);
				currentDom.addEventListener("touchmove",function(event){
					event.preventDefault();
					var touch = event.targetTouches[0];
					currentObj.endPos = {x:touch.pageX - currentObj.startPos.x,y:touch.pageY - currentObj.startPos.y,};
					currentObj.direct = Math.abs(currentObj.endPos.x) < Math.abs(currentObj.endPos.y) ? 1:0;//为1时，表示纵向滑动，0为横向滑动
					_this.moveThis(currentObj,currentDom);
				},false);
				currentDom.addEventListener("touchend",function(event){
					var duration = new Date - currentObj.startPos.time;
				　	if(currentObj.direct === 1){
						_this.scrollList(currentDom,currentObj,duration)
				 	}
				},false)
			},
			scrollList:function(_div,currentObj,duration){
				var _this=this;
				currentObj.moveLen=0;
				var scrollLen=currentObj.endPos.y
				if(duration<150&&Math.abs(scrollLen)>100){
					if(scrollLen>0){
						if(currentObj.thisIndex<currentObj.add){
							currentObj.thisIndex=0;
						}
						else{
							currentObj.thisIndex-=currentObj.add;
						}
					}else{
						if(currentObj.thisIndex>(currentObj.len-currentObj.add-1)){
							currentObj.thisIndex=currentObj.len-1;
						}
						else{
							currentObj.thisIndex+=currentObj.add;
						}
					}				
				}else{
					if(scrollLen>0){
						if(currentObj.thisIndex<currentObj.addNum){
							currentObj.thisIndex=0;
						}
						else{
							currentObj.thisIndex-=currentObj.addNum;
						}
					}else{
						if(currentObj.thisIndex>(currentObj.len-currentObj.addNum-1)){
							currentObj.thisIndex=currentObj.len-1;
						}
						else{
							currentObj.thisIndex+=currentObj.addNum;
						}
					}
				}
			},
			moveThis(currentObj,_div){
				var _this=this;
				var distance=currentObj.endPos.y;
				currentObj.moveLen=-distance;
				var addNum=Math.round(Math.abs(distance)/_this.perHeight);
				currentObj.addNum=addNum;
			},
			changeDate:function(){
				if(this.monthSelect=="04"||this.monthSelect=="06"||this.monthSelect=="09"||this.monthSelect=="11"){
					this.mDate.len=30;
					if(this.mDate.thisIndex>29){
						this.mDate.thisIndex=29;
					}
				}else if(this.monthSelect=="02"){
					if((this.yearSelect % 4 == 0) && (this.yearSelect % 100 != 0 || this.yearSelect % 400 == 0)){
						this.mDate.len=29;
						if(this.mDate.thisIndex>28){
							this.mDate.thisIndex=28;
						}
					}else{
						this.mDate.len=28;
						if(this.mDate.thisIndex>27){
							this.mDate.thisIndex=27;
						}
					}
				}else{
					this.mDate.len=31;
				}
			}
		},
		computed:{
			datepicker(){
				return window.DATEPICKER_MOBILE_BUS;
			}
		},
		watch:{
			"year.thisIndex"(val){
				this.yearSelect=this.year.list[val+1];
				this.changeDate();
			},
			"month.thisIndex"(val){
				this.monthSelect=this.month.list[val+1];
				this.changeDate();
			},
			"mDate.thisIndex"(val){
				this.dateSelect=this.mDate.list[val+1];
			},
			"mDate.len"(val){
				this.mDate.list.length=0;
				this.mDate.list.push("");
				for(var i=1;i<1+val;i++){
					this.mDate.list.push(changeDoubleStr(i));
				}
				this.mDate.list.push("");
			}
		}
	}
</script>

<style scoped>
	@media only screen and (orientation:landscape) {
		.datepicker-mobile-cover,
		.datepicker-mobile-box{
			max-width:40vw;left:30vw;
		}
	}
	.datepicker-mobile-cover{
		width: 100vh;height: 100vh;background-color:rgba(0,0,0,.5) ;position:fixed;top:0;z-index: 2017;
	}
	.datepicker-mobile-box{
		width:100vw;height:200px;position:fixed;bottom:0;z-index: 2018;padding: 10px;background-color: #fff;border-top: solid 1px #ccc;
	}
	.header{
		width:100%;height:30px;line-height:30px;text-align:center;position:relative;
	}
	.btn-cancel{
		position: absolute;left: 0;top:0;color:#5290F5 ;
	}
	.btn-cancel:active{
		background-color: #ECECEC;
	}
	.btn-confirm{
		position: absolute;right: 0;top:0;color:#5290F5 ;
	}
	.btn-confirm:active{
		background-color: #ECECEC;
	}
	.datepicker-box{
		width:100%;height:calc(100% - 30px);position:relative;font-size: 16px;
	}
	.unit-box{
		position: absolute;top:50%;height: 50px;width: 100%;border-top:solid 1px #ccc;border-bottom:solid 1px #ccc;margin-top: -25px;
	}
	.unit{
		width:calc(100% / 3);float:left;text-align: right;line-height:50px;font-weight: bold;
	}
	.datepicker-box .year,
	.datepicker-box .month,
	.datepicker-box .date{
		width:calc(100% / 3);float: left;overflow-y:hidden ;height: 100%;position:relative;
	}
	.tooth{
		text-align: center;line-height:50px ;height: 50px;
	}
	.center-choose{
		font-weight: bold;
	}
	.mtop-mask{
		position: absolute;left: 0;top:0;z-index: -1;width:100%;height: 50px;background:linear-gradient(to top,rgba(238,238,238,0),rgba(238,238,238,.2));
	}
	.mbottom-mask{
		position: absolute;left: 0;bottom:0;z-index: -1;width:100%;height: 50px;background: linear-gradient(rgba(238,238,238,0),rgba(238,238,238,.2));
	}
	.top-mask{
		 /*background: linear-gradient(red, blue)*/
	}
	.bottom-mask{
		
	}
	.datepicker-enter,
	.datepicker-leave-to{
		transform: translateY(100%);opacity: 0;
	}
	.datepicker-enter-to,
	.datepicker-leave{
		transform: translateY(-1%);;opacity: 1;
	}
	.datepicker-enter-active,
	.datepicker-leave-active{
		transition:all .5s;transform-origin: bottom;
	}
</style>