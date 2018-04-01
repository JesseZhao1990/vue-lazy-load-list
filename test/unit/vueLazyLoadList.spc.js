import Vue from 'vue';

import { destroyVM, createVM } from './utils';

const getTestData = function () {
    return [{
      id:"1",
      children:[
        {id:"1-1"},
        {id:"1-2"},
        {id:"1-3"},
      ]
    },{
      id:"2"
    },{
      id:"3"
    }]
};

describe('vue-lazy-load-list', () => {
    describe('render correct', () => {
        const vm = createVM({
            template: `
                <vue-lazy-load-list :data="testData" height="400" item-height="50"></vue-lazy-load-list>
            `,

            created () {
                this.testData = getTestData();
            }
        });

        it('how many items', done => {
          expect(vm.$el.querySelectorAll('.lazy-list-item').length).to.be.equal(6);
          done();
        });
    });
});
