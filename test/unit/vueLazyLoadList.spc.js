import Vue from 'vue';
import { destroyVM, createVM } from './utils';

const getTestData = function () {
    return [{
      id:"1",
      children:[
        {id:"1-1"},
        {id:"1-2"},
        {id:"1-3"},
        {id:"1-4"},
        {id:"1-5"},
        {id:"1-6"},
        {id:"1-7"},
        {id:"1-8"},
      ]
    },{
      id:"2"
    },{
      id:"3"
    }]
};

describe('vl-load-list', () => {

    describe('vlLoadListRender', () => {
        const vm = createVM({
            template: `
                <lazy-load-list :data="testData" listHeight="400" itemHeight="50"></lazy-load-list>
            `,

            created () {
                this.testData = getTestData();
            }
        });

        it('how many items', done => {
          Vue.nextTick(()=>{
            expect(vm.$el.querySelectorAll('.vl-list-item').length).to.be.equal(8);
            done();
          })
        });


    });
});
