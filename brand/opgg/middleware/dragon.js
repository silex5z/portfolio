import _ from 'lodash'

export default async ({ store, $dragonService, redirect }) => {
  if (process.server) {
    try {
      const { data: versions } = await $dragonService.getVersions()

      store.commit('dragon/SetVersion', versions[0])

      const [
        {
          data: { data: champions }
        },
        {
          data: { data: spells }
        },
        {
          data: { data: items }
        },
        { data: runes }
      ] = await Promise.all([
        $dragonService.getChampions(),
        $dragonService.getSpells(),
        $dragonService.getItems(),
        $dragonService.getRunes()
      ])
      // const runes2 = _.map(runes, (rune, idx) => {
      //   // const slots = _.mapValues(_.keyBy(rune.slots, 'id'))
      //   let test
      //   _.map(rune.slots, (slot) => {
      //     test = { ..._.mapValues(_.keyBy(slot.runes, 'id')) }
      //   })
      //   return {
      //     ...rune,
      //     slots: { ...test }
      //   }
      // })

      store.commit('dragon/SetChampions', _.keyBy(champions, 'key'))
      store.commit('dragon/SetSpells', _.keyBy(spells, 'key'))
      store.commit('dragon/SetItems', items)
      store.commit('dragon/SetRunes', _.mapKeys(runes, 'id'))
    } catch {
      redirect('/error')
    }
  }
}
