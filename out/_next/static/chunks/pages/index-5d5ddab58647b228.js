(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(t,e,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return i(2935)}])},2935:function(t,e,i){"use strict";i.r(e),i.d(e,{default:function(){return H}});var n=i(5944),r=i(7867),l=i(4440),o=i(4466),c=i(280),a=i(4246),s=i(4934),d=i(9360),Z=i(3821),u=i(9203),h=i(2022),p=i(9505),m=i(3367),g=i(4864),x=i(9346),f=i(9131),y=i(5008),v=i(8163),w=i(1954),b=t=>{let{open:e,onClose:i,title:r,children:l,action:o,titleAction:c="Eliminar",loading:s=!1}=t;return(0,n.BX)(g.Z,{open:e,onClose:i,fullWidth:!0,maxWidth:"sm",transitionDuration:500,PaperProps:{style:{transition:"opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",opacity:e?1:0,borderRadius:8,boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.1)"}},children:[(0,n.tZ)(x.Z,{sx:{backgroundColor:"error.main"},children:(0,n.tZ)(a.Z,{fontWeight:600,fontSize:20,color:"#fff",sx:{my:2},children:r})}),(0,n.tZ)(f.Z,{children:l}),(0,n.BX)(y.Z,{className:"dialog-actions-dense",children:[(0,n.tZ)(v.Z,{onClick:i,color:"error",children:"Cancelar"}),(0,n.tZ)(v.Z,{variant:"contained",color:"error",onClick:o,startIcon:s?(0,n.tZ)(w.JO,{icon:"eos-icons:loading"}):(0,n.tZ)(n.HY,{}),children:c})]})]})},P=i(8207),E=i(4483),k=i(6501),C=i(8009),X=i(7294),_=t=>{let{product:e}=t,{get:i}=(0,C.Ds)(),r=(0,d.Z)(),[l,o]=(0,X.useState)(!1),[c,s]=(0,X.useState)(!1),Z=async()=>{try{s(!0),await E.Z.remove("/products/".concat(null==e?void 0:e.id)),o(!1),k.ZP.success("Se elimin\xf3 el producto con \xe9xito."),i()}catch(t){k.ZP.error("Ups! Ocurri\xf3 un error.")}finally{s(!1)}};return(0,n.BX)(n.HY,{children:[(0,n.tZ)(P.Z,{title:"Eliminar producto",placement:"top",arrow:!0,children:(0,n.tZ)(m.Z,{onClick:t=>{t.stopPropagation(),o(!0)},children:(0,n.tZ)(w.JO,{icon:"tabler:trash",style:{color:r.palette.error.main}})})}),(0,n.tZ)(b,{open:l,onClose:()=>o(!1),title:"Eliminar el producto ".concat(null==e?void 0:e.title),titleAction:"Eliminar",action:Z,loading:c,children:(0,n.BX)(a.Z,{fontSize:14,fontWeight:100,sx:{mt:3},children:["\xbfEst\xe1 seguro que desea eliminar el producto ",(0,n.tZ)("strong",{children:null==e?void 0:e.title}),"?"]})})]})},B=i(4636),S=i(7311);let O=t=>null==t?void 0:t.split(/\s/).reduce((t,e)=>t+=e.slice(0,1),"");var z=i(2034);let N=t=>{let{value:e,icon:i,field:r,color:o}=t;return(0,n.BX)(l.Z,{sx:{display:"flex",mr:5},children:[(0,n.tZ)(w.JO,{icon:i,style:{marginTop:"1px",marginRight:10},fontSize:20,color:o}),r,": ",(0,n.tZ)(a.Z,{sx:{ml:1},color:"grey",children:e})]})};var A=t=>{let{product:e}=t,i=(0,d.Z)();return(0,n.tZ)(Z.Z,{sx:{mb:3},children:(0,n.BX)(u.Z,{children:[(0,n.BX)(o.ZP,{container:!0,spacing:2,children:[(0,n.tZ)(o.ZP,{item:!0,lg:3,sm:2,xs:2.5,children:(0,n.tZ)(h.Z,{alt:"Producto",src:null==e?void 0:e.title,sx:{width:{lg:80,xs:60},height:{lg:80,xs:60},mb:2,fontSize:{lg:"2.5rem",xs:"2rem"}},children:O((0,z.E)(e.title))})}),(0,n.BX)(o.ZP,{item:!0,lg:9,sm:3,xs:6,children:[(0,n.tZ)(a.Z,{fontSize:16,variant:"h6",children:e.title}),(0,n.tZ)(N,{field:"Precio",value:e.price,icon:"mdi:dollar",color:i.palette.success.main}),(0,n.tZ)(N,{field:"Stock",value:e.stock,icon:"ant-design:stock-outlined",color:i.palette.warning.main}),(0,n.tZ)(N,{field:"Gramos",value:e.grams,icon:"icon-park-outline:weight",color:i.palette.error.main})]})]}),(0,n.tZ)(p.Z,{sx:{my:1}}),e.description?(0,n.BX)(l.Z,{sx:{overflow:"auto",maxHeight:100},children:[" ",(0,S.ZP)(e.description)]}):(0,n.tZ)(l.Z,{sx:{height:100},children:(0,n.tZ)(c.Z,{severity:"warning",sx:{py:3,mb:2,"& .MuiAlert-message":{p:0}},children:(0,n.tZ)(a.Z,{variant:"body2",sx:{color:"warning.main"},children:"Agrega una descripci\xf2n a tu producto."})})}),(0,n.BX)(l.Z,{sx:{display:"flex",justifyContent:"flex-end",alignItems:"flex-start",mt:2},children:[(0,n.tZ)(B.Z,{product:e}),(0,n.tZ)(_,{product:e})]})]})})},I=i(5867),W=()=>{let{get:t,loading:e,products:i}=(0,C.Ds)();return(0,X.useEffect)(()=>{t()},[t]),(0,n.tZ)(I.E.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:1,ease:"easeInOut"},children:e?(0,n.tZ)(l.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center",p:10},children:(0,n.tZ)(s.Z,{})}):(0,n.tZ)(n.HY,{children:i.length?(0,n.tZ)(o.ZP,{container:!0,spacing:3,children:i.map((t,e)=>(0,n.tZ)(o.ZP,{item:!0,lg:4,sm:6,xs:12,children:(0,n.tZ)(A,{product:t})},e))}):(0,n.tZ)(l.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center",p:10},children:(0,n.tZ)(c.Z,{severity:"warning",sx:{py:3,mb:2,"& .MuiAlert-message":{p:0}},children:(0,n.tZ)(a.Z,{variant:"body2",sx:{color:"warning.main"},children:"\xa1Ops! Aun no tiene productos, puede crear uno desde el menu."})})})})})},H=function(){return(0,n.tZ)(r.Z,{maxWidth:"lg",children:(0,n.tZ)(W,{})})}}},function(t){t.O(0,[618,311,888,774,179],function(){return t(t.s=8312)}),_N_E=t.O()}]);