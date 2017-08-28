# 使用
---

>### install dependencies
>npm install
>
>### serve with hot reload at localhost:8081
>webpack-dev-server

---

# 代理工具
Mac下为Charles
配置：
- Map from 
    protocol: http
    host:localhost
    port:8080
    path: /user/*   /cart/*     /product/*     /shipping/*     /order/*
- Map to 
    protocol: http
    host:www.happymmall.com
    port:80
    path: /user/    /cart/     /product/     /shipping/     /order/

