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
				vNode.context.$nextTick(() => {
					var vm = new Vue({
						render(createElement){
							console.log(vNode);
							console.log(createElement('input',{
								domProps:{
									value:vNode.context[binding.expression]
								}
							}))
							console.log(createElement('div',vNode.children));
							return createElement(DatepickerInput,{
								attrs: {
									value: vNode.context[binding.expression]
								},
								on:{
									"change-value": function(event){
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
					vm.$mount(el)
					// el.appendChild(vm.$mount().$el);
				})
			}
		})		
	},
}
