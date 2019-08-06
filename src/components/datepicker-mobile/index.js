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
				var node = vNode.children;
				var vm = new Vue({
					render(createElement){
						console.log(vNode);
						return createElement(DatepickerInput,{
							attrs: {
								value: vNode.context[binding.expression]
							},
							on:{
								"change-value": function(event){
									vNode.context[binding.expression]=event;
									console.log(event);
								}
							},
							scopedSlots: {
								default: props => node
							},
						});
					},
				});
				el.innerHTML = "";
				el.appendChild(vm.$mount().$el);
			}
		})		
	},
}
