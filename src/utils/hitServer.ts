const urls={
    server:"https://test2unibackend-production.up.railway.app",
    localhost:"http://localhost:5000",
}



export const hitServerApi = async(uri:string) => {
    const data = await fetch(`${urls.localhost}${uri}`)

  
 const res = await data.json()



 return res
} 

export const hitPostServerApi = async(uri:string,payload:any) =>{
    const data = await fetch(`${urls.localhost}${uri}`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const res = await data.json()
      return res
    }

export const hitDeleteServerApi = async(uri:string) =>{
    const data = await fetch(`${urls.localhost}${uri}`,{
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        });
        const res = await data.json()
        return res
        }