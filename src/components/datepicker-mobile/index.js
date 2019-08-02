import DatepickerMobile from './datepicker-mobile.vue'
import DatepickerInput from './datepicker-input.vue'

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
		Vue.component("datepicker-mobile",DatepickerMobile);
		Vue.directive("mdatapicker",{
			"bind":function(el,binding,vNode,oldVnode){
				var judy = new Vue({
					render(createElement){
						return createElement(DatepickerInput,{
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
							// domProps: {
							// 	innerHTML: 'baz'
							// },
							scopedSlots: {
								default: props => vNode.children
							},
						});
					}
				   });
				   console.log(vNode.children);
				var vm = judy.$mount();
				el.innerHTML = "";
				el.appendChild(vm.$el);
			}
		})		
	},
}
