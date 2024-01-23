import React from 'react'
import InputField from '../components/InputField'

const Salary2 = ({handleChange}) => {
  return (
    <div>
      <h3 className='text-lg font-medium mb-2'>Salary Range</h3>

        <label className='sidebar-label-container'>
            <input type="radio" name='test' id='test' value="" onChange={handleChange} />
            <span className='checkmark'></span>All
        </label>

        {<InputField handleChange={handleChange} value="30k-50k" title="30k-50k" name="test" />}
        {<InputField handleChange={handleChange} value="50k-70k" title="50k-70k" name="test" />}
        {<InputField handleChange={handleChange} value="70k-90k" title="70k-90k" name="test" />}
        {<InputField handleChange={handleChange} value="90k-150k" title="above 90k" name="test" />}

      
    </div>
  )
}

export default Salary2
