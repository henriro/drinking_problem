import http from 'node:http';
import {readFile} from 'node:fs/promises';
const root=new URL('./dist/',import.meta.url);
http.createServer(async(req,res)=>{try{const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(!['/','/index.html','/style.css','/app.js','/model.js'].includes(path)){res.writeHead(404).end();return;}const file=path==='/'?'index.html':path.slice(1);res.setHeader('Content-Type',file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':'text/html; charset=utf-8');res.end(await readFile(new URL(file,root)));}catch{res.writeHead(500).end('Unable to load app');}}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
