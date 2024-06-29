import{d as H,B as N,D,L as B,A as V,r as w,u as E,a as P,c as C,o as R,b as c,e as l,f as d,g as t,t as b,h as n,w as u,i as J,n as z,j,p as S,k as Z,l as m,F as O,m as k}from"./index-64ce397b.js";import{_ as A}from"./_plugin-vue_export-helper-c27b6911.js";import{B as G}from"./index-6420f202.js";const K=H({components:{"a-button":N,"a-badge":G,"a-drawer":D,"a-list":B,"a-list-item":B.Item,"a-list-item-meta":B.Item.Meta,"a-avatar":V},setup(){const e=w([]),o=w(!1),_="http://localhost:9000",L=JSON.parse(localStorage.getItem("auth")),s=JSON.parse(localStorage.getItem("token")),a=()=>{o.value=!0,v()},g=()=>{o.value=!1,e.value.forEach(i=>{i.notiStatus=!0}),axios.get(`${_}/api/v1/notifications/seen`,{headers:{Authorization:`Bearer ${s}`}}).then(i=>{console.log(i.data.data,"noti")}).catch(i=>{console.error(i)})},y=E();P();const r=()=>{localStorage.removeItem("auth"),localStorage.removeItem("access_token"),localStorage.removeItem("token"),window.location.href="http://localhost:5173/login"},v=()=>{axios.get(`${_}/api/v1/notifications/view`,{headers:{Authorization:`Bearer ${s}`}}).then(i=>{e.value=i.data.data,console.log(i.data.data,"noti")}).catch(i=>{console.error(i)})},x=i=>{console.log(`Deleting notification with id ${i}`),axios.get(`${_}/api/v1/notifications/delete/${i}`,{headers:{Authorization:`Bearer ${s}`}}).then(M=>{e.value=M.data.data,console.log(M.data.data,"noti"),v()}).catch(M=>{console.error(M)}),o.value=!1},T=C(()=>e.value.slice().sort((i,M)=>M.notiId-i.notiId));R(()=>{v()});const f=C(()=>e.value.filter(i=>!i.notiStatus).length);return{authStore:y,userLocal:L,handleClickLogout:r,showDrawer:a,onClose:g,open:o,sortedNotiList:T,unreadCount:f,deleteNoti:x}}}),I=e=>(S("data-v-9f6c53fb"),e=e(),Z(),e),q={class:"MuiBox-root jss261",id:"header"},F=I(()=>t("h3",{style:{color:"white"},class:"MuiTypography-root MuiTypography-h3"},null,-1)),Q={class:"MuiBox-root jss262"},W={class:"MuiBox-root jss263"},X={class:"sb-avatar sb-avatar--text",style:{display:"inline-block","vertical-align":"middle",width:"30px",height:"30px","border-radius":"20px","font-family":"Helvetica, Arial, sans-serif"}},U={class:"sb-avatar__text",title:"",style:{width:"30px",height:"30px","line-height":"initial","text-align":"center",color:"rgb(255, 255, 255)",background:"rgb(215, 61, 50)","border-radius":"20px"}},Y={style:{display:"table","table-layout":"fixed",width:"100%",height:"100%","font-size":"10px"}},tt={style:{display:"table-cell","vertical-align":"middle","white-space":"nowrap"}},et={class:"MuiTypography-root"},ot={class:"me-1"},st=I(()=>t("i",{class:"fa-solid"},null,-1)),it=I(()=>t("span",null,"Trang cá nhân",-1)),at=I(()=>t("svg",{class:"MuiSvgIcon-root arrow-avatar",focusable:"false","aria-hidden":"true"},[t("path",{d:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"})],-1)),rt={class:""},nt={viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24","font-size":"24",style:{color:"rgb(0, 136, 255)"}},ut=I(()=>t("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M18 10.5c0-3.07-1.14-5.64-4-6.32V2h-4v2.18c-2.87.68-4 3.24-4 6.32V16l-2 1v2h16v-2l-2-1v-5.5Zm-5.6 11.46A2.014 2.014 0 0 1 9.99 20h4c0 .28-.05.54-.15.78-.26.6-.79 1.04-1.44 1.18Z",fill:"currentColor"},null,-1)),lt=[ut];function dt(e,o,_,L,s,a){const g=c("router-link"),y=c("a-menu-item"),r=c("a-menu"),v=c("a-dropdown"),x=c("a-badge"),T=c("a-button"),f=c("a-list-item-meta"),i=c("a-list-item"),M=c("a-list"),$=c("a-drawer");return l(),d("div",q,[F,t("div",Q,[t("div",W,[t("div",X,[t("div",U,[t("div",Y,[t("span",tt,[t("span",null,b(e.userLocal&&e.userLocal.lastname?e.userLocal.lastname.charAt(0):""),1)])])])]),t("p",et,[n(v,null,{overlay:u(()=>[n(r,null,{default:u(()=>[n(y,null,{default:u(()=>[n(g,{to:{name:"profile-user"}},{default:u(()=>[it]),_:1})]),_:1}),n(y,null,{default:u(()=>[t("a",{onClick:o[1]||(o[1]=(...h)=>e.handleClickLogout&&e.handleClickLogout(...h)),style:{color:"red"}},"Đăng xuất")]),_:1})]),_:1})]),default:u(()=>{var h;return[t("a",{class:"ant-dropdown-link",onClick:o[0]||(o[0]=J(()=>{},["prevent"]))},[t("span",ot,"Xin chào "+b((h=e.userLocal)==null?void 0:h.lastname),1),st])]}),_:1})]),at]),t("div",rt,[t("div",null,[t("div",null,[n(T,{style:{"background-color":"#182537","border-color":"#182537"},type:"primary",onClick:e.showDrawer},{default:u(()=>[(l(),d("svg",nt,lt)),n(x,{count:e.unreadCount,offset:"[10, 0]"},null,8,["count"])]),_:1},8,["onClick"])]),n($,{title:"Thông báo của bạn",placement:"right",closable:!1,visible:e.open,"get-container":!1,style:{position:"absolute"},onClose:e.onClose},{default:u(()=>[n(M,{"item-layout":"horizontal","data-source":e.sortedNotiList},{renderItem:u(({item:h})=>[n(i,{style:z({marginTop:"10px",backgroundColor:h.notiStatus?"#ffffff":"#d3d3d3"})},{default:u(()=>[n(f,null,{title:u(()=>[t("h6",null,b(h.description),1)]),description:u(()=>[j(b(h.description),1)]),_:2},1024),n(T,{type:"link",onClick:de=>e.deleteNoti(h.notiId),style:{color:"red"}},{default:u(()=>[j("Delete")]),_:2},1032,["onClick"])]),_:2},1032,["style"])]),_:1},8,["data-source"])]),_:1},8,["visible","onClose"])])])])])}const ct=A(K,[["render",dt],["__scopeId","data-v-9f6c53fb"]]),pt="/assets/payment-484e36ff.png",mt="/assets/salary-d1ec7ce7.png",ht="/assets/products-f0a0193d.png",Mt="/assets/order-now-8f6da902.png";const yt={components:{Header:ct},methods:{navigateTo(e){this.$router.push({name:e})},navigateToExport(e){console.log(e,"store"),this.$router.push({name:"importExport",params:{id:e}})},navigateToCustomer(e){console.log(e,"store"),this.$router.push({name:"admin-store-all-customer",params:{id:e}})},navigateToRevenue(e){console.log(e,"store"),this.$router.push({name:"doanh-thu-store",params:{id:e}})},navigateToProduct(e){console.log(e,"store"),this.$router.push({name:"ProductByStore",params:{id:e}})},navigateToOrder(e){console.log(e,"store"),this.$router.push({name:"danh-sach-order-store",params:{id:e}})}},data(){return{role:null,storeId:JSON.parse(localStorage.getItem("auth"))}},mounted(){try{const e=JSON.parse(localStorage.getItem("auth"));this.role=e.role,console.log(e.role),console.log("Retrieved role:",this.role)}catch(e){console.error("Error retrieving role from localStorage:",e)}}},p=e=>(S("data-v-c040476b"),e=e(),Z(),e),_t={class:""},gt={class:"row"},vt={class:"col-sm-2 d-none d-sm-flex"},It={style:{height:"100vh"},class:"MuiBox-root jss156 jss93 menuExpand",id:"menuRoot"},Tt={style:{height:"100vh"}},bt={class:"MuiBox-root jss157 menuTopHeader"},Lt={class:"MuiBox-root jss158 menuTopLogo"},xt=p(()=>t("hr",{class:"menuDivider"},null,-1)),ft={class:"MuiBox-root jss180 menuInnerWrapper"},Bt={class:"MuiBox-root jss181 menuPrimaryInner",id:"menuPrimaryInner",style:{"overflow-y":"auto"}},kt={class:"MuiList-root menuList MuiList-padding"},wt={key:0,class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false"},Ct=k('<div class="MuiListItemIcon-root" data-v-c040476b><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-c040476b><path d="M9.38 11.715a1.258 1.258 0 0 0-.424-.454 4.807 4.807 0 0 0-.549-.291 6.72 6.72 0 0 0-.548-.223 1.37 1.37 0 0 1-.424-.228.417.417 0 0 1 .04-.7c.14-.09.338-.134.594-.134.233 0 .444.042.634.124.19.083.306.125.349.125a.307.307 0 0 0 .27-.156.56.56 0 0 0 .1-.301c0-.103-.048-.193-.146-.269A.959.959 0 0 0 8.9 9.04a3.918 3.918 0 0 0-.535-.087V8.26c0-.235-.207-.426-.463-.426s-.463.19-.463.426v.753c-.19.047-.37.119-.537.216-.17.1-.307.24-.409.418a1.23 1.23 0 0 0-.153.62c0 .21.041.396.124.56.083.163.193.294.328.392.135.098.285.187.449.265.163.079.326.15.487.213.162.063.31.128.445.196a.977.977 0 0 1 .328.255.54.54 0 0 1 .125.35.47.47 0 0 1-.228.425 1.048 1.048 0 0 1-.57.143 1.231 1.231 0 0 1-.773-.261 2.402 2.402 0 0 0-.227-.18.383.383 0 0 0-.21-.082c-.105 0-.199.052-.282.154a.485.485 0 0 0-.124.304c0 .2.16.386.484.556.218.115.466.19.743.228v.655c0 .235.207.425.463.425s.463-.19.463-.425v-.675c.28-.056.52-.162.72-.318.31-.242.466-.587.466-1.034 0-.266-.057-.498-.17-.697Z" fill="currentColor" stroke="currentColor" stroke-width="0.5" data-v-c040476b></path><path d="M18.134 3.19h-3.126A1.538 1.538 0 0 0 13.51 2h-2.99c-.728 0-1.34.509-1.496 1.19H5.977C4.887 3.19 4 4.073 4 5.161v14.865C4 21.115 4.887 22 5.977 22h12.157c1.09 0 1.976-.885 1.976-1.973V5.162a1.977 1.977 0 0 0-1.976-1.973Zm-7.976.343c0-.2.163-.362.363-.362h2.99c.2 0 .363.162.363.362v.717c0 .2-.163.363-.363.363h-2.99a.363.363 0 0 1-.363-.363v-.717Zm7.976 17.296H5.977a.804.804 0 0 1-.804-.802V5.162c0-.442.36-.802.804-.802H8.99a1.537 1.537 0 0 0 1.531 1.423h2.99c.81 0 1.475-.629 1.532-1.423h3.09c.444 0 .805.36.805.802v14.865c0 .442-.361.802-.804.802Z" fill="currentColor" stroke="currentColor" stroke-width="0.5" data-v-c040476b></path><path d="M17.14 8.436h-5.715a.586.586 0 1 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM17.14 12.513h-5.715a.587.587 0 0 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM17.14 16.571h-5.715a.587.587 0 0 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM9.157 16.498H6.769a.586.586 0 0 0 0 1.173h2.388a.586.586 0 1 0 0-1.172Z" fill="currentColor" stroke="currentColor" stroke-width="0.5" data-v-c040476b></path></svg></div>',1),jt={class:"MuiListItemText-root menuItemTitle"},St={key:1,class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false"},Zt=k('<div class="MuiListItemIcon-root" data-v-c040476b><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-c040476b><path d="M9.38 11.715a1.258 1.258 0 0 0-.424-.454 4.807 4.807 0 0 0-.549-.291 6.72 6.72 0 0 0-.548-.223 1.37 1.37 0 0 1-.424-.228.417.417 0 0 1 .04-.7c.14-.09.338-.134.594-.134.233 0 .444.042.634.124.19.083.306.125.349.125a.307.307 0 0 0 .27-.156.56.56 0 0 0 .1-.301c0-.103-.048-.193-.146-.269A.959.959 0 0 0 8.9 9.04a3.918 3.918 0 0 0-.535-.087V8.26c0-.235-.207-.426-.463-.426s-.463.19-.463.426v.753c-.19.047-.37.119-.537.216-.17.1-.307.24-.409.418a1.23 1.23 0 0 0-.153.62c0 .21.041.396.124.56.083.163.193.294.328.392.135.098.285.187.449.265.163.079.326.15.487.213.162.063.31.128.445.196a.977.977 0 0 1 .328.255.54.54 0 0 1 .125.35.47.47 0 0 1-.228.425 1.048 1.048 0 0 1-.57.143 1.231 1.231 0 0 1-.773-.261 2.402 2.402 0 0 0-.227-.18.383.383 0 0 0-.21-.082c-.105 0-.199.052-.282.154a.485.485 0 0 0-.124.304c0 .2.16.386.484.556.218.115.466.19.743.228v.655c0 .235.207.425.463.425s.463-.19.463-.425v-.675c.28-.056.52-.162.72-.318.31-.242.466-.587.466-1.034 0-.266-.057-.498-.17-.697Z" fill="currentColor" stroke="currentColor" stroke-width="0.5" data-v-c040476b></path><path d="M18.134 3.19h-3.126A1.538 1.538 0 0 0 13.51 2h-2.99c-.728 0-1.34.509-1.496 1.19H5.977C4.887 3.19 4 4.073 4 5.161v14.865C4 21.115 4.887 22 5.977 22h12.157c1.09 0 1.976-.885 1.976-1.973V5.162a1.977 1.977 0 0 0-1.976-1.973Zm-7.976.343c0-.2.163-.362.363-.362h2.99c.2 0 .363.162.363.362v.717c0 .2-.163.363-.363.363h-2.99a.363.363 0 0 1-.363-.363v-.717Zm7.976 17.296H5.977a.804.804 0 0 1-.804-.802V5.162c0-.442.36-.802.804-.802H8.99a1.537 1.537 0 0 0 1.531 1.423h2.99c.81 0 1.475-.629 1.532-1.423h3.09c.444 0 .805.36.805.802v14.865c0 .442-.361.802-.804.802Z" fill="currentColor" stroke="currentColor" stroke-width="0.5" data-v-c040476b></path><path d="M17.14 8.436h-5.715a.586.586 0 1 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM17.14 12.513h-5.715a.587.587 0 0 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM17.14 16.571h-5.715a.587.587 0 0 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM9.157 16.498H6.769a.586.586 0 0 0 0 1.173h2.388a.586.586 0 1 0 0-1.172Z" fill="currentColor" stroke="currentColor" stroke-width="0.5" data-v-c040476b></path></svg></div>',1),At={class:"MuiListItemText-root menuItemTitle"},$t={key:2,class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false"},Ht=k('<div class="MuiListItemIcon-root" data-v-c040476b><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-c040476b><path d="M9.38 11.715a1.258 1.258 0 0 0-.424-.454 4.807 4.807 0 0 0-.549-.291 6.72 6.72 0 0 0-.548-.223 1.37 1.37 0 0 1-.424-.228.417.417 0 0 1 .04-.7c.14-.09.338-.134.594-.134.233 0 .444.042.634.124.19.083.306.125.349.125a.307.307 0 0 0 .27-.156.56.56 0 0 0 .1-.301c0-.103-.048-.193-.146-.269A.959.959 0 0 0 8.9 9.04a3.918 3.918 0 0 0-.535-.087V8.26c0-.235-.207-.426-.463-.426s-.463.19-.463.426v.753c-.19.047-.37.119-.537.216-.17.1-.307.24-.409.418a1.23 1.23 0 0 0-.153.62c0 .21.041.396.124.56.083.163.193.294.328.392.135.098.285.187.449.265.163.079.326.15.487.213.162.063.31.128.445.196a.977.977 0 0 1 .328.255.54.54 0 0 1 .125.35.47.47 0 0 1-.228.425 1.048 1.048 0 0 1-.57.143 1.231 1.231 0 0 1-.773-.261 2.402 2.402 0 0 0-.227-.18.383.383 0 0 0-.21-.082c-.105 0-.199.052-.282.154a.485.485 0 0 0-.124.304c0 .2.16.386.484.556.218.115.466.19.743.228v.655c0 .235.207.425.463.425s.463-.19.463-.425v-.675c.28-.056.52-.162.72-.318.31-.242.466-.587.466-1.034 0-.266-.057-.498-.17-.697Z" fill="currentColor" stroke="currentColor" stroke-width="0.5" data-v-c040476b></path><path d="M18.134 3.19h-3.126A1.538 1.538 0 0 0 13.51 2h-2.99c-.728 0-1.34.509-1.496 1.19H5.977C4.887 3.19 4 4.073 4 5.161v14.865C4 21.115 4.887 22 5.977 22h12.157c1.09 0 1.976-.885 1.976-1.973V5.162a1.977 1.977 0 0 0-1.976-1.973Zm-7.976.343c0-.2.163-.362.363-.362h2.99c.2 0 .363.162.363.362v.717c0 .2-.163.363-.363.363h-2.99a.363.363 0 0 1-.363-.363v-.717Zm7.976 17.296H5.977a.804.804 0 0 1-.804-.802V5.162c0-.442.36-.802.804-.802H8.99a1.537 1.537 0 0 0 1.531 1.423h2.99c.81 0 1.475-.629 1.532-1.423h3.09c.444 0 .805.36.805.802v14.865c0 .442-.361.802-.804.802Z" fill="currentColor" stroke="currentColor" stroke-width="0.5" data-v-c040476b></path><path d="M17.14 8.436h-5.715a.586.586 0 1 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM17.14 12.513h-5.715a.587.587 0 0 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM17.14 16.571h-5.715a.587.587 0 0 0 0 1.173h5.715a.586.586 0 0 0 0-1.173ZM9.157 16.498H6.769a.586.586 0 0 0 0 1.173h2.388a.586.586 0 1 0 0-1.172Z" fill="currentColor" stroke="currentColor" stroke-width="0.5" data-v-c040476b></path></svg></div>',1),Nt={class:"MuiListItemText-root menuItemTitle"},Dt=p(()=>t("div",{class:"MuiCollapse-container MuiCollapse-hidden",style:{"min-height":"0px"}},[t("div",{class:"MuiCollapse-wrapper"},[t("div",{class:"MuiCollapse-wrapperInner jss187"},[t("div",{class:"MuiBox-root jss243 menuListSubMenuItem menuListSubMenuItemLevel-0"},[t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Tạo đơn và giao hàng ")])]),t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Danh sách đơn hàng ")])]),t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/order_returns"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Khách trả hàng ")])])])])])],-1)),Vt=p(()=>t("div",{class:"MuiCollapse-container MuiCollapse-hidden",style:{"min-height":"0px"}},[t("div",{class:"MuiCollapse-wrapper"},[t("div",{class:"MuiCollapse-wrapperInner jss187"},[t("div",{class:"MuiBox-root jss244 menuListSubMenuItem menuListSubMenuItemLevel-0"},[t("a",{class:"MuiTypography-root MuiLink-root MuiLink-underlineHover MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button MuiTypography-colorPrimary",tabindex:"0",role:"button","aria-disabled":"false",to:"/trang-chu-stores"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Tổng quan ")])]),t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/shipments"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Quản lý vận đơn ")])]),t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/delivery_collations"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Đối soát COD và phí ")])]),t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/shippers"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Kết nối đối tác ")])]),t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/settings/shippings"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Cấu hình giao hàng ")])])])])])],-1)),Et=p(()=>t("div",{class:"MuiCollapse-container MuiCollapse-hidden",style:{"min-height":"0px"}},[t("div",{class:"MuiCollapse-wrapper"},[t("div",{class:"MuiCollapse-wrapperInner jss187"},[t("div",{class:"MuiBox-root jss251 menuListSubMenuItem menuListSubMenuItemLevel-0"},[t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/products"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Danh sách sản phẩm ")])]),t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/variants"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Quản lý kho ")])]),t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/order_suppliers"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Đặt hàng nhập ")])]),t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/purchase_orders"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Nhập hàng ")])]),t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/stock_adjustments"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Kiểm hàng ")])]),t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/stock_transfers"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Chuyển hàng ")])]),t("a",{class:"MuiTypography-root MuiLink-root MuiLink-underlineHover MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button MuiTypography-colorPrimary",tabindex:"0",role:"button","aria-disabled":"false",to:"/admin/suppliers",href:"/admin/suppliers"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Nhà cung cấp ")])]),t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/price_adjustments"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Điều chỉnh giá vốn ")])])])])])],-1)),Pt={key:3,class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false"},Rt=p(()=>t("div",{class:"MuiListItemIcon-root"},[t("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3Zm9 11v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1h2Z",fill:"currentColor"})])],-1)),Jt={class:"MuiListItemText-root menuItemTitle"},zt={key:4,class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false"},Ot=p(()=>t("div",{class:"MuiListItemIcon-root"},[t("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3Zm9 11v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1h2Z",fill:"currentColor"})])],-1)),Gt={class:"MuiListItemText-root menuItemTitle"},Kt={key:5,class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false"},qt=p(()=>t("div",{class:"MuiListItemIcon-root"},[t("img",{style:{width:"30px"},src:pt,alt:"",srcset:""})],-1)),Ft={class:"MuiListItemText-root menuItemTitle"},Qt={key:6,class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false"},Wt=p(()=>t("div",{class:"MuiListItemIcon-root"},[t("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[t("path",{d:"M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3Zm9 11v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1h2Z",fill:"currentColor"})])],-1)),Xt={class:"MuiListItemText-root menuItemTitle"},Ut={key:7,class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false"},Yt=p(()=>t("div",{class:"MuiListItemIcon-root"},[t("img",{style:{width:"30px"},src:mt,alt:"",srcset:""})],-1)),te={class:"MuiListItemText-root menuItemTitle"},ee={key:8,class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false"},oe=p(()=>t("div",{class:"MuiListItemIcon-root"},[t("img",{style:{width:"30px"},src:ht,alt:"",srcset:""})],-1)),se={class:"MuiListItemText-root menuItemTitle"},ie={key:9,class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false"},ae=p(()=>t("div",{class:"MuiListItemIcon-root"},[t("img",{style:{width:"30px"},src:Mt,alt:"",srcset:""})],-1)),re={class:"MuiListItemText-root menuItemTitle"},ne=p(()=>t("div",{class:"MuiCollapse-container MuiCollapse-hidden",style:{"min-height":"0px"}},[t("div",{class:"MuiCollapse-wrapper"},[t("div",{class:"MuiCollapse-wrapperInner jss187"},[t("div",{class:"MuiBox-root jss252 menuListSubMenuItem menuListSubMenuItemLevel-0"},[t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/customers"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Danh sách khách hàng ")])]),t("a",{class:"MuiButtonBase-root MuiListItem-root jss186 rootMenuItem MuiListItem-gutters MuiListItem-button",tabindex:"0",role:"button","aria-disabled":"false",href:"/admin/customer_groups"},[t("div",{class:"MuiListItemText-root menuItemTitle"},[t("span",{class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Nhóm khách hàng ")])])])])])],-1)),ue={class:"col-12 col-sm-10"};function le(e,o,_,L,s,a){const g=c("Header"),y=c("router-view");return l(),d(O,null,[n(g),t("div",_t,[t("div",gt,[t("div",vt,[t("div",It,[t("nav",Tt,[t("div",bt,[t("div",Lt,[t("span",{onClick:o[0]||(o[0]=r=>a.navigateTo("admin-dashboards")),style:{color:"white","padding-left":"20px",cursor:"pointer"},class:"MuiTypography-root MuiTypography-h3"},"Tổng quan")])]),xt,t("div",ft,[t("div",Bt,[t("nav",kt,[s.role=="SHIPPER"?(l(),d("div",wt,[Ct,t("div",jt,[t("span",{onClick:o[1]||(o[1]=r=>a.navigateTo("danh-sach-don")),class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Danh sách đơn")])])):m("",!0),s.role=="SHIPPER"?(l(),d("div",St,[Zt,t("div",At,[t("span",{onClick:o[2]||(o[2]=r=>a.navigateTo("danh-sach-don-da-nhan")),class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Đơn đã nhận")])])):m("",!0),s.role=="SHIPPER"?(l(),d("div",$t,[Ht,t("div",Nt,[t("span",{onClick:o[3]||(o[3]=r=>a.navigateTo("danh-sach-don-da-giao")),class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Đơn đã giao")])])):m("",!0),Dt,Vt,Et,s.role=="ADMIN"?(l(),d("div",Pt,[Rt,t("div",Jt,[t("span",{onClick:o[4]||(o[4]=r=>a.navigateTo("admin-store")),class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Danh sách cửa hàng")])])):m("",!0),s.role=="ADMIN"?(l(),d("div",zt,[Ot,t("div",Gt,[t("span",{onClick:o[5]||(o[5]=r=>a.navigateTo("admin-account")),class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Danh sách tài khoản")])])):m("",!0),s.role=="MANAGER"?(l(),d("div",Kt,[qt,t("div",Ft,[t("span",{onClick:o[6]||(o[6]=r=>a.navigateToExport(s.storeId.storeId)),class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Hóa đơn")])])):m("",!0),s.role=="MANAGER"?(l(),d("div",Qt,[Wt,t("div",Xt,[t("span",{onClick:o[7]||(o[7]=r=>a.navigateToCustomer(s.storeId.storeId)),class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Khách hàng")])])):m("",!0),s.role=="MANAGER"?(l(),d("div",Ut,[Yt,t("div",te,[t("span",{onClick:o[8]||(o[8]=r=>a.navigateToRevenue(s.storeId.storeId)),class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Doanh thu")])])):m("",!0),s.role=="MANAGER"?(l(),d("div",ee,[oe,t("div",se,[t("span",{onClick:o[9]||(o[9]=r=>a.navigateToProduct(s.storeId.storeId)),class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Sản phẩm")])])):m("",!0),s.role=="MANAGER"?(l(),d("div",ie,[ae,t("div",re,[t("span",{onClick:o[10]||(o[10]=r=>a.navigateToOrder(s.storeId.storeId)),class:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock"},"Đơn hàng")])])):m("",!0),ne])])])])])]),t("div",ue,[n(y)])])])],64)}const he=A(yt,[["render",le],["__scopeId","data-v-c040476b"]]);export{he as default};
