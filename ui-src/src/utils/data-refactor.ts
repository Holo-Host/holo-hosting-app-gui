export const table_data = (payload:any) => {
  console.log("Refactoring data",payload)
  let table_data:any[]=[]
  if(payload.hasOwnProperty("addresses")){
    payload.addresses.forEach((hash:string)=>{
      table_data.push({
        hApps_hash:hash,
        status:"Disable"
      })
    })
  }
  return table_data
}
