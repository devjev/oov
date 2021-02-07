import '../style/index.scss'
import { JSX, createState } from 'solid-js'
import { HistoryList } from '../features/history-list/HistoryList'
import { NonSidebarContent, Sidebar, SidebarLayout, Link } from '../ui'
import { ValidationResultView } from '../features'

export function App(): JSX.Element {
  const [state, setState] = createState({
    selectedHash: undefined as string | undefined,
  })

  return (
    <main>
      <SidebarLayout>
        <Sidebar>
          <HistoryList
            onSelect={(hash) => {
              setState('selectedHash', hash)
            }}
          />
        </Sidebar>
        <NonSidebarContent>
          <section class="centered">
            <ValidationResultView hash={state.selectedHash} />
            <p>
              You <Link onClick="hello">will</Link> get some faint idea of the toll of life taken in this conflict if
              from Cristobal you will drive out to the picturesque cemetery at Mount Hope and look upon the almost
              interminable vista of little white headstones. Each marks the last resting place of some poor fellow
              fallen in the war with fever, malaria and all of tropic nature’s fierce and fatal allies against all
              conquering man. That war is never ended. The English and the Spaniards have laid down their arms.
              Cimmaroon and conquistadore, pirate and buccaneer no longer steal stealthily along the narrow jungle
              trails. But let man forget for a while his vigilance and the rank, lush growth of the jungle creeps over
              his clearings, his roads, his machinery, enveloping all in morphic arms of vivid green, delicate and
              beautiful to look upon, but tough, <Link onClick="2">stubborn</Link> and fiercely resistant when attacked.
              Poisoned spines guard the slender tendrils that cling so tenaciously to every vantage point. Insects
              innumerable are sheltered by the vegetable chevaux-de-frise and in turn protect it from the assaults of
              any human enemy. Given a few months to reëstablish itself and the jungle, once subdued, presents to man
              again a defiant and an almost impenetrable front. We boast that we have conquered nature on the Isthmus,
              but we have merely won a truce along a comparatively narrow strip between the oceans. Eternal vigilance
              will be the price of safety even there.
            </p>
            <p>
              If that country alone is happy whose history is uninteresting, then sorrow must have been the ordained lot
              of Panama. Visited first by Columbus in 1502, at which time the great navigator put forth every effort to
              find a strait leading through to the East Indies, it has figured largely in the pages of history ever
              since. Considerable cities of Spanish foundation rose there while our own Jamestown and Plymouth were
              still unimagined. The Spaniards were building massive walls, erecting masonry churches, and paving royal
              roads down there in the jungle long before the[6] palisades and log huts of Plymouth rose on the sandy
              shores of Cape Cod Bay. If the ruins of the first city of Panama, draped with tropical vines, are all that
              remain of that once royal city, its successor founded in 1673 still stands with parts of the original
              walls sturdily resisting the onslaught of time.
            </p>
          </section>
        </NonSidebarContent>
      </SidebarLayout>
    </main>
  )
}

export default App
