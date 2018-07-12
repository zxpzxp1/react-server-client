/**
 * Created by ccb on 2018/6/14.
 */
const express=require('express')
const ReactSSR=require('react-dom/server')
const fs = require('fs')
const isDev = process.env.NODE_ENV === 'development'
const path=require('path')

const app=express()

if(!isDev){
    const serverEntry=require( '../dist/server-entry.js').default
    const template=fs.readFileSync(path.join(__dirname, '../dist/index.html'),'utf8')
    app.use('/public',express.static(path.join(__dirname,'../dist')))
    app.get('*',function(req,res){
        const appString=ReactSSR.renderToString(serverEntry);
        res.send(template.replace('<!--app-->',appString))
    })
}else{
    const devstatic=require("./util/dev-static.js")
    devstatic(app)
}
app.listen(3333, function () {
    console.log('server is listen 3333')
})