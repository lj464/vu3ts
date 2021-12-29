import LJrequst from './request/index'

import config from './config'

let lJaxios = new LJrequst(config)

lJaxios
  .request({
    method: 'get',
    url: 'home/multidata',
    ShowLoadling: false
  })
  .then((res) => {
    console.log(res, 'resssssssssss')
  })
