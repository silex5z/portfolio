export const state = () => ({
  version: '',
  champions: {},
  spells: {},
  items: {},
  runes: {}
})

export const mutations = {
  SetVersion(state, version) {
    state.version = version
  },
  SetChampions(state, champions) {
    state.champions = champions
    console.log('챔피언 ////////////////')
    // console.log(state.champions[1])
  },
  SetSpells(state, spells) {
    state.spells = spells
    console.log('스킬 //////////////////')
    // console.log(state.spells[1])
  },
  SetItems(state, items) {
    state.items = items
    console.log('아이템 //////////////////')
    // console.log(state.items[1001])
  },
  SetRunes(state, runes) {
    // console.log(runes)
    state.runes = runes
  }
}
