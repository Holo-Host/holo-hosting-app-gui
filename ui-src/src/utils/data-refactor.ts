export const table_data = (payload:any) => {
  console.log("Refactoring data",payload)
  let table_data:any[]=[]
  payload.forEach((bundle:any)=>{
      table_data.push({
        app_bundle:bundle.app_bundle,
        app_details:bundle.app_details,
        payment_pref:bundle.payment_pref,
        status:"Disabled"
      })
  })
  return table_data
}

export const refactorAllApps = ( payload:any ) => {
  let all_apps:any[]=[]
  payload.forEach((app:any)=>{
    all_apps.push(JSON.parse(app).Ok);
  })
  return all_apps;
}
