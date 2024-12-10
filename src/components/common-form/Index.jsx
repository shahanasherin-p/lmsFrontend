import React from 'react'
import FormControls from './FormControls'
import { Button } from '../ui/button'

const CommonForm = ({handleSubmit,buttonText,formControls = [], formData, setFormData,isButtonDisabled = false,}) => {
  return (
    <form onSubmit={handleSubmit}>

        <FormControls formControls={formControls} formData={formData} setFormData={setFormData}/>
        <Button disabled={isButtonDisabled} className="mt-5 w-full" type="submit">{buttonText || "Submit"}</Button>
    </form>
  )
}

export default CommonForm
