import React from 'react'

function Institute() {
  return (
    <>
      <div className='institute d-flex flex-column flex-nowrap'>
        <div>
          <h6>Choose Institute</h6>
        </div>
        <div>
          <select name="institute" id="institute">
            <option value="1">Proctor exam</option>
            <option value="2">Proctor exam</option>
            <option value="3">Proctor exam</option>
          </select>
          <button className='btn btn1'>Change</button>
        </div>
        <div>
          <h6>Proctor exam</h6>
        </div>
      </div>
    </>
  )
}

export default Institute