import datepickerMobile from './datepicker-mobile.vue'
import datepickerInput from './datepicker-input.vue'

export default {
	install:function(Vue,options){
		//日期组件
		const DATEPICKER_MOBILE_BUS=new Vue({
			data(){
				return{
					isShow:false
				}
			},
			methods:{
				show:function(){
					this.isShow=true;
				},
				hide:function(){
					this.isShow=false;
				}
			}
		})
		window.DATEPICKER_MOBILE_BUS = DATEPICKER_MOBILE_BUS
		Vue.component("datepicker-mobile",datepickerMobile);
//		Vue.component("datepicker-input",datepickerInput);
		Vue.directive("mdatapicker",{
			"bind":function(el,binding,vNode,oldVnode){
				var judy = new Vue({
					render(createElement){
						return createElement(datepickerInput,{
							attrs: {
							    value: vNode.context[binding.expression]
							},
							on:{
								"input":function(event){
									vNode.context[binding.expression]=event;
								},
								"change-value":function(event){
									vNode.context[binding.expression]=event;
								}
							},
						});
					}
		       	});
				var vm = judy.$mount();
				el.appendChild(vm.$el);
			}
		})		
	}
}
