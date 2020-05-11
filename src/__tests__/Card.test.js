import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Import component to be tested
import Card from '../components/Card'

const house = {
    id: 0,
    address: "4 Pumpkin Hill Street Antioch, TN 37013",
    homeowner: "Nicole Bone",
    price: 105124,
    photoURL: "img_url"
}

configure({ adapter: new Adapter() })

describe('Card Component tests', () => {
    const wrapper = shallow(<Card data={house} />)

    it('should render card component', () => {
        expect(wrapper).toBeDefined()
    })

    it('should have a header', () => {
        const element = wrapper.find('.media__title')
        expect(element.length).toBe(1)

        const result = element.text()
        expect(result).toBe(house.address)
    })

    it('should have a formatted price', () => {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        const element = wrapper.find('.media__meta')
        expect(element.length).toBe(1)

        const result = element.text()
        expect(result).toBe(formatter.format(house.price))
    })

    it('should have a sold by homeowner meta data', () => {
        const element = wrapper.find('.media__info')
        expect(element.length).toBe(1)

        const result = element.text()
        expect(result).toBe(`Sold by: ${house.homeowner}`)
    })
})
