const baseURL  = 'https://weixin.test-cignacmb.com/enterprise';
let url = {
   getToken:"/getWxToken",
   listCustomerDetail:"/listCustomerDetail",
   listOrderDetail:"/listOrderDetail",
   listBrowseHistory:"/listBrowseHistory",
   listBehaviorTrack:"/listBehaviorTrack"
}

let tipOpen = true;


let token ='';

// 获取token
if( localStorage.getItem('token') ){
    token = localStorage.getItem('token');
}
window.location.search.replace('?','').split('&').forEach(e =>{
    let arr = e.split('=');
    if( arr[0] == 'token' ){
        token = arr[1]
    }
})

const instance = axios.create({
    baseURL:baseURL ,
    imeout: 3000,
    headers: {
        token: token
    }
});

//  请求拦截，设置情切
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 请求响应拦截
instance.interceptors.response.use(function (response) { 
    if( response.data.statusCode != '0' && tipOpen){
        // alert(response.data.msg);
    }
    return response.data

}, function (error) { 

    if(tipOpen) alert(error);
    return Promise.reject(error)

})
