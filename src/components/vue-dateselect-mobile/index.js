import DateselectMobile from './dateselect-mobile.vue'
import DateselectInput from './dateselect-input.vue'

export default {
	install:function(Vue,options){
		//日期组件
		const DATESELECT_MOBILE_BUS=new Vue({
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
		window.DATESELECT_MOBILE_BUS = DATESELECT_MOBILE_BUS
		Vue.component("DateselectMobile",DateselectMobile);
		Vue.component("DateselectInput",DateselectInput);
		var node = new Object();
		Vue.directive("mdateselect",{
			"bind":function(el,binding,vNode,oldVnode){
				node = vNode.children;
				var vm = new Vue({
					render(createElement){
						return createElement(DateselectInput,{
							attrs: {
								value: vNode.context[binding.expression],
								today:Boolean(binding.modifiers.today)
							},
							on:{
								"input": function(event){
									vNode.context[binding.expression] = event;
								}
							},
							scopedSlots: {
								default: props =>  node
							}
						});
					},
				});
				vm.$nextTick(()=>{
					el.innerHTML = "";
					vm.$mount(el);
				})
			},
			"update":function(el,binding,vNode,oldVnode){
				node = vNode.children;
			}
		})		
	},
}
