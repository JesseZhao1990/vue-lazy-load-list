import Vue from 'vue';
import vueLazyLoadList from '../../packages/vueLazyLoadList';

Vue.use(vueLazyLoadList);

export const createVM = (opts) => {
    return new Vue(opts).$mount();
};

export const destroyVM = (vm) => {
    vm.$destroy && vm.$destroy();
    vm.$el &&
    vm.$el.parentNode &&
    vm.$el.parentNode.removeChild(vm.$el);
};
