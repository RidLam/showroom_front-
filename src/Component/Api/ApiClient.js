import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  return "http://localhost:3000/" + path;
}

export default class ApiClient {
  constructor(req) {
    this.init = req => {
        this.path = req.path;
        this.data = req.data;
    }
    methods.forEach((method) => {
        var path = this.path;
        var data = this.data;
        this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
            const request = superagent[method](formatUrl(path));
            if (params) {
              request.query(params);
            }
    
            // if (__SERVER__ && req.get('cookie')) {
            //   request.set('cookie', req.get('cookie'));
            // }
    
            if (method === 'get' && data) {
              request.send(data);
            }else if(method === 'post' && data){
              request.set('X-CSRF-TOKEN', 'token');
              request.set('Content-Type', 'application/json');
              request.send(JSON.stringify(data));
            }else if(method === 'post' && data && params && params.type === 'json'){
                request.set('X-CSRF-TOKEN', 'token');
                request.set('Content-Type', 'application/json');
                request.send(JSON.stringify(data));
            } else if(method === 'post' && data && params && params.type === 'multipart/form-data'){
                request.set('X-CSRF-TOKEN', document.getElementsByName('_csrf')[0].content);
                request.send(data);
            } else if (method === 'post' && data) {
              data = data + '&_csrf=' + document.getElementsByName('_csrf')[0].content;
              request.set('_csrf', document.getElementsByName('_csrf')[0].content);
              request.send(data);
            }
            
            request.end((err, { body, text } = {}) => err ? reject(body || text || err) : resolve(body || text));
            
          })
    });
  }

 

  empty() {}
}
