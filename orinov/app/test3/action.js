'use server'

export async function submitForm(formData){
  console.log("Formtosubmit: "+formData.get('email'))
}