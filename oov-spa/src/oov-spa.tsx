import { render } from 'solid-js/dom'
import App from './app/App'
import { middleware } from './app/store'
import { rootSaga } from './features'

middleware.run(rootSaga)
render(App, document.getElementById('root') as Node)
