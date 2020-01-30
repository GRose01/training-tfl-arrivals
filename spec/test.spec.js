import Vue from 'vue';
import App from '../src/App.vue';

describe("App", () => {
    it("should fail", () => {
      expect(true).toBe(false);
    });
  });

describe('App', () => {
    // mount the component with a wrapper variable to render it
    const wrapper = new Vue(MyComponent).$mount(App)

    it('contains a dropdown', () => {
        expect(wrapper.contains('dropdown')).toBe(true)
    })
})