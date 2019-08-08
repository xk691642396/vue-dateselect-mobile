# vue-datese-mobile
vue移动端日期选择组件（年-月-日）
#安装
##npm install --save vue-picture-preview
#使用
##在项目入口文件引入，调用Vue.use安装
import DateSelect from 'vue-dateselect-mobile'/<br/>
Vue.use(DateSelect)

##在根组件添加

<!-- Vue root compoment template -->
<div id="app">
    <router-view />
    <dateselect-mobile />
</div>

##在组件中使用

###自定义指令方法

<div v-mdateselect.today="birthDay"><input placeholder="请选择生日" type="text" readonly="readonly" :value="birthDay"/></div>/<br/>

修饰符.today表示当birthDay没有默认值时，自动把birthDay变量置为今天

###组件方法
<dateselect-input v-model="birthDay" :today="false"><input type="text" readonly="readonly" :value="birthDay" class="birthDay" /></dateselect-input>/<br/>

若today传入true且当birthDay没有默认值时，自动把birthDay变量置为今天
