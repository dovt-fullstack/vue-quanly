var E=Object.defineProperty;var B=(r,e,n)=>e in r?E(r,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[e]=n;var t=(r,e,n)=>(B(r,typeof e!="symbol"?e+"":e,n),n);import{W as I}from"./index-64ce397b.js";const a={GETALLBYLIMIT:"User/GetAllByLimit",DELETEBBYID:"User/DeleteById",BANNEDBYID:"User/BannedById",GETITEMBYID:"User/GetItemById",EDITITEMBYID:"User/EditItemById",CREATEITEM:"User/CreateItem"};class s{constructor(){t(this,"GetAllByLimit",e=>I.get(`${a.GETALLBYLIMIT}`,{params:{PageNumber:e.pageNumber||1,PageSize:e.pageSize||10,UserName:e.userName??""}}));t(this,"DeleteById",e=>I.delete(`${a.DELETEBBYID}/${e}`));t(this,"BannedById",e=>I.put(`${a.BANNEDBYID}/${e}`));t(this,"GetItemById",e=>I.get(`${a.GETITEMBYID}/${e}`));t(this,"EditItemById",e=>I.post(`${a.EDITITEMBYID}`,e,{headers:{Accept:"application/json","Content-Type":"multipart/form-data;","cache-control":"no-cache"}}));t(this,"CreateItem",e=>I.post(`${a.CREATEITEM}`,e,{headers:{Accept:"application/json","Content-Type":"multipart/form-data;","cache-control":"no-cache"}}))}}const c=new s;export{c as A};
