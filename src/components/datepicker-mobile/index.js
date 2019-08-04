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
		Vue.component("DatepickerMobile",DatepickerMobile);
		Vue.component("DatepickerInput",DatepickerInput);
		Vue.directive("mdatapicker",{
			"bind":function(el,binding,vNode,oldVnode){
				var judy = new Vue({
					render(createElement){
						return createElement(DatepickerInput,{
							attrs: {
							    value: vNode.context[binding.expression]
							},
							on:{
								"change-value":function(event){
									vNode.context[binding.expression]=event;
								}
							},
							scopedSlots: {
								default: props => vNode.children
							},
						});
					},
				});
				el.innerHTML = "";
				console.log(judy.$mount());
				judy.$mount(el);console.log(el);return;
				// el.appendChild(judy.$mount().$el);
			}
		})		
	}
}
