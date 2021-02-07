import { render } from 'solid-js/dom'
import App from './app/App'
import { middleware } from './app/store'
import saga from './app/sagas'

middleware.run(saga)
render(App, document.getElementById('root') as Node)
