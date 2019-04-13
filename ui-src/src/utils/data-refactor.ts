export const table_data = (payload:any) => {
  // console.log("Refactoring data",payload)
  let table_data:any[]=[]
  payload.forEach((bundle:any)=>{
      table_data.push({
        app_hash:bundle.hash,
        // app_name:bundle.details.app_details[0].entry.name,
        app_bundle:bundle.details.app_bundle,
        // app_details:bundle.details.app_details[0].entry.details,
        payment_pref:bundle.details.payment_pref,
        status:"Disabled"
      })
  })
  return table_data
}

export const refactorAllApps = ( payload:any ) => {
  let all_apps:any[]=[]
  payload.forEach((app:any)=>{
    all_apps.push({
      hash:app.hash,
      details: JSON.parse(app.details).Ok
    });
  })
  return all_apps;
}
