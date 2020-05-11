import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Import component to be tested
import Layout from '../components/Layout'

configure({ adapter: new Adapter() })

/**
 * Utility function that mocks the `IntersectionObserver` API. Necessary for components that rely
 * on it, otherwise the tests will crash. Recommended to execute inside `beforeEach`.
 * @param {object} intersectionObserverMock - Parameter that is sent to the `Object.defineProperty`
 *      overwrite method. `jest.fn()` mock functions can be passed here if the goal is to not only
 *      mock the intersection observer, but its methods.
 */
export function setupIntersectionObserverMock({
    observe = () => null,
    unobserve = () => null,
} = {}) {
    class IntersectionObserver {
        observe = observe;
        unobserve = unobserve;
    }
    Object.defineProperty(
        window,
        'IntersectionObserver',
        { writable: true, configurable: true, value: IntersectionObserver }
    );
    Object.defineProperty(
        global,
        'IntersectionObserver',
        { writable: true, configurable: true, value: IntersectionObserver }
    );
}




describe('Layout Component tests', () => {
    const wrapper = mount(<Layout />)

    beforeEach(() => setupIntersectionObserverMock())

    it('should render layout component', () => {
        expect(wrapper).toBeDefined()
    })

    it('should have a default max of 10 pages', () => {
        const element = wrapper.find('.input-label')
        expect(element.length).toBe(1)

        const result = element.text()
        expect(result).toBe('Change max numbers of houses per page (performance testing). Currently 10')
    })

    it('should set the change in number of pages', () => {
        const btn = wrapper.find('.btn-input')

        const element = wrapper.find('.input-field')
        expect(element.length).toBe(1)

        element.instance().value = 20;
        btn.simulate('click');

        const el = wrapper.find('.input-label')
        const result = el.text()
        expect(result).toBe('Change max numbers of houses per page (performance testing). Currently 20')

    });

    it('should accept numbers only for input', () => {
        const btn = wrapper.find('.btn-input')

        const element = wrapper.find('.input-field')
        expect(element.length).toBe(1)

        element.instance().value = 'abc';
        btn.simulate('click');

        const el = wrapper.find('.input-label')
        const result = el.text()
        expect(result).not.toBe('Change max numbers of houses per page (performance testing). Currently abc')
    })

})
