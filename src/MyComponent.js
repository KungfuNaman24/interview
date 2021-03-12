import React,{useEffect,useState} from 'react'
import "./Mycomponent.css"
import axios from './axios'
import Loader from './loader'
function MyComponent() {

    
    var headers={
        Authorization:"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTA5MTFlZGZiZmU5NzIwNzlmMGMzZmQwY2Q2NTdmZmM5YmY0NmI3NjNiMjQ0ZjI2ZmRlMDcyNzRjOWIyM2Q0MjU5NTk0ZjhjZTU1ZDA5NTIiLCJpYXQiOjE2MTU1NDE1MTAsIm5iZiI6MTYxNTU0MTUxMCwiZXhwIjoxNjQ3MDc3NTEwLCJzdWIiOiI1NTciLCJzY29wZXMiOltdfQ.aTrKB1606D0M788_wd9etcWG2sfjzy56qmXs3XkbkXrqDDIx1tIQoCPPAHQiIVeT2OHmRkQu6U6sovlsIqItbpc8HsYPEuH4IaQMksh-6KakTuygp65RcK6q3keu8uUnZZEmzRV-wdX4wHNjVKdW9IWrILGswhlOQLVcUbwkm4MTpgsiQyTEp4lmXF9cpZrMURcDUyo5quj2_ue4HIq8oZJl4sNNn78Voon6lA5SppSDzXzVPnVc7enMifaR7BkkX8m2iZqWH37FnPL71vnXHAaiuZFVhATEbGYbs-ZN2WtO_67VOufHhYp-nhfC3sRV6S4hbfAlgEG6egSOa9ZhuXj_rIXvctBPl2jIrYN3l-XyDwisYlWESWdI0FSh_0skg__hCD26U63e4G8JoKdjuCZDiIEU1Lrs8cf79uCYF2J7oPWyIhxK1h6i9T_HMyygXrdEPSse2eBMIr4-wCX-186yWKGYpWz7ZhfdKHnYOKoILYUpbafW2UVDlF83efoj80cNLA6PCAiE_L2VsJCWbtw7b5-hituAAnWYVFk-4fFUrUzhyLOlz8pm3sO00rSPHkUr9QWwZbXV0KO84qaojBVRcM0kp8RJLzAvWm5DbQJKzqF2KfuJjKhDLcIkRVawsgaRgjQ_gGlliqTirhlrqrse72QccmcvZDEiyWoNdTs",
        "Content-Type":"application/json",
    }
    var reqBody={
        
        "categoryId": 23,
        "currencyId":2,
        "selectedFilters":[],
        "selectedSortOrder":null,
        "selectedStaticFilters":[]    
    }
    
    const [data,setData]=useState([]);

    var list=[];
        useEffect(() => {
        axios.post('/getFilteredProducts',reqBody,headers).then(response =>{
        setData(response.data)
      
        });
      }, []);

      data.map(image => (
        <div>
        {list.push(image.images[0])}
        </div>
       ))

var url="";
var pics=[]
list.map(image=>(
    url="http://apit.bluerickshaw.com/"+image.imageURL,
     pics.push(url)

))
//-------------------- till here i just imported the data from api to a array called pics------------------------------------------/////

const  handleScroll = (event) => {
    const { scrollTop,clientHeight,scrollHeight } = event.currentTarget
console.log("scrollTop:",scrollTop)
console.log("clientHeight:",clientHeight)
console.log("scrollHeight:",scrollHeight)
console.log("................................")

  if(scrollTop+clientHeight>=scrollHeight)
  loadmore();                                    //this is the condition which tell that we have reached till the bottom of the scroll
}

var ans=[]
const [loading,setLoading]=useState(false);
const [end,setEnd]=useState(6);

const showImages =()=>{
    
   for(let i=0;i<end;i++)
   ans.push(<img key={i} src={pics[i]} style={{height:400,width:400}}></img>)
   return ans
}                                                         //this is showing the images from the array during the render time
const loadmore=()=>{
    setLoading(true);
    setTimeout(()=>{
        setEnd(end+6);
        setLoading(false);
    },500)                                                 //this is the function which we call when we reach the bottom of the scroll
}


return (
    
<div className="myComponent" onScroll={handleScroll} style={{height:"100vh",overflow:"auto"}}>
{showImages()}
{loading&&<Loader/>}
</div>

)
}

export default MyComponent
