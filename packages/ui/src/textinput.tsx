"use client"
export const TextInput=({label,placeholder,onChange}:
    {label:string,placeholder:string,onChange:(value:string)=>void})=>{
    return <div className="pt-2">
      
        <label className="text-sm font-medium text-gray-900 block mb-2 ">{label}</label>
      <input type="text" onChange={(e)=>(onChange(e.target.value))} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
       placeholder={placeholder} required />
    </div>
}