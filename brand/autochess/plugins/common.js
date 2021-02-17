import axios from 'axios'

export default ({ app }, inject) => {
  inject(
    'apiHost',
    app.context.isDev
      ? 'https://opgg-autochess.s3.ap-northeast-2.amazonaws.com/resources'
      : 'https://opgg-autochess.s3.ap-northeast-2.amazonaws.com/resources'
  )
  inject('tooltip', (title, text, icons) => {
    const iconsHTML = icons
      ? icons.reduce((result, icon) => {
          result += `<img class="tooltip-icon" src="${icon}" />`
          return result
        }, '')
      : ''
    return `
          <strong class="title">${title}</strong>
          <span class="text">
          ${text}
          </span>
          <span class="tooltip-icons">
              ${iconsHTML}
          </span>
        `
  })
  inject('request', (config) => {
    const _config = {
      method: config.method || 'get',
      timeout: config.timeout || 5000,
      headers: {
        'Content-type': 'application/json'
      }
    }

    return axios(Object.assign(_config, config))
  })
}
