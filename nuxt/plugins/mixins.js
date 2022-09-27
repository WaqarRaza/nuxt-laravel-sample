import Vue from 'vue'
import {validationMixin} from 'vuelidate'
import {global} from '../mixins.js/global'

Vue.mixin(validationMixin)
Vue.mixin(global)